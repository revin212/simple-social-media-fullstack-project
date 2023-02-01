import Express  from "express";
import { getUsers, Register, Login } from "../controllers/Users.js";
import { veryfyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = Express.Router();

router.get('/users', veryfyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);

export default router;
