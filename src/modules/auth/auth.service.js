import User from "./auth.model";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyAccessToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import ApiError from "../../common/utils/api-error";

const hashToken = (token) => crypto.createHash("sha256").update(rawToken).digest("hex");


const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError.conflict("Email already exists");
  const { rawToken, hashedToken } = generateResetToken();
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;
  return userObj;
};
const login = async ({email,password}) => {
  const user = await User.findOne({email})
  if(!user){
    throw new ApiError.unauthorized("Invalid email or password")
  }
  const isMatch = user.comparePassword(password)
  if(!isMatch){
    throw new ApiError.unauthorized("Invalid email or password")
  }
  if(!user.isVerified){
    throw new ApiError.unauthorized("Please verify your email before login")
  }
  const accessToken = generateAccessToken({id:user._id,role:user.role})
  const refreshToken = generateRefreshToken({id:user._id})

  const userObj = await user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return {user:userObj,accessToken,refreshToken}
}

const refresh = async (token) => {
  if (!token) throw new ApiError.unauthorized("Refresh token missing")
  const decoded = verifyRefreshToken(token)

  const user = User.findById(decoded.id).select("+refeshToken")
  if (!user) {
    throw new ApiError.unauthorized("User not found")
  }
  if (user.refreshToken !== hashToken(token)) {
    throw new ApiError.unauthorized("Invalid refresh token")
  }
  const accessToken = generateAccessToken({id: user._id, role: user.role})
  return { accessToken }

}

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId,{refreshToken:null})
}

const forgotPassword = async(email) =>{
  const user = await User.findOne({email})
  if(!user) throw new ApiError.notFound("No acccount with that email");

  const {rawToken,hashedToken} = generateResetToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

}
const verifyEmail = async(token)=>{
  const hashedToken = hashToken(token);
  const user = await User.findOne({ verificationToken: hashedToken }).select(
    "+verificationToken",
  );


  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return user;
}
const getMe = async()=>{

}
export { register, login, logout, refresh,verifyEmail,getMe };
