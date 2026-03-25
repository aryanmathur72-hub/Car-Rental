import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Car from '../models/Car.js';
import { OAuth2Client } from 'google-auth-library';
import "dotenv/config"



//here this controller how user can register ?

const generateToken = (userID) => {
   const payload = userID;
   return jwt.sign(payload, process.env.JWT_SECRET)
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const registerUser = async (req, res) => {

    try {
          const {name, email, password} = req.body;

          if(!name || !email || !password || password.length < 8){
            return res.json({success: false, message: 'Fill all the fields'})
          }
         
          const userExists = await User.findOne({email});
          if(userExists){
            return res.json({success: false, message: 'User already exist. '})
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({
            name,
            email,
            password: hashedPassword,
            authProvider: 'local'
          });

          const token = generateToken(user._id.toString());
        
          res.json({success: true, token});

         } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export const loginUser = async (req, res) =>{

  try {
     const {email, password} = req.body
     const user = await User.findOne({email});
      
     if(!user){
      return res.json({success: false, message:'user not exist'})
     }

     if (user.authProvider === 'google') {
      return res.json({
        success: false,
        message: 'This account uses Google sign-in. Continue with Google.'
      })
     }

     const isMatch = await bcrypt.compare(password, user.password)

     if(!isMatch){
       return res.json({success: false, message:'Invalid password'})
     }

     const token = generateToken(user._id.toString());
      res.json({success: true, token});
           
    } catch (error) {

    console.log(error.message);
    res.json({success: false, message: error.message})
    
  }

}

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.json({ success: false, message: 'Missing Google credential.' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.json({ success: false, message: 'Google auth is not configured on server.' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.sub) {
      return res.json({ success: false, message: 'Invalid Google account data.' });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        image: payload.picture || '',
        authProvider: 'google',
        googleId: payload.sub,
      });
    } else {
      if (user.authProvider !== 'google') {
        user.authProvider = 'google';
      }
      user.googleId = payload.sub;
      user.image = payload.picture || user.image;
      await user.save();
    }

    const token = generateToken(user._id.toString());
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: 'Google sign-in failed.' });
  }
}


// Get user data from using Token 

export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.json({success: true ,user});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


//get all cars for the frontend 

export const getCars = async (req, res) => {
    try {
         const cars = await Car.find({isAvaliable: true})
         res.json({success: true, cars}) 

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}