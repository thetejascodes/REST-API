import BaseDto from '../../../common/dto/baseDto.js'
import joi from 'joi'

class LoginDto extends BaseDto{
    static schema = joi.object({
        email: joi.string().email().lowercase().trim().required(),
        password: joi.string().min(8).message('Password must be at least 8 characters long and not exceed 50 characters').required(),
    })
}
export default LoginDto;