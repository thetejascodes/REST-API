import joi from 'joi'
import BaseDto from '../../../common/dto/baseDto'

class UpdateDto extends BaseDto {
    static schema = joi.object({
        title: joi.string().trim().min(1).max(200).optional(),
        description: joi.string().allow('').max(2000).optional(),
    })
}

export default UpdateDto