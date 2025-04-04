import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addReviews = async (req:Request,res:Response) => {
    try{
        const payload:{
            name:string;
            email:string;
            message:string;
        } = req.body;

        if(!payload.email || !payload.name || !payload.message){
            res.status(StatusCode.BadRequest).json({msg:"Invalid Payload"});
            return;
        }

        await prisma.reviews.create({
            data:{
                name:payload.name,
                email:payload.email,
                message:payload.message
            }
        })

        res.status(StatusCode.ResourceCreated).json({msg:"Review added successfully"});
        return;
    }
    catch(err){
        console.log("Error @addReviews : \n"+err);
        res.status(StatusCode.ServerError).json({msg:"Server Error"});
        return;
    }
}