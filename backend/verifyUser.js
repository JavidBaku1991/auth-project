import jwt from 'jsonwebtoken';
import errorHandler from './utils/error.js';

export const verifyToken =(req,res,next)=>{
    const token=req.cookie.access-token;


    if(!token) return next(errorHandler(401,'Access denied!!!'));

    
    jwt.verify(token, process.env.SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Token is not valild"));

        req.user=user;
        next();
    })
}