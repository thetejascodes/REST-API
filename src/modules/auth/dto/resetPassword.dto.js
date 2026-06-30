import joi from 'joi'
import BaseDto from "../../../common/dto/baseDto.js";

class ResetPasswordDto extends BaseDto{
    static schema = joi.object({
        password: joi.string().min(8).message('Password must be at least 8 characters long and not exceed 50 characters').required(),                
    })
}

export default ResetPasswordDto;