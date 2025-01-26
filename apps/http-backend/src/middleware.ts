import { NextFunction,Request,Response } from "express";
import Jwt  from "jsonwebtoken";
import { JWT_SCRECT } from "@repo/backend-comman/config";

export function authHandler(req:Request,res:Response,next:NextFunction){
    const token = req.headers['authorization']?.split(' ')[1] ?? " ";

    if(!token){
        res.status(403).json({message:"Token required"})
    }
        const decoded = Jwt.verify(token, JWT_SCRECT);

        if(decoded){
            //@ts-ignore
            req.userId=decoded.userId
            next();
        }else{
            res.status(403).json({
                message:"Unortharized"
            })
        }


}