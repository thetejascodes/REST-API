import User from "./auth.model";
import generateToken from "../../common/utils/generate-token";
import ApiError from "../../common/utils/api-error";

const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError.conflict("Email already exists");
  const { rawToken, hashedToken } = generateToken();
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });
  return user;
};
export { register };
