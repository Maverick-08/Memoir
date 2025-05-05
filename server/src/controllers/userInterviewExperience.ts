import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../config/status-code";

const prisma = new PrismaClient();

interface InterviewExperience {
  [key : string]: any
  creatorId: string;
  creatorName: string;
  branchTag: string;
  interviewDate: Date;
  companyName: string;
  compensation: number;
  offerType: string;
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

interface UserDetails {
  [key: string]: any;
  email: string;
  name: string;
  degree: string;
  branch: string;
  yearOfPassingOut: number;
}

interface PersonalInterviewExperience {
  [key: string]: any;
  creatorId: string;
  companyName: string;
  offerType: string;
  interviewStatus: string;
  note?: string;
  followUpDate?: Date
}

export const getAllInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch all interview experiences with round details and questions in a single query
    const limit = 10;
    let payload = req.query as unknown as {page:number};


    const allInterviewExperiences = await prisma.interviewExperience.findMany({
      orderBy:{
        createdAt: 'desc'
      },
      skip: (payload?.page ? payload.page : 1 - 1) *limit,
      take: limit,
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
      username: experience.creatorName,
      id: experience.id,
      interviewDate: experience.interviewDate,
      companyName: experience.companyName,
      compensation: experience.compensation,
      offerType: experience.offerType,
      interviewStatus: experience.interviewStatus,
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

export const postInterviewExperience = async (req: Request, res: Response) => {

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

    // 3. Insert the record in the database
    const createdInterviewExperience = await prisma.interviewExperience.create({
      data: {
        creatorId: interviewExperience.creatorId,
        creatorName: interviewExperience.creatorName,
        branchTag: interviewExperience.branchTag,
        companyName: interviewExperience.companyName,
        compensation: interviewExperience.compensation,
        interviewStatus: interviewExperience.interviewStatus,
        offerType: interviewExperience.offerType,
        interviewDate: interviewExperience.interviewDate,
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

export const deleteInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const payload  = req.query as unknown as {interviewExperienceId:string};

    // 1. Check if payload has Interview Experience Id
    if (!payload.interviewExperienceId) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "Interview Experience Id is missing" });
      return;
    }

    await prisma.interviewExperience.delete({
      where:{
        id:payload.interviewExperienceId
      }
    })

    // // 2. Find all the details associated with 
    // const response = await prisma.interviewExperience.findFirst({
    //   where: {
    //     id: InterviewExperienceId as string,
    //   },
    //   include: {
    //     roundDetails: {
    //       include: {
    //         questions: true,
    //       },
    //     },
    //   },
    // });

    // // console.log("-------------- STEP 2 ------------------")
    // // console.log(response);

    // // 3. Extract Ids for deletion
    // const interviewExperienceId = response?.id as string;
    // const roundIds = response?.roundDetails.map((round) => round.id);

    // // console.log("-------------- STEP 3 ------------------")
    // // console.log(interviewExperienceId);
    // // console.log(roundIds);

    // // console.log("-------------- STEP 4 ------------------")
    // // 4. Delete all the questions associated with the each Round Id
    // for (let roundId of roundIds!) {
    //   // console.log(roundId)
    //   await prisma.question.deleteMany({
    //     where: {
    //       roundDetailsId: roundId,
    //     },
    //   });
    // }

    // // console.log("-------------- STEP 5 ------------------")
    // // 5. Delete all the Rounds associated with Interview Experience Id
    // await prisma.roundDetails.deleteMany({
    //   where: {
    //     interviewExperienceId,
    //   },
    // });

    // // console.log("-------------- STEP 6 ------------------")
    // // 6. Delete the record associated with Interview Experience
    // await prisma.interviewExperience.delete({
    //   where: {
    //     id: interviewExperienceId,
    //   },
    // });

    // console.log("-------------- STEP 7 ------------------")
    // 7. Delete the record in Personal Interview
    await prisma.appliedOpenings.delete({
      where: {
        id:payload.interviewExperienceId,
      },
    });

    res.status(StatusCode.RequestSuccessfull).json({msg:"Interview Experience Deleted"});
    return;
  } catch (err: any) {
    console.log("Error @deleteInterviewExperience : \n" + err);
    res.status(StatusCode.ServerError).json(err.response.data);
    return;
  }
};

export const getInterviewExperienceUpdateDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const payload = req.query as unknown as {interviewExperienceId:string};

    if (!payload.interviewExperienceId) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "Interview Id is missing" });
      return;
    }

    const response = await prisma.interviewExperience.findFirst({
      where: {
        id: payload.interviewExperienceId ,
      },
      include: {
        roundDetails: {
          include: {
            questions: true,
          },
        },
      },
    });

    res.status(StatusCode.RequestSuccessfull).json({ response });
    return;
  } catch (err: any) {
    console.log("Error @getUpdateDetails : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
    return;
  }
};

export const updateInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const payload: InterviewExperience = req.body;

    // 1. Check if payload has Interview Experience Id
    if (!payload.interviewExperienceId) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "Interview Experience Id is missing" });
      return;
    }
    
    // Delete Interview Experience 
    const interviewExperienceId = payload.interviewExperienceId;
    await prisma.interviewExperience.delete({
      where:{
        id:interviewExperienceId
      }
    })
    
    // Create fresh record
    postInterviewExperience(req, res);

  } catch (err) {
    console.log("Error @updateInterviewExperience : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
    return;
  }
};

export const getUserInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract the email from the request
    const payload = req.query as unknown as {creatorId:string};

    if (!payload.creatorId) {
      res
        .status(StatusCode.Unauthorized)
        .json({ msg: "User Id is missing" });
      return;
    }

    // Fetch all interview experiences for the given email
    const userInterviewExperiences = await prisma.appliedOpenings.findMany({
      where: { creatorId:payload
        .creatorId
       },
      orderBy: {
        createdAt: "desc", // or 'asc' for ascending order
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

export const postUserInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const payload: PersonalInterviewExperience = req.body;

    if (!payload.creatorId || !payload.companyName || !payload.offerType) {
      res.status(StatusCode.BadRequest).json({ msg: "Invalid payload" });
      return;
    }

    const response = await prisma.appliedOpenings.create({
      data: payload,
    });

    res.status(StatusCode.ResourceCreated).json({ response });

    return;
  } catch (err) {
    console.log("Error @postUserInterviewExperience : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
  }
};

export const deleteUserInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const payload = req.query as unknown as {personalInterviewExperienceId:string};

    if (!payload.personalInterviewExperienceId) {
      res
        .status(StatusCode.BadRequest)
        .json({ msg: "Interview Id is missing" });
      return;
    }

    await prisma.appliedOpenings.delete({
      where: { id: payload.personalInterviewExperienceId },
    });

    res
      .status(StatusCode.RequestSuccessfull)
      .json({ msg: "Interview Deleted Successfully !" });

    return;
  } catch (err) {
    console.log("Error @deleteUserInterviewExperience : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Deletion Failed" });
    return;
  }
};

export const updateUserPersonalInterviewExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const payload:PersonalInterviewExperience = req.body;

    if (
      !payload.personalInterviewExperienceId ||
      !payload.creatorId ||
      !payload.offerType ||
      !payload.companyName ||
      !payload.interviewStatus
    ) {
      res.status(StatusCode.BadRequest).json({ msg: "Invalid payload" });
      return;
    }

    await prisma.appliedOpenings.update({
      where: { id: payload.personalInterviewExperienceId },
      data: {
        companyName: payload.companyName,
        offerType: payload.offerType,
        interviewStatus: payload.interviewStatus,
        followUpDate: payload.followUpDate,
        note: payload.note
      },
    });

    res
      .status(StatusCode.RequestSuccessfull)
      .json({ msg: "Interview updated successfully" });
    return;
  } catch (err) {
    console.log("Error @updatePersonalInterviewExperience : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
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
