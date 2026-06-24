import joi from 'joi';
import BaseDto from '../../../common/dto/baseDto';

class RegisterDto extends BaseDto {
    static schema = joi.object({
        name: joi.string().trim().min(3).max(30).required(),
        email: joi.string().email().lowercase().trim().required(),
        password: joi.string().min(8).required().message('Password must be at least 8 characters long and not exceed 50 characters'),
        role: joi.string().valid('user', 'admin').default('user'),
    })
}

export default RegisterDto;