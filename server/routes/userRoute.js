import express from 'express'
import { getCars, getUserData, registerUser, loginUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data' , protect, getUserData);
userRouter.get('/cars', getCars)

export default userRouter;
 