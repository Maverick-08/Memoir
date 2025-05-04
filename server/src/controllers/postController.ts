import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
config();
const prisma = new PrismaClient();

export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    const fileInfo = req.files as Express.MulterS3.File[];;
    const postContent:string = req.body.content;
    const userDetails = req.userDetails as {userId:string;email:string};
    const postTags:string[] = getPostTags(postContent);
    // console.log(fileInfo);

    // 1. Create Post
    const postInfo = await prisma.post.create({
      data:{
        authorId:userDetails.userId,
        content:postContent
      }
    })

    // 2. Save Image Url's of post
    if(fileInfo){
      for(let file of fileInfo){
        await prisma.postImageResources.create({
          data:{
            postId:postInfo.id,
            imageUrl:file.location
          }
        })
      }
    }

    // 3. Create post tag's
    for(let tag of postTags){
      await prisma.tags.create({
        data:{
          postId:postInfo.id,
          tagName:tag
        }
      })
    }

    res.status(StatusCode.ResourceCreated).json({msg:"Post created successfully !" });
  } catch (err) {
    console.log("Error : @handleImageUpload :\n"+err)
    res.status(StatusCode.ServerError).json({ msg:"Your post could not be created" });
  }
};

const getPostTags = (content:string) => {
  const postTags:string[] = [];
  const words = content.split(" ");

  for(let word of words){
    if(word.startsWith("#")){
      postTags.push(word.split("#")[1].toUpperCase());
    }
  }
  
  return postTags;
}


//  ->  Req.files
// [
//   {
//     fieldname: 'images',
//     originalname: 'image3.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     size: 401413,
//     bucket: 'memoir-s3-bucket',
//     key: 'post/images/e8b606c4-a163-402d-b4fe-16f85399950b-image3.png',
//     acl: 'private',
//     contentType: 'application/octet-stream',
//     contentDisposition: null,
//     contentEncoding: null,
//     storageClass: 'STANDARD',
//     serverSideEncryption: null,
//     metadata: undefined,
//     location: 'https://memoir-s3-bucket.s3.ap-south-1.amazonaws.com/post/images/e8b606c4-a163-402d-b4fe-16f85399950b-image3.png',
//     etag: '"96274d535dbe4523fd071fa772035290"',
//     versionId: undefined
//   }
// ]