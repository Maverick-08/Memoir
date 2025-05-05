import { Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import { StatusCode } from "../config/status-code";

const prisma = new PrismaClient();

export const getUserFeeds = async (req:Request, res:Response) => {
    try{
        const allUserPosts = await prisma.post.findMany({
            include:{
                postResource:true,
                tag:true
            },
            orderBy:{
                createdAt: "desc"
            }
        });

        let response:{
            id: string;
            authorId: string;
            firstName: string;
            lastName: string;
            branch:string;
            yearOfPassingOut:number;
            content: string;
            impressionCount: number;
            saveCount: number;
            reportCount: number;
            didUserLiked: boolean;
            didUserSaved: boolean;
            createdAt: Date;
            tag: {
                id: string;
                postId: string;
                tagName: string;
            }[];
            postResource: {
                id: string;
                postId: string;
                imageUrl: string;
            }[];
        }[] = [];

        for(let post of allUserPosts){
            // 1. Find the author details of the post for showing on feed
            const authorDetails = await prisma.user.findFirst({
                where:{
                    id:post.authorId
                }
            });

            if(authorDetails){
                // 2. Get current userId
                const currentUserDetails = req.userDetails as {userId:string,email:string};

                // 3. Get all posts data which have been liked by the current user - whether the user had liked the current post
                const userImpressionsData = await prisma.postImpression.findMany({
                    where:{
                        userId:currentUserDetails.userId
                    }
                });

                // 4. Extract post Ids liked by the current user
                const postIds = userImpressionsData.map(data=>data.postId);

                // 5. Whether user had saved the current post
                const savedPostByCurrentUser = await prisma.savedPost.findFirst({
                    where:{
                        userId:currentUserDetails.userId,
                        postId:post.id
                    }
                })

                // 6. Create response object
                response.push({
                    ...post,
                    firstName:authorDetails.firstName,
                    lastName:authorDetails.lastName,
                    branch:authorDetails.branch,
                    yearOfPassingOut:authorDetails.yearOfPassingOut,
                    didUserLiked: postIds.includes(post.id),
                    didUserSaved: savedPostByCurrentUser ? true : false
                });
            }
        
        }

        res.status(StatusCode.RequestSuccessfull).json({data:response});
        return;
    }
    catch(err){
        console.log("Error : @getUserFeeds \n "+err);
        res.status(StatusCode.ServerError).json({msg:'Server Error'});
        return;
    }
}