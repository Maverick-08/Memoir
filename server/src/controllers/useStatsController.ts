import { Request,Response } from "express";
import {PrismaClient} from "@prisma/client";
import { StatusCode } from "../config/status-code";
const prisma = new PrismaClient();

export const userStatsHandler = async (req:Request,res:Response) => {
    try{
        const userDetails = req.userDetails as {userId:string,email:string}
        let impressionCount = 0;
        let saveCount = 0;

        // calculating total impression on user's post
        const userPostsDetails = await prisma.post.findMany({
            where:{
                authorId:userDetails.userId
            }
        });
        
        userPostsDetails.map(post => {
            impressionCount+=post.impressionCount
        });

        // calculating saved articles count
        saveCount = await prisma.savedPost.count({
            where:{
                userId:userDetails.userId
            }
        });

        res.status(StatusCode.RequestSuccessfull).json({saveCount,impressionCount});
        return;
        
    }
    catch(err){
        console.log("Error : @userStatsHandler \n"+err);
        res.status(StatusCode.ServerError).json({msg:"Server Error"});
        return
    }
}