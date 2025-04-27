import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { StatusCode } from "../config/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyOtp = async (req:Request, res:Response) => {
  try{
      const payload:{userId:string,otp:number} = req.body;

      const response = await prisma.oTP.findFirst({
        where:{
          userId:payload.userId
        }
      })

      if(response && response.otp == payload.otp){
        await prisma.user.update({
          where:{
            id:payload.userId
          },
          data:{
            verified:true
          }
        })
        res.status(StatusCode.RequestSuccessfull).json({msg:"User Verified"});        
        return;
      }
      else{
        res.status(StatusCode.BadRequest).json({msg:"Invalid OTP"});
        return;
      }

  }catch(err){
    console.log("Error @verifyOtp : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server error" });
  }
}

export const sendOTP = async (userId:string, receiverEmail:string) => {
  try {
    // 1. Create an OTP
    const otp = Math.floor(Math.random() * 9000) + 1000;

    // 2. Check if user id exist
    const userIdExist = await prisma.oTP.findFirst({
      where:{
        userId
      }
    });

    // 2.1 If it exists then update the new otp
    if(userIdExist){
      await prisma.oTP.update({
        where:{
          userId
        },
        data:{
          otp
        }
      })
    }
    // 2.2 otherwise create new otp
    else{
      await prisma.oTP.create({
        data:{
          userId,
          otp
        }
      })
    }
    

    // 3. Create a transporter object
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EmailId,
        pass: process.env.EmailPasscode,
      },
    });

    // 4. Create mail options
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

    // 5. Send Mail
    await transporter.sendMail(mailOptions);
    
    return;
   
  } catch (err) {
    console.log("Error @otpHandler : \n" + err);
    return;
  }
};

