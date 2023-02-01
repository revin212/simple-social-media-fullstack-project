import Posts from "../models/PostModel.js";

export const getAllPosts = async(req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ['id', 'author', 'content']
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async(req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ['author', 'username', 'content'],
            where: {
                username: req.body.username
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async(req, res) => {
    console.log(req.body)
    const { author, username, content } = req.body;
    try {
        await Posts.create({
            author: author,
            username: username,
            content: content
        });
        res.status(201).json({msg: "Post created successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async(req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const postId = req.body.id;
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204).json({ msg: 'Account not logged in' });
    if(!postId) return res.sendStatus(400);
    try {
        await Posts.destroy({
            where: {
                id: postId,
                username: username
            }
        });
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({msg: "Post deleted successfully"});
}