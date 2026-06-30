import joi from 'joi'
import ApiError from '../../common/utils/api-error.js'

class BaseDto {
    static schema = joi.object({})

    /**
     * Validate input data against the DTO schema.
     * Returns the validated (and stripped) value or throws an ApiError.
     */
    static validate(data) {
        const { error, value } = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if (error) {
            const errors = error.details.map((d) => d.message)
            return {errors,value:null}
        }

        return {value,error:null}
    }
}

export default BaseDto