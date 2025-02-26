import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { StatusCode } from "../config/status-code";

const TOKEN_KEY = process.env.TOKEN_KEY as jwt.Secret

export const verifyToken = (req:Request,res:Response,next:NextFunction) => {
    // 1. Extract the token
    const token = req.cookies.__authCookie__
    
    // 2. Check if token exist or not
    if(!token){
        res.status(StatusCode.Unauthorized).json({msg:"Auth Token is missing"})
        return
    }

    // 3. If token exists then verify it and set the details in the request header
    jwt.verify(
        token,
        TOKEN_KEY,
        (err:any,decoded:any) => {
            if(err){
                res.status(403).json({msg:"Invalid Token"})
                return;
            }
            else{
                req['userDetails'] = decoded
                next()
            }
        }
    )

    
}

/* req.cookies

{
  __authCookie__: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9qaGF2aXZlazI0QGdtYWlsLmNvbSIsImlhdCI6MTc0MDU2MDA2OCwiZXhwIjoxNzQwNTYwMDk4fQ.JQBlL1GYz_SKzkYJJKd904ki3ivd1QRIp59ztXo28nE'
}

Decoded
{ email: 'ojhavivek24@gmail.com', iat: 1740560978, exp: 1740561008 }

*/