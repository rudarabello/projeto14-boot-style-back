import Joi from "joi";

export const modelPassword = Joi.object({
    password: Joi.string()
        .min(3)
        .max(15)
        .required()
        .label('Password'),

    Cpassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } })
});