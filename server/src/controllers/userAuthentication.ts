import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const prisma = new PrismaClient();

const TOKEN_KEY = process.env.TOKEN_KEY as jwt.Secret;

interface Record {
  email: string;
  password: string;
}

interface payloadValidatorResponse {
  status: boolean;
  msg: string;
}

export const userAuthenticationHandler = async (
  req: Request,
  res: Response
) => {
  // 1. Get email and password
  // 2. check if email exists in our db
  // 3. compare the password
  // 4. generate authentication cookie
  // 5. set it on response header
  // 6. store it in database

  try {
    // 1. Extract the payload from req body
    const payload: Record = req.body;

    // 2. Validate the data
    const isPayloadValid: payloadValidatorResponse = validatePayload(payload);

    if (!isPayloadValid.status) {
      res.status(StatusCode.BadRequest).json(isPayloadValid.msg);
      return;
    }

    // 3. Check if the user exists in our database
    const userExist = await prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (!userExist) {
      // If user does not exist
      res.status(StatusCode.Unauthorized).json({ msg: "User does not exist" });
      return;
    }

    const responseData = {
      email: userExist.email,
      name: userExist.name,
      registrationNumber:userExist.registrationNumber,
      degree: userExist.degree,
      branch: userExist.branch,
      yearOfPassingOut: userExist.yearOfPassingOut,
      linkedIn: userExist.linkedIn,
      xHandle: userExist.xHandle,
    };

    // IMPORTANT : Uncomment once mail service is setup
    // 4. Check if the user is verified
    // if(!userExist.isVerified){
    //     res.status(StatusCode.Unauthorized).json({msg:"User is not verified"})
    //     return
    // }

    // 5. Generate the authentication cookie
    const __authCookie__ = jwt.sign(responseData, TOKEN_KEY, {
      expiresIn: "30d",
    });

    // 6. Set the cookie in the response header
    
    // Development : {httpOnly:true,sameSite:"lax",maxAge:24*60*60*1000}
    // res.cookie("__authCookie__", __authCookie__, {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });
    
    // Production : {httpOnly:true,sameSite:"none",secure:true,maxAge:24*60*60*1000}
    res.cookie("__authCookie__", __authCookie__, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCode.RequestSuccessfull).json({...responseData});
    return;
  } catch (err) {
    console.log("Error @userAuthenticationHandler \n", err);
    res.status(StatusCode.ServerError).json({ msg: "Internal Server error" });
    return;
  }
};

const validatePayload = (payload: Record): payloadValidatorResponse => {
  if (!payload.email) return { status: false, msg: "Email field is missing" };
  else if (!payload.password)
    return { status: false, msg: "Password field is missing" };
  return { status: true, msg: "" };
};

/*    Input

{
    "email":"ojhavivek24@gmail.com",
    "password":"Vivek@2001",
} 

    Output : If user exist in the database
{
  email: 'ojhavivek24@gmail.com',
  password: '$2b$10$tlv59fpSRHKQuWpFoNMIY.cyjqsnhO4Z.delWt95oFG6MAMsnHrUy',
  name: 'Vivek Ojha',
  degree: 'MCA',
  branch: 'Not Applicable',
  yearOfPassingOut: 2026,
  isVerified: false,
  linkedIn: 'jhds',
  xHandle: 'jksdk',
  createdAt: 2025-02-25T05:37:04.497Z,
}

Output : If user does not exist in our database
null

*/
