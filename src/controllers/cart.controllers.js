import { db, objectId } from "../databases/mongo.js";

export async function AddToCart(req, res) {
    const {product, image, price } = req.body;
    const { user } = res.locals;

    try {
        await db.collection("cart").insertOne({ product, image, price, userId: new objectId(user._id)});
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function GetCartItems(req, res) {
    const { user } = res.locals;
    console.log(user);
    try {
        const itemsCart = await db.collection("cart").find({ userId: user._id }).toArray();
        console.log(itemsCart)
        res.status(200).send(itemsCart);
    } catch (error) {
        res.sendStatus(500);
    }
}