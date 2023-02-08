import Express  from "express";
import { Register, Login, Logout } from "../controllers/Users.js";
import { getAllPosts, getUserPosts, createPost, deletePost, editPost } from "../controllers/Posts.js";
import { veryfyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = Express.Router();

// routes for user authentication
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// routes for posts
router.get('/posts', getAllPosts);
router.get('/posts/:username', veryfyToken, getUserPosts);
router.post('/posts', veryfyToken, createPost);
router.put('/posts', veryfyToken, editPost);
router.delete('/posts/:username/:id', veryfyToken, deletePost);

export default router;
