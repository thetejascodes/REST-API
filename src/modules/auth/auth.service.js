import User from "./auth.model.js";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyAccessToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import ApiError from "../../common/utils/api-error.js";
import { sendResetPasswordEmail,sendVerificationEmail } from "../../common/config/email.js";
import crypto from "crypto";

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw  ApiError.conflict("Email already exists");
  const { rawToken, hashedToken } = generateResetToken();
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });
  try{
    await sendVerificationEmail(email,rawToken);
  }
  catch(error){
    console.error(error)
  }
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;
  return userObj;
};
const login = async ({email,password}) => {
  const user = await User.findOne({email}).select("+password")
  if(!user){
    throw  ApiError.unauthorized("Invalid email or password")
  }
  const isMatch =  await user.comparePassword(password);
  if(!isMatch){
    throw  ApiError.unauthorized("Invalid email or password")
  }
  if(!user.isVerified){
    throw  ApiError.unauthorized("Please verify your email before login")
  }
  const accessToken = generateAccessToken({id:user._id,role:user.role})
  const refreshToken = generateRefreshToken({id:user._id})

  user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave:false})
 
  const userObj = await user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return {user:userObj,accessToken,refreshToken}
}

const refresh = async (token) => {
  if (!token) throw  ApiError.unauthorized("Refresh token missing");
  const decoded = verifyRefreshToken(token)

  const user = await User.findById(decoded.id).select("+refreshToken")
  if (!user) {
    throw ApiError.unauthorized("User not found")
  }
  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized("Invalid refresh token")
  }
  const accessToken = generateAccessToken({id: user._id, role: user.role})
  return { accessToken }

}

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId,{refreshToken:null})
}

const forgotPassword = async(email) =>{
  const user = await User.findOne({email})
  if(!user) throw ApiError.notFound("No acccount with that email");

  const {rawToken,hashedToken} = generateResetToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  try {
    await sendResetPasswordEmail(email,rawToken)
  } catch (error) {
    console.log(error)
  }
}
const resetPassword = async(token,newPassword)=>{
  const hashedToken = hashToken(token)

  const user = await User.findOne({
    resetPasswordToken:hashedToken,
    resetPasswordExpire:{$gt:Date.now(),}
  }).select("+resetPasswordToken +resetPasswordExpires")

  if(!user) throw ApiError.badRequest("Invalid or expired reset token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
}

const verifyEmail = async(token) => {
  const trimmed = String(token).trim();
  if (!trimmed) {
    throw ApiError.badRequest("Invalid or expired verification token");
  }
  const hashedToken = hashToken(token);
  let user = await User.findOne({ verificationToken: hashedToken }).select(
    "+verificationToken"
  );
  if(!user) {
    user = await User.findOne({verificationToken:trimmed}).select("+verificationToken")
  }
  if(!user) throw new ApiError.badRequest("Invalid or expired verification token");
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return user;
}
const getMe = async(userId)=>{
  const user = await User.findById(userId)
  if(!user) throw ApiError.notFound("User not found");
  return user;
}
export { register, login, logout, refresh,verifyEmail,getMe,forgotPassword,resetPassword };
