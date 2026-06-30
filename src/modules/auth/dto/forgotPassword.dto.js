import BaseDto from "../../../common/dto/baseDto.js";
import joi from "joi";

class ForgotPasswordDto extends BaseDto{
    static schema = joi.object({
        email: joi.string().email().lowercase().trim().required()
    })
}
export default ForgotPasswordDto;