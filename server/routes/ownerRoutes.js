import express from 'express'
import { protect } from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import {changeRoleToOwner, addCar, deleteCar, getDashboardData, getownerCars, toggleCarAvailability, updateUserImg } from '../controllers/ownerController.js';


const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect , changeRoleToOwner)
ownerRouter.post("/add-car", upload.single("image") , protect , addCar)
ownerRouter.get("/cars", protect , getownerCars)
ownerRouter.post("/toggle-car", protect , toggleCarAvailability)
ownerRouter.post("/delete-car", protect , deleteCar)
ownerRouter.get('/dashboard', protect, getDashboardData);
ownerRouter.post('/update-image', upload.single('image') , protect ,updateUserImg);


export default ownerRouter;