import Users from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}