import {Router} from 'express'
import * as authController from './auth.controller.js'
import validate from '../../common/middleware/validate.middleware.js'
import RegisterDto from './dto/register.dto.js'
import LoginDto from './dto/login.dto.js'
import ForgotPasswordDto from './dto/forgotPassword.dto.js'
import ResetPasswordDto from './dto/resetPassword.dto.js'
import {isAuthenticated} from './auth.middleware.js'


const router = Router()

router.post('/register',validate(RegisterDto),authController.register)
router.post('/login',validate(LoginDto),authController.login)
router.post('/refresh-token',authController.refresh)
router.post('/forgot-password',validate(ForgotPasswordDto),authController.forgotPassword)
router.get('/verify-email/:token',authController.verifyEmail)
router.put('/reset-password/:token',validate(ResetPasswordDto),authController.resetPassword)
router.get('/me',isAuthenticated,authController.getMe)
router.post('/logout',isAuthenticated,authController.logout)
export default router