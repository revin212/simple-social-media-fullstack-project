import Express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mysql from "mysql2/promise"
import router from "./routes/Router.js";
dotenv.config();
const app = Express();
let db

try {
    console.log("Waiting for connection...");
    db = await mysql.createConnection({
        host: "sql12.freesqldatabase.com",
        user: "sql12596210",
        password: "wRP4Jfez3J",
        database: "sql12596210"
      });
      await db.connect(function(err) {
        if (err) throw err;
      });
      console.log("Connected!");
} catch (error) {
    console.log(error);
}


// app.use(cors({
//     credentials:true,
//     origin:"http://localhost:3000"
// }));
app.use(cors({
  credentials:true,
  origin:"https://simple-social-media-with-login-frontend.vercel.app",
}));
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "https://simple-social-media-with-login-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next()
})
app.use(cookieParser());
app.use(Express.json());
app.use(router);

app.listen(5000, ()=> console.log('listening on port 5000'))

export default db