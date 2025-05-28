import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../config/status-code";
const prisma = new PrismaClient();

export const doesUserExist = async (req: Request, res: Response) => {
  try {
    const payload = req.params as unknown as { userId: string };

    if (!payload.userId) {
      res.status(StatusCode.BadRequest).json({ msg: "User does not exist" });
      return;
    }

    const response = await prisma.user.findFirst({
      where: {
        id: payload.userId,
      },
    });

    if (!response) {
      res.status(StatusCode.BadRequest).json({ msg: "User does not exist" });
      return;
    }

    res.status(StatusCode.RequestSuccessfull).json({ msg: "User exist" });
    return;
  } catch (err) {
    console.log("Error @doesUserExist : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
    return;
  }
};
