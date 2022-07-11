import Joi from "joi";

const modelProduct = Joi.object({
    product: Joi.string().required(),
    category: Joi.string().valid("bota", "moletom").required(),
    image: Joi.string().required(),
    price: Joi.number().required()
});

export default modelProduct;