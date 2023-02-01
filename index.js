import Express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/Router.js";
dotenv.config();
const app = Express();

try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.log(error);
}

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));
app.use(cookieParser());
app.use(Express.json());
app.use(router);

app.listen(5000, ()=> console.log('listening on port 5000'))