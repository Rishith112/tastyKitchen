import {Router} from 'express';
import {loginUser, registerUser, getUserProfile} from "../controllers/usercontrollers.js";
import { get } from 'mongoose';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/test', getUserProfile);

export default router;