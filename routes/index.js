import { Express }  from "express";
import { getUsers } from "../controllers/Users.js";

const router = Express.Router();

router.get('/users', getUsers);

export default router;
