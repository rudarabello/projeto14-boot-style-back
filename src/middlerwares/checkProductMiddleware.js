import modelProduct from "../models/modelProduct.js";

export async function checkProduct(req, res, next) {
    const validation = modelProduct.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.sendStatus(422);
    };

    next();
}