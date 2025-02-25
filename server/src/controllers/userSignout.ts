import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";

export const logoutHandler = async (req:Request,res:Response) => {
    try{
        res.clearCookie("__authCookie__")

        res.sendStatus(StatusCode.SuccessfullNoContent)
        return
    }
    catch(err){
        console.log("Error @logoutHandler \n"+err)
        res.status(StatusCode.ServerError).json({msg:"Server error"})
        return
    }
}