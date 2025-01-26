import Express  from "express";
import jwt  from "jsonwebtoken";
import { useRouter } from "next/router";
import { JWT_SCRECT } from "@repo/backend-comman/config";
import {authHandler}  from "./middleware";
import {CreateUserSchema,SigninSchema,CreateroomSchema} from "@repo/comman/types"

const app=Express()

app.post("/signup",(req,res)=>{
    const data=CreateUserSchema.safeparse(req.body)
    if(!data.success) {
        res.json({message:"Incorrect inputs"})
        return;
    } 


    res.json({
        userid:"123"
    })

})

app.post("/signin",(req,res)=>{
    const data=SigninSchema.safeparse(req.body)
    if(!data.success) {
        res.json({message:"Incorrect inputs"})
        return;
    } 

    const userid=1
   const token= jwt.sign({
        userid
    },JWT_SCRECT)
    res.send({
        token
    })
})

app.post("/room",authHandler,(req,res)=>{

    const data=CreateroomSchema.safeparse(req.body)
    if(!data.success) {
        res.json({message:"Incorrect inputs"})
        return;
    } 
    res.json({
        roomid:123
    })
})

app.listen(3001)