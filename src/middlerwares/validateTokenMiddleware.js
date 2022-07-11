import { db } from "../databases/mongo.js";

export async function validateTokenMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    console.log(token);

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return re.sendStatus(401);
        }

        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) {
            return res.sendStatus(401)
        }

        res.locals.user = user;
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}