import * as authService from './auth.service'
import ApiResponse from '../../common/utils/api-responses'
import cookieParser from 'cookie-parser'

const register = async (req, res, next) => {
    const user = await authService.register(req.body)
    ApiResponse.created(res, "Registration success", user)
}

const login = async (req, res, next) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body)
    res.cookieParser("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    ApiResponse.ok(res, "Login successful", { user, accessToken })

}

export { register }