import Express  from "express";
import { Register, Login, Logout } from "../controllers/Users.js";
import { getAllPosts, getUserPosts, createPost, deletePost } from "../controllers/Posts.js";
import { veryfyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = Express.Router();

// routes for user authentication
// router.get('/users', veryfyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// routes for posts
router.get('/posts', getAllPosts);
router.get('/posts/user', veryfyToken, getUserPosts);
router.post('/posts', veryfyToken,createPost);
router.delete('/posts/', veryfyToken, deletePost);

export default router;
