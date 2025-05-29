import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../config/status-code";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const userProfileInfoHandler = async (req: Request, res: Response) => {
  try {
    const userDetails = req["userDetails"] as { userId: string; email: string };

    // 1. If Images exist
    if (req.files) {
      // 2. Extract Images information
      const fileInfo = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      // 3. For Each field's array of images
      Object.values(fileInfo).forEach((fileArray) => {
        fileArray.forEach(async (file) => {
          // 4. Create Read stream
          const filePath = file.path;
          const fileStream = fs.createReadStream(filePath);

          // 5. Key - Path to upload on S3
          let key;
          if (file.fieldname == "profileImage")
            key = `profile/profileImage/${file.filename}`;
          else key = `profile/backgroundImage/${file.filename}`;

          // 6. Send file to S3
          await s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: key,
              Body: fileStream,
              ContentType: file.mimetype,
            })
          );

          // 7. Update in database
          if (file.fieldname == "profileImage") {
            await prisma.user.update({
              where: {
                id: userDetails.userId,
              },
              data: {
                profileUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
              },
            });
          }else{
            await prisma.user.update({
              where: {
                id: userDetails.userId,
              },
              data: {
                backgroundImageUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
              },
            });
          }

          // 8. Delete the file
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete local file:", err);
          });
        });
      });
    }

    const links = JSON.parse(req.body.links) as {
      leetcodeLink: string | null;
      codeforcesLink: string | null;
      gfgLink: string | null;
      githubLink: string | null;
      linkedInLink: string | null;
      xHandleLink: string | null;
    };

    await prisma.user.update({
      where: {
        id: userDetails.userId,
      },
      data: {
        leetcode: links.leetcodeLink,
        codeforces: links.codeforcesLink,
        gfg: links.gfgLink,
        github: links.githubLink,
        linkedIn: links.linkedInLink,
        xHandle: links.linkedInLink,
      },
    });

    res
      .status(StatusCode.ResourceCreated)
      .json({ msg: "Successfully updated user records" });
    return;
  } catch (err) {
    console.log("Error @userProfileInfoHandler \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
    return;
  }
};

/*

if (req.files) {
      const filesObj = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      Object.values(filesObj).forEach((fileArray) => {
        fileArray.forEach(async (file) => {
          if (file.fieldname == "profileImage") {
            const uploadParams = {
              Bucket: process.env.AWS_S3_BUCKET,
              Body: file.buffer,
              Key: "profile/profileImage/" + file.filename,
            };
            const command = new PutObjectCommand(uploadParams);
            await s3.send(command);
          }
          else{
             const uploadParams = {
              Bucket: process.env.AWS_S3_BUCKET,
              Body: file.buffer,
              Key: "profile/backgroundImage/" + file.filename,
            };
            const command = new PutObjectCommand(uploadParams);
            await s3.send(command);
          }
        });
      });
    }

    const linksInfo = JSON.parse(req.body.links);
    console.log(linksInfo);

{
  fieldname: 'profileImage',
  originalname: '3840x2160-beautiful-evening-purple-sunset-4k_1602533719.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads/profile',
  filename: 'cmb7wdrsq0000w0m09qp73o7t-3840x2160-beautiful-evening-purple-sunset-4k_1602533719.jpg',
  path: 'uploads\\profile\\cmb7wdrsq0000w0m09qp73o7t-3840x2160-beautiful-evening-purple-sunset-4k_1602533719.jpg',
  size: 2571072
}
{
  fieldname: 'backgroundImage',
  originalname: '225-2255010_buildings-night-stars-milky-way-galaxy-montmartre-paris.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads/background',
  filename: 'cmb7wdrsq0000w0m09qp73o7t-225-2255010_buildings-night-stars-milky-way-galaxy-montmartre-paris.jpg',
  path: 'uploads\\background\\cmb7wdrsq0000w0m09qp73o7t-225-2255010_buildings-night-stars-milky-way-galaxy-montmartre-paris.jpg',
  size: 540675
}
{
  leetcodeLink: 'leetcode',
  codeforcesLink: 'cf',
  gfgLink: 'gfg',
  githubLink: 'g',
  linkedInLink: null,
  xHandleLink: null
}

*/
