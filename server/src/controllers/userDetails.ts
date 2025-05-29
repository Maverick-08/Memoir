import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../config/status-code";
const prisma = new PrismaClient();

export const userDetailsHandler = async (req: Request, res: Response) => {
  try {
    const requestedUser = req.params as unknown as { userId: string };
    const currentUser = req.userDetails as { userId: string; email: string };

    if (!requestedUser.userId) {
      res.status(StatusCode.BadRequest).json({ msg: "Missing user id" });
      return;
    }

    const userDetails = await prisma.user.findFirst({
      where: {
        id: requestedUser.userId,
      }
    });

    if (!userDetails) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "The user does not exist" });
      return;
    }

    res
      .status(StatusCode.RequestSuccessfull)
      .json({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        course: userDetails.course,
        branch: userDetails.branch,
        yearOfPassingOut: userDetails.yearOfPassingOut,
        linkedIn:userDetails.linkedIn,
        leetcode:userDetails.leetcode,
        github:userDetails.github,
        gfg:userDetails.gfg,
        xHandle:userDetails.xHandle,
        codeforces:userDetails.codeforces,
        profileUrl:userDetails.profileUrl,
        backgroundImageUrl:userDetails.backgroundImageUrl,
        showEditOption:
          currentUser.userId == requestedUser.userId ? true : false,
      });
    return;
  } catch (err) {
    console.log("Error @userDetailsHandler : " + "\n" + err);
    res.json(StatusCode.ServerError).json({ msg: "Server Error" });
    return;
  }
};
