// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { StatusCode } from "../config/status-code";

// const prisma = new PrismaClient();

// interface Post {
//     email:string,
//     name:string,
//     degree:string,
//     branch:string,
//     yearOfPassingOut:number
//     title:string,
//     message?:string,
//     createdAt:Date
// }

// interface UserDetails {
//     [key: string]: any;
//     email:string,
//     name:string,
//     degree:string,
//     branch:string,
//     yearOfPassingOut:number
// }

// export const postUserUpdates = async (req:Request,res:Response) => {
//     try{
//         // 1. Extract the content
//         const post:Post = req.body;

//         // 2. Check whether post title is empty or not
//         if(!post.title){
//             res.json(StatusCode.BadRequest).json({msg:"Title field cannot be empty"})
//             return
//         }

//         // 3. Extract user details from the request header
//         const userDetails = req.userDetails as UserDetails

//         // 4. Create the record
//         post.email = userDetails.email
//         post.name = userDetails.name
//         post.degree = userDetails.degree
//         post.branch = userDetails.branch
//         post.yearOfPassingOut = userDetails.yearOfPassingOut
//         post.createdAt = new Date()
        

//         // 5. Insert the record in the database
//         await prisma.post.create({
//             data:post
//         })

//         res.status(StatusCode.ResourceCreated).json({msg:"Post has been created"})
//         return
//     }
//     catch(err){
//         console.log("Error @postUserUpdates \n"+err)
//         res.status(StatusCode.ServerError).json({msg:"Error creating the post"})
//         return
//     }
// }


// export const getUserUpdates = async (req:Request,res:Response) => {
//     try{
//         const allPosts = await prisma.post.findMany()

//         res.status(StatusCode.RequestSuccessfull).json({data:allPosts})

//         return
//     }
//     catch(err){
//         console.log("Error @getUserUpdates \n"+err)
//         res.status(StatusCode.ServerError).json({msg:"Error fetching the post"})
//         return
//     }
// }