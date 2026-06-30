import joi from 'joi';
import BaseDto from '../../../common/dto/baseDto.js';


class RegisterDto extends BaseDto {
    static schema = joi.object({
        name: joi.string().trim().min(3).max(30).required(),
        email: joi.string().email().lowercase().trim().required(),
        password: joi.string().min(8).message('Password must contain at least one uppercase letter and one digit').required(),
        role: joi.string().valid('user', 'admin').default('user'),
    })
}

export default RegisterDto;