import { db, objectId } from "../databases/mongo.js";

async function addProduct(req, res) {
    const productData = req.body;

    try {
        await db.collection("products").insertOne({
            product: productData.product,
            category: productData.category,
            image: productData.image,
            price: productData.price
        });
        res.status(201).send(productData);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function removeProduct(req, res) {
    const { id } = req.headers;

    try {
        await db.collection("products").deleteOne({ _id: objectId(id) });
        res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
}


async function returnProduct(req, res) {
    const { id } = req.headers;

    try {
        const showProduct = await db.collection("products").findOne({ _id: objectId(id) });
        res.status(200).send(showProduct);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function returnProducts(req, res) {
    const { category } = req.headers
    try {
        const showProducts = await db.collection("products").find({category: category}).toArray();
        res.status(200).send(showProducts);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function returnAllProducts(req, res) {
    try {
        const showProducts = await db.collection("products").find({}).toArray();
        res.status(200).send(showProducts);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { addProduct, removeProduct, returnProduct, returnProducts, returnAllProducts };

