// import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../index.js";

export const Register = async(req, res) => {
    const { name, username, password, confPassword } = req.body;
    if (password!== confPassword) return res.status(400).json({msg: "Password does not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const sql = `INSERT INTO users (name, username, password) VALUES ('${name}', '${username}', '${hashPassword}')`
    try {
        await db.query(sql)
        res.status(201).json({msg: "Register successful"});
    } catch (error) {
        console.log(error);
    }
}


export const Login = async(req, res) => {
    const sql = `SELECT * FROM users WHERE username = '${req.body.username}'`

    try {
        const [user, fields] = await db.query(sql);
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({msg: "Wrong password"});
        const userId = user[0].id;
        const name = user[0].name;
        const username = user[0].username;
        const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign({userId, name, username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        const updateSql = `UPDATE users SET refresh_token = '${refreshToken}' WHERE id = ${userId}`

        await db.query(updateSql);
        res.cookie('refreshToken', refreshToken,{
            sameSite: "none",
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.json({accessToken});
    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "User not found"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const sql = `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`
    const [user, fields] = await db.query(sql);
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;

    const updateSql = `UPDATE users SET refresh_token = null WHERE id = ${userId}`
    await db.query(updateSql);
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}