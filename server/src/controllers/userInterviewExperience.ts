import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../config/status-code";

const prisma = new PrismaClient();

interface InterviewExperience {
  name: string;
  email: string;
  companyName: string;
  compensation: number;
  experienceType: string;
  year: Date;
  interviewStatus: string;
  roundDetails: RoundDetails[];
}

interface RoundDetails {
  roundName: string;
  roundType: string;
  note?: string;
  questions?: Questions[];
}

interface Questions {
  title: string;
  description: string;
  link?: string;
}

interface AllInterviewExperience {
  email: string;
  name: string;
  id: string;
  companyName: string;
  compensation: number;
  experienceType: string;
  year: Date;
  interviewStatus: string;
  createdAt: Date;
}

interface UserDetails {
  [key: string]: any;
  email: string;
  name: string;
  degree: string;
  branch: string;
  yearOfPassingOut: number;
}

export const getAllInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch all interview experiences with round details and questions in a single query
    const allInterviewExperiences = await prisma.interviewExperience.findMany({
      include: {
        roundDetails: {
          include: {
            questions: true,
          },
        },
      },
    });

    // Transform the data to match the expected response structure
    const transformedData = allInterviewExperiences.map((experience) => ({
      email: experience.email,
      name: experience.name,
      id: experience.id,
      companyName: experience.companyName,
      compensation: experience.compensation,
      experienceType: experience.experienceType,
      year: experience.year,
      interviewStatus: experience.interviewStatus,
      createdAt: experience.createdAt,
      roundDetails: experience.roundDetails.map((round) => ({
        roundName: round.roundName,
        roundType: round.roundType,
        note: round.note,
        questions: round.questions?.map((question) => ({
          title: question.title,
          description: question.description,
          link: question.link,
        })),
      })),
    }));

    res.status(StatusCode.RequestSuccessfull).json({ data: transformedData });
    return;
  } catch (err: any) {
    console.error("Error @getAllInterviewExperience: ", err);
    res
      .status(StatusCode.ServerError)
      .json({ msg: "Failed to fetch interview experiences" });

    return;
  }
};

export const getUserInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract the email from the request
    const email = req.userDetails?.email;

    if (!email) {
      res
        .status(StatusCode.Unauthorized)
        .json({ msg: "User details not found" });
      return;
    }

    // Fetch all interview experiences for the given email
    const userInterviewExperiences = await prisma.interviewExperience.findMany({
      where: { email },
      include: {
        roundDetails: {
          include: {
            questions: true,
          },
        },
      },
    });

    res
      .status(StatusCode.RequestSuccessfull)
      .json({ data: userInterviewExperiences });

    return;
  } catch (err: any) {
    console.error("Error @getUserInterviewExperience: ", err);

    res
      .status(StatusCode.ServerError)
      .json({ msg: "Failed to fetch user interview experiences" });

    return;
  }
};

export const postInterviewExperience = async (req: Request, res: Response) => {
  // NOTE : year property should create a new date in backend keeping month and year of interview same

  try {
    // 1. Extract the data
    const interviewExperience: InterviewExperience = req.body;

    // 2. Validate the data
    // 2.1 Round name & Round type cannot be empty
    for (let i = 0; i < interviewExperience.roundDetails.length; i++) {
      if (
        interviewExperience.roundDetails[i].roundName === "" ||
        interviewExperience.roundDetails[i].roundType === ""
      ) {
        res
          .status(StatusCode.BadRequest)
          .json({ msg: "Round name & Round type cannot be empty" });
        return;
      }
    }

    // 2.2 If each round contains additional questions then it must have a title and a description.
    for (let i = 0; i < interviewExperience.roundDetails.length; i++) {
      const round = interviewExperience.roundDetails[i];

      if (round.questions) {
        for (let j = 0; j < round.questions.length; j++) {
          if (!round.questions[j].title || !round.questions[j].description) {
            res
              .status(StatusCode.BadRequest)
              .json({ msg: "Question title or description cannot be empty" });
            return;
          }
        }
      }
    }

    // 3. Update the record
    const userDetails = req.userDetails as UserDetails;
    interviewExperience.name = userDetails.name;
    interviewExperience.email = userDetails.email;

    // 4. Insert the record in the database
    const createdInterviewExperience = await prisma.interviewExperience.create({
      data: {
        companyName: interviewExperience.companyName,
        compensation: interviewExperience.compensation,
        year: interviewExperience.year,
        email: interviewExperience.email,
        interviewStatus: interviewExperience.interviewStatus,
        name: interviewExperience.name,
        experienceType: interviewExperience.experienceType,
      },
    });

    // 5. Create RoundDetails and Questions
    for (const round of interviewExperience.roundDetails) {
      const createdRound = await prisma.roundDetails.create({
        data: {
          roundName: round.roundName,
          roundType: round.roundType,
          note: round.note,
          interviewExperienceId: createdInterviewExperience.id,
        },
      });

      if (round.questions) {
        for (const question of round.questions) {
          await prisma.question.create({
            data: {
              title: question.title,
              description: question.description,
              link: question.link,
              roundDetailsId: createdRound.id,
            },
          });
        }
      }
    }

    res
      .status(StatusCode.ResourceCreated)
      .json({ msg: "Interview experience record created successfully" });
    return;
  } catch (err: any) {
    console.error("Error @postInterviewExperience \n" + err);

    res
      .status(StatusCode.ServerError)
      .json({ msg: "Failed to create interview experience" });

    return;
  }
};

/* 
Input - post interview experience
{
    "name": "Vivek Ojha",
    "email": "ojhavivek24@gmail.com",
    "companyName": "Browser Stack",
    "compensation": 19,
    "experienceType": "Intern-2M",
    "year": "2025-02-28T04:03:13.163Z",
    "interviewStatus": "Cleared",
    "roundDetails":[
        {
            "roundName":"OA",
            "roundType":"Online Assessment",
            "note":"Do well",
            "questions":[
                {
                    "title":"Introduce yourself",
                    "description":"I intoduced myself"
                }
            ]
        },
        {
            "roundName":"Technical 1",
            "roundType":"Technical Assessment",
            "note":"Basic DSA questions",
            "questions":[
                {
                    "title":"Explain Binary search",
                    "description":"Bs method"
                },
                {
                    "title":"Explain Ternary search",
                    "description":"Ternary method"
                }
            ]
        }
    ]
}

*/
