import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";
const prisma = new PrismaClient();

export const postImpressionHandler = async (req: Request, res: Response) => {
  try {
    const payload = req.query as unknown as {
      type: "Increment" | "Decrement";
      impressionType: "React" | "Save" | "Report";
      impressionCount: number
      postId: string;
    };

    if (!payload.type || !payload.postId || !payload.impressionType) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "Invalid Query Parameters" });
      return;
    }

    if (payload.impressionType === "Report") {
      await ReportHandler(payload.type, payload.postId);
    } else if (payload.impressionType === "Save") {
      const userDetails = req.userDetails as { userId: string; email: string };
      await SavePostHandler(payload.type,payload.postId, userDetails.userId);
    } else {
        const userDetails = req.userDetails as { userId: string; email: string };
        await  ReactPostHandler(payload.type,payload.postId,userDetails.userId);
    }

    res.status(StatusCode.RequestSuccessfull).json({msg:"Post's Impression updated"});
    return;

  } catch (err) {
    console.log("Error : @postImpressionHandler \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Failed to update post stats" });
    return;
  }
};

const ReportHandler = async (type: "Increment" | "Decrement", postId: string) => {
  try {
    const postDetails = await prisma.post.findFirst({
        where:{
            id:postId
        }
    })

    if (postDetails && type === "Decrement") {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          reportCount: postDetails.reportCount > 1? postDetails.reportCount-1 : 0
        },
      });

    }
    if(postDetails && type === "Increment") {
      
      if (postDetails.reportCount + 1 > 20) {
        await prisma.post.delete({
          where: {
            id: postId,
          },
        });
      } else {
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            reportCount: postDetails.reportCount+1,
          },
        });
      }
    }
  } catch (err) {
    console.log("Error @postImpressionHandler/Report \n" + err);
  }

  return;
};

const SavePostHandler = async (
  type: "Increment" | "Decrement",
  postId: string,
  userId: string
) => {
  try {
    const postDetails = await prisma.post.findFirst({
        where:{
            id:postId
        }
    })

    if (postDetails && type === "Decrement") {
        // 1. Decrement save count in post table
        await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                saveCount: postDetails.saveCount > 1 ? postDetails.saveCount-1 : 0
            }
        })

        // 2. Remove (userId,postId) from savedPost table
        await prisma.savedPost.delete({
            where:{
                userId_postId:{
                    userId,
                    postId
                }
            }
        })

    } 
    if(postDetails && type === "Increment") {
      // 1. Update post table
      await prisma.post.update({
        where: {
            id: postId,
        },
        data:{
            saveCount: postDetails.saveCount+1
        }
      })
      
      // 2. Add postId in SavedPost Table along with userId
      await prisma.savedPost.create({
        data: {
          userId,
          postId: postId,
        },
      });
    }
  } catch (err) {
    console.log("Error @postImpressionHandler/Save \n" + err);
  }

  return;
};

const ReactPostHandler = async (
  type: "Increment" | "Decrement",
  postId: string,
  userId: string
) => {
  try {
    const postDetails = await prisma.post.findFirst({
        where:{
            id:postId
        }
    })

    if (postDetails && type === "Decrement") {
        // 1. Decrease Post Impression Count
        await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                impressionCount: postDetails.impressionCount > 1? postDetails.impressionCount-1 : 0
            }
        })
        
        // 2. Remove (postId,userId) from postImpression table
        await prisma.postImpression.delete({
            where:{
                postId_userId:{
                    postId,
                    userId
                }
            }
        })

    } 
    if(postDetails && type === "Increment") {
      // 1. Update impression count in post table
      await prisma.post.update({
        where:{
            id:postId
        },
        data:{
            impressionCount: postDetails.impressionCount+1
        }
      })

      // 2. Add (postId,userId) in postImpression table
      await prisma.postImpression.create({
        data:{
            userId,
            postId
        }
      })
     
    }
  } catch (err) {
    console.log("Error @postImpressionHandler/React \n" + err);
  }

  return;
};
