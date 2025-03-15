import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { StatusCode } from "../config/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const OTPHandler = async (req: Request, res: Response) => {
  const payload = req.query;
  // console.log(payload);

  try {
    if (payload.otp) {
      verifyOtp(req, res, {
        email: payload.email as string,
        otp: Number(payload.otp),
      });
    } else {
      sendOTP(req, res, payload.email as string);
    }
  } catch (err) {
    console.log("Error @otpHandler : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server error" });
  }
};

const sendOTP = async (req: Request, res: Response, receiverEmail: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: "organizationmemoir@gmail.com",
        pass: "nujq uhmi wefu ando",
      },
    });

    const otp = Math.floor(Math.random() * 9000) + 1000;

    const userExist = await prisma.user.findFirst({
      where:{
        email:receiverEmail
      }
    })

    if(userExist) {
      res.status(StatusCode.BadRequest).json({msg:"User is already registered !"})
      return;
    }

    const userData = await prisma.oTP.findFirst({
      where: {
        email: receiverEmail,
      },
    });
    
    let response;
    if (userData) {
      response = await prisma.oTP.update({
        where:{
          email:userData.email
        },
        data:{
          otp:[...userData.otp,otp]
        }
      });
    } else {
      response = await prisma.oTP.create({
        data: {
          email: receiverEmail,
          otp: [otp],
        },
      });
    }

    if (response) {
      const mailOptions = {
        from: "organizationmemoir@gmail.com",
        to: receiverEmail,
        subject: "OTP for Account Registration",
        html: `
                <h2>Thank you for choosing Memoir!</h2>
                <p>Your OTP for account registration is: <strong>${otp}</strong></p>
                <p>Please enter this OTP to complete your registration.</p>
              `,
      };

      transporter.sendMail(mailOptions);

      res.sendStatus(StatusCode.RequestSuccessfull);
    } else {
      throw new Error("Failed to sent otp");
    }

    return;
  } catch (err) {
    console.log("Error @otpHandler : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server error" });
    return;
  }
};

const verifyOtp = async (
  req: Request,
  res: Response,
  payload: { email: string; otp: number }
) => {
  try {
    const userData = await prisma.oTP.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!userData) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "User has not completed registration yet" });
      return;
    }

    if (userData.otp.includes(payload.otp)) {
      await prisma.oTP.update({
        where:{
          email:payload.email
        },
        data:{
          isVerified:true
        }
      })
      res.sendStatus(StatusCode.RequestSuccessfull);
    }
    else{
      res.status(StatusCode.BadRequest).json({msg:"Invalid OTP"})
    }

    return;
  } catch (err) {
    console.log("Error @verifyOtp : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server error" });
    return;
  }
};

/* 
 ->    req.query
 {email:"",otp:}

 ->  userData
 null
userData : [object Object]

*/