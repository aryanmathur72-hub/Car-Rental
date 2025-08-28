import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { promisify } from 'util';
import "dotenv/config";

const verifyToken = promisify(jwt.verify);

export const protect = async (req, res, next) => {
  const rawHeader = req.headers.authorization || "";
  const token = rawHeader.startsWith("Bearer ") ? rawHeader.split(" ")[1] : rawHeader;

  if (!token) {
    return res.json({ success: false, message: 'Not authorized ye bala' });
  }

  try {
    const userData = await verifyToken(token, process.env.JWT_SECRET); 
    
    const user = await User.findById(userData).select("-password");
           
    if (!user) {
     
 
      return res.json({ success: false, message: 'User not found' });
    }

    req.user = user;
 
    next();
    
  } catch (error) {

    return res.json({ success: false, message: 'Not authorized' });
  }
  
};
