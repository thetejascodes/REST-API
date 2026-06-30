import * as authService from './auth.service.js'
import ApiResponse from '../../common/utils/api-responses.js'
import cookieParser from 'cookie-parser'

const register = async (req, res) => {
    const user = await authService.register(req.body)
    ApiResponse.created(res, "Registration success", user)
}

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body)
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        maxAge:7 * 24 * 60 * 60 * 1000,
    })
    ApiResponse.ok(res, "Login successful", { user, accessToken })
}

const verifyEmail = async(req,res)=>{
    await authService.verifyEmail(req.params.token)
    ApiResponse.ok(res,"Email verified successfully")
}
const refresh = async(req,res)=>{
    const token = req.cookies?.refreshToken;
    console.log(token)
    const {accessToken} = await authService.refresh(token);
    ApiResponse.ok(res,"Token refreshed",{accessToken})
}
const forgotPassword = async (req,res)=>{
    await authService.forgotPassword(req.body.email)
    ApiResponse.ok(res,"Password reset email sent")
}
const resetPassword = async(req,res)=>{
    await authService.resetPassword(req.params.token,req.body.password)
    ApiResponse.ok(res,"Password reset successfully")
}
const getMe = async(req,res)=>{
    const user = await authService.getMe(req.user.id)
    ApiResponse.ok(res,"User profile ",user)
}

const logout = async(req,res)=>{
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken");
    ApiResponse.ok(res,"Logged out successfully");
}
export { register,login,verifyEmail,refresh,forgotPassword,resetPassword,getMe,logout }