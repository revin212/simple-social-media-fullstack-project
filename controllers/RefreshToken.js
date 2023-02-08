// import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import db from "../index.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

        const sql = `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`
        const [user, fields] = await db.query(sql);
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const username = user[0].username;
            const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h"
            });
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error);
    }
}