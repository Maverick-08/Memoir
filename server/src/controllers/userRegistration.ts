import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCode } from "../config/status-code";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

interface Record {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  course: string;
  branch: string;
  yearOfPassingOut: number;
}

interface payloadValidatorResponse {
  status: boolean;
  msg: string;
}

export const userRegistrationHandler = async (req: Request, res: Response) => {
  try {
    // 1. Extract the payload from req body
    const payload: Record = req.body;

    // 2. Validate the data
    const isPayloadValid = validatePayload(payload);
    if (!isPayloadValid.status) {
      res.status(StatusCode.BadRequest).json(isPayloadValid.msg);
      return;
    }

    // 3. Check if the user does not already exist in the database
    const userExist = await prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (userExist) {
      res.status(StatusCode.Conflict).json({ msg: "User already exist" });
      return;
    }

    // 4. If user does not exist then create the record
    // Hash the password
    const hashedPassword = await hash(payload.password, 10);

    const record: Record = {
      ...payload,
      password: hashedPassword,
    };

    // 5. Enter the record into the database
    await prisma.user.create({
      data: record,
    });

    res
      .status(StatusCode.ResourceCreated)
      .json({ msg: "Your account has been created !" });

    return;
  } catch (err) {
    console.log("Error @userRegistrationHandler \n", err);
    res.status(StatusCode.ServerError).json({ msg: "Server error" });
    return;
  }
};

const validatePayload = (payload: Record): payloadValidatorResponse => {
  if (!payload.firstName) return { status: false, msg: "Name field is missing" };
  else if (!payload.lastName) return { status: false, msg: "Last Name field is missing" };
  else if (!payload.email)
    return { status: false, msg: "Email field is missing" };
  else if (!payload.course || !payload.branch || !payload.yearOfPassingOut)
    return { status: false, msg: "Course Details is missing" };
  else if (!payload.password)
    return { status: false, msg: "Password field is missing" };
  return { status: true, msg: "" };
};

/*    Input

{
    "name":"Vivek Ojha",
    "email":"ojhavivek24@gmail.com",
    "password":"Vivek@2001",
    "degree":"MCA",
    "branch":"Not Applicable",
    "yearOfPassingOut":2026,
    "linkedIn":"jhds",
    "xHandle":"jksdk"
} 

*/
