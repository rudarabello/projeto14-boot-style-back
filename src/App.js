import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routers/userRouters.js"
const app = express();
const PORTA = process.env.PORT || 3001;

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(userRoutes);

app.listen(PORTA);
