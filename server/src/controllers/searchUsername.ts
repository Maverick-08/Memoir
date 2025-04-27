import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";

const prisma = new PrismaClient();

interface Payload {
    firstName: string;
    lastName: string | null;
}

export const searchUsernameHandler = async (req: Request, res: Response) => {
    try {
        const payload = req.query as unknown as Payload;

        const response = await prisma.user.findMany({
            where: {
                firstName: payload.firstName,
                lastName:payload.lastName ?? ""
            }
        });

        const responseData = response.map(user => {
            return {
                name: `${user.firstName} ${user.lastName ?? ""}`.trim(),
                userId: user.id,
                branch: user.branch,
                yearOfPassingOut: user.yearOfPassingOut
            };
        });

        res.status(StatusCode.RequestSuccessfull).json({ data: responseData });
    }
    catch (err) {
        console.log("Error : @searchUsernameHandler \n" + err);
        res.status(StatusCode.ServerError).json({ msg: "Internal Server Error" });
    }
}