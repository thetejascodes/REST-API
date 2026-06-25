import * as authService from './auth.service'
import ApiResponse from '../../common/utils/api-responses'


const register = async (req,res,next)=>{
    const user = await authService.register(req.body)
    ApiResponse.created(res,"Registration success",user)
}

export { register }