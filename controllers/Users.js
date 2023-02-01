import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'username']
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { name, username, password, confPassword } = req.body;
    if (password!== confPassword) return res.status(400).json({msg: "Password does not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            username: username,
            password: hashPassword
        });
        res.status(201).json({msg: "Register successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({msg: "Wrong password"});
        const userId = user[0].id;
        const name = user[0].name;
        const username = user[0].username;
        const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        });
        const refreshToken = jwt.sign({userId, name, username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });
        res.json({accessToken});

    } catch (error) {
        res.status(404).json({msg: "User not found"});
    }
}