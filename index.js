import  { Express } from "express";
import db from "./config/Database.js";
const app = Express();

try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.log(error);
}

app.listen(5000, ()=> console.log('listening on port 5000'))