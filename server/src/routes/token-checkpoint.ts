import { Router,Request,Response } from "express";
import { StatusCode } from "../config/status-code";

const router = Router();

router
  .route("/")
  .get((req:Request,res:Response) => {
    res.sendStatus(StatusCode.RequestSuccessfull)
  });

  export default router