import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose' ;
import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';
import 'dotenv/config';

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",recipeRouter);

mongoose.connect(process.env.MONGO_URL,
);

app.listen(3001,()=>console.log("Yes started")); 
