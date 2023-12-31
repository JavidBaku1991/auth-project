import express from 'express'
import { verifyToken } from '../verifyUser.js';
import errorHandler from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.js'
const router =express.Router();

router.get('/home',(req,res)=>{
    res.json({
        message:'API is ok',
    })
})

router.post('/update/:id ',verifyToken, async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can update only youor personal account!!!"))
    } 

    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser =await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                }
            },
            {new:true}
        );
        const{password, ...rest}=updatedUser._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error)
    }
});

router.delete("/delete/:id",verifyToken, async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can delete only youor personal account!!!"))
    } 
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...')
    }catch(error){

    }
})


export default router;