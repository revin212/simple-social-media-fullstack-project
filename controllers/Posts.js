// import Posts from "../models/PostModel.js";
import db from "../index.js";

export const getAllPosts = async(req, res) => {
    const sql = "SELECT * FROM posts"

    try {
        const [posts, fields] = await db.query(sql)
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async(req, res) => {
    const sql = `SELECT id, author, username, content FROM posts WHERE username = '${req.params.username}'`

    try {
        const [posts, fields] = await db.query(sql)
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async(req, res) => {
    const { author, username, content } = req.body;
    const sql = `INSERT INTO posts (author, username, content) VALUES ('${author}', '${username}', "${content}")`
    try {
        await db.query(sql)
        res.status(201).json({msg: "Post created successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const editPost = async(req, res) => {
    const { id, username, content } = req.body;
    const sql = `UPDATE posts SET content = "${content}" WHERE id = ${id} AND username = '${username}'`
    try {
        await db.query(sql);
        res.status(201).json({msg: "Post updated successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async(req, res) => {
    const username = req.params.username;
    const postId = req.params.id;
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204).json({ msg: 'Account not logged in' });
    if(!postId) return res.sendStatus(400);

    const sql = `DELETE FROM posts WHERE username = '${username}' AND id = ${postId}`
    try {
        await db.query(sql);
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({msg: "Post deleted successfully"});
}