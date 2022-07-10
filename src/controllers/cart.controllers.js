import { db, objectId } from "../databases/mongo.js";

export async function AddToCart(req, res) {
    const {product, image, price } = req.body;
    const { user } = res.locals; //check this

    try {
        await db.collection("cart").insertOne({ product, image, price, userId: new objectId(user._id)});
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}