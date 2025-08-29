import express from 'express';
import "dotenv/config"
import cors from "cors";
import connectDB from './configs/DB.js';
import userRouter from './routes/userRoute.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';


const app = express();

//connect db
await connectDB();

app.use(cors());


app.use(express.json());

app.get('/', (req, res) => res.send("server is running"));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter );
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));