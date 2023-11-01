import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router=express.Router();


router.post("/",verifyToken,async(req,res)=>{
    const recipe= new RecipeModel(req.body);
    try{
        const response=await recipe.save();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
})

router.get("/",async(req,res)=>{ 
    try{
        const response=await RecipeModel.find({});
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put("/",async(req,res)=>{
    const recipe= await RecipeModel.findById(req.body.recipeID);
    const user= await UserModel.findById(req.body.userID);
    try{
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes:user.savedRecipes});
    }
    catch(err){
        res.json(err);
    }
})

router.get("/savedRecipes/ids/:userID",async(req,res)=>{
    try{
        const user= await UserModel.findById(req.params.userID);
        res.json({savedRecipes:user?.savedRecipes});
    }
    catch(err){
        res.json(err);
    }
})

router.get("/savedRecipes/:userID",async(req,res)=>{
    try{
        const user= await UserModel.findById(req.params.userID);
        const savedRecipes=await RecipeModel.find({
            _id:{$in:user.savedRecipes},
        });
        res.json({savedRecipes});
    }
    catch(err){
        res.json(err);
    }
})

export {router as recipeRouter};
