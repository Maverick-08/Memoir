import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Payload{
    userId_1: string
    userId_2: string
    pinned: boolean
}

export const createConversationHandler = async (req:Request,res:Response) => {
    try{
        const payload:Payload = req.body;

        const response = await prisma.conversation.create({
            data:{
                userId_1:payload.userId_1,
                userId_2:payload.userId_2,
                pinned:payload.pinned
            }
        })

        res.status(StatusCode.ResourceCreated).json({data:response});
        return;

    }
    catch(err){
        console.log("Error : @createConversationHandler \n" + err);
        res.status(StatusCode.ServerError).json({ msg: "Internal Server Error" });
        return;
    }
}


export const messageHandler = async (req:Request,res:Response) => {
    try{
        const payload = req.query as unknown as {conversationId:string,page:number};
        const limit = 50;

        const response = await prisma.message.findMany({
            skip: (payload.page-1)*limit,
            take: limit,
            orderBy:{
                timestamp:'desc'
            },
            where:{
                conversationId:payload.conversationId
            }
        })

        res.status(StatusCode.ResourceCreated).json({data:response});
        return;

    }
    catch(err){
        console.log("Error : @createConversationHandler \n" + err);
        res.status(StatusCode.ServerError).json({ msg: "Internal Server Error" });
        return;
    }
}