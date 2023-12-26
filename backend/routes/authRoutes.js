import express  from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import errorHandler from '../utils/error.js';
import  jwt from "jsonwebtoken";
const router =express.Router();

router.post('/signup', async (req,res,next)=>{
   const {username,email,password}=req.body;
   const hashedPassword=bcrypt.hashSync(password,10); 
   const newUser=new User({username,email,password:hashedPassword});


   try{
        await newUser.save();
        res.status(201).json({message:"User was created!!!"})
   }catch(error){
    next(error);
   }
 
});

router.post('/signin', async(req,res,next)=>{
   const {email,password }=req.body;
   try{
      const validUser=await User.findOne({email});
      if(!validUser) return next(errorHandler(404,'User not found!!!'));
      const validPassword=bcrypt.compareSync(password,validUser.password)
      if(!validPassword) return next(errorHandler(401,'Username or Password is wrong!!!'));
   const token=jwt.sign({id:validUser._id},process.env.SECRET);
     const {password:hashedPassword, ...rest}=validUser._doc;
     const expireDate=new Date(Date.now()+36000);
   res.cookie('access-token',token,{httpOnly:true,expires:expireDate}).status(200).json(rest)
 
}   catch(err){
      next(err)
   }
   })


export default router;