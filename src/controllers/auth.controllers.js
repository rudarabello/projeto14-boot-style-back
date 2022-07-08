import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../databases/mongo.js";
import { modelLogin } from "../models/modelLogin.js"
import dayjs from "dayjs";
import { modelPassword } from "../models/modelPassword.js";

export async function signup(req, res) {
    const { name, email, password, Cpassword } = req.body;
    const Vpassword = { password, Cpassword }
    const { error } = modelPassword.validate(Vpassword);
    if (error) {
        return res.status(406).send("Error on password validation");
    } else {
        const passwordHash = bcrypt.hashSync(password, 10);
        const newUser = { name, email, password: passwordHash }
        const { value, error } = modelLogin.validate(newUser);
        try {
            if (error) {
                return res.status(422).send("Error on data validation");
            } else {
                const verify = await db.collection("users").findOne({ email: email });
                if (verify) {
                    return res.status(409).send("User already registered");
                } else {
                    await db.collection("users").insertOne(value);
                    return res.status(201).send("Successful registration!");
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
            
        }
    }
};

export async function login(req, res) {
    const { email, password } = req.body;
    const date = dayjs().format("DD/MM/YYYY");
    const time = dayjs().format("HH:mm:ss");
    try {
        const user = await db.collection("users").findOne({ email: email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            const data = { name: user.name, userId: user._id, token, date, time }
            await db.collection("sessions").insertOne(data);
            return res.status(200).send(data);
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
};

export async function logout(req, res) {
    const { session } = res.locals;
    try {
        await db.collection("sessions").deleteOne({ token: session });
        res.status(200).send("Logout feito com Sucesso!");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
