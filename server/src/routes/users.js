import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";     

const router =express.Router();

router.post("/register",async (req,res)=>{
    const {username,password}=req.body;
    const user=await UserModel.findOne({username});//find a model using username

    if(user){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=new UserModel({username,password:hashedPassword});//adding to database
    await newUser.save();

    res.json({message:"Succesfully Registered"});
});

router.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    const user=await UserModel.findOne({username});

    if(!user){
        return res.status(400).json({message:"User not exists"});
    }

    const isValid=await bcrypt.compare(password,user.password);//password typed to user's actual password

    if(!isValid){
        return res.status(400).json({message:"Username or Password is Incorrect"});
    }

    const token =jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id}); 
});

export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
};   
