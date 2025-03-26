import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../config/status-code";

const prisma = new PrismaClient();

interface InterviewExperience {
  [key: string] : any;
  name: string;
  email: string;
  registrationNumber: string;
  companyName: string;
  compensation: number;
  experienceType: string;
  // year: Date;
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
  email: string;
  companyName: string;
  experienceType: string;
  interviewStatus: string;
  interviewExperienceId?: string;
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
      registrationNumber: experience.registrationNumber,
      name: experience.name,
      id: experience.id,
      companyName: experience.companyName,
      compensation: experience.compensation,
      experienceType: experience.experienceType,
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
        email: interviewExperience.email,
        registrationNumber: interviewExperience.registrationNumber,
        interviewStatus: interviewExperience.interviewStatus,
        name: interviewExperience.name,
        experienceType: interviewExperience.experienceType,
      },
    });

    await prisma.personalInterviews.create(({
      data:{
        email:interviewExperience.email,
        companyName:interviewExperience.companyName,
        experienceType:interviewExperience.experienceType,
        interviewStatus:interviewExperience.interviewStatus,
        interviewExperienceId:createdInterviewExperience.id
      }
    }))

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

export const getInterviewExperienceUpdateDetails = async (req:Request, res:Response) => {
  try{
      const interviewExperienceId = req.query?.interviewExperienceId;

      if(!interviewExperienceId){
        res.status(StatusCode.BadRequest).json({msg:"Interview Id is missing"});
        return;
      }

      const response = await prisma.interviewExperience.findFirst({
        where:{
          id:interviewExperienceId as string
        },
        include: {
          roundDetails: {
            include: {
              questions: true,
            },
          },
        }
      })

      res.status(StatusCode.RequestSuccessfull).json({response});
      return;
  }
  catch(err:any){
    console.log("Error @getUpdateDetails : \n"+err);
    res.status(StatusCode.ServerError).json({msg:"Server Error"});
    return;
  }
}

export const updateInterviewExperience = async (req:Request, res: Response) => {
  try{
      const payload:InterviewExperience = req.body;

      // 1. Check if payload has Interview Experience Id 
      if(!payload.id){
        res.status(StatusCode.BadRequest).json({msg:"Interview Experience Id is missing"});
        return;
      }

      // 2. Find all the details associated with Interview Experience Id 
      const response = await prisma.interviewExperience.findFirst({
        where:{
          id:payload.id
        },
        include:{
          roundDetails:{
            include:{
              questions:true
            }
          }
        }
      });

      // 3. Extract Ids for deletion
      const interviewExperienceId = response?.id as string;
      const roundIds = response?.roundDetails.map((round) => round.id);

      // 4. Delete all the questions associated with the each Round Id
      for(let roundId of roundIds!){
        await prisma.question.deleteMany({
          where:{
            roundDetailsId:roundId
          }
        })
      }

      // 5. Delete all the Rounds associated with Interview Experience Id
      await prisma.roundDetails.deleteMany({
        where:{
          interviewExperienceId
        }
      })

      // 6. Delete the record associated with Interview Experience
      await prisma.interviewExperience.delete({
        where:{
          id:interviewExperienceId
        }
      })

      // 7. Delete the record in Personal Interview
      const result = await prisma.personalInterviews.findFirst({
        where:{
          interviewExperienceId
        }
      })

      await prisma.personalInterviews.delete({
        where:{
          id:result?.id
        }
      })

      // 8. Create fresh record
      postInterviewExperience(req,res);
    
  }
  catch(err){
    console.log("Error @updateInterviewExperience : \n"+err);
    res.status(StatusCode.ServerError).json({msg:"Server Error"});
    return;
  }
}

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
    const userInterviewExperiences = await prisma.personalInterviews.findMany({
      where: { email },
      orderBy: {
        createdAt: 'desc', // or 'asc' for ascending order
      }
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

    if (
      !payload.email ||
      !payload.companyName ||
      !payload.experienceType
    ) {
      res.status(StatusCode.BadRequest).json({ msg: "Invalid payload" });
      return;
    }

    const response = await prisma.personalInterviews.create({
      data:payload
    })

    res.status(StatusCode.ResourceCreated).json({response})

    return;

  } catch (err) {
    console.log("Error @postUserInterviewExperience : \n" + err);
    res.status(StatusCode.ServerError).json({ msg: "Server Error" });
  }
};

export const deleteUserInterviewExperience = async (req:Request, res:Response) => {
  try{
      const interviewId = req.query?.interviewId;

      if(!interviewId){
        res.status(StatusCode.BadRequest).json({msg:"Interview Id is missing"});
        return;
      }

      await prisma.personalInterviews.delete({
        where:{id:interviewId as string}
      })

      res.status(StatusCode.RequestSuccessfull).json({msg:"Interview Deleted Successfully !"})

      return;
  }
  catch(err){
    console.log("Error @deleteUserInterviewExperience : \n"+err);
    res.status(StatusCode.ServerError).json({msg:"Deletion Failed"});
    return;
  }
}

export const updateUserPersonalInterviewExperience = async (req:Request,res:Response) => {
  try{
      const payload:{id:string,email:string,companyName:string,experienceType:string,interviewStatus:string} = req.body;

      if(!payload.id || !payload.email || !payload.companyName || !payload.experienceType || !payload.interviewStatus){
        res.status(StatusCode.BadRequest).json({msg:"Invalid payload"});
        return;
      }

      await prisma.personalInterviews.update({
        where:{id:payload.id},
        data:{
          companyName:payload.companyName,
          experienceType:payload.experienceType,
          interviewStatus:payload.interviewStatus
        }
      })

      res.status(StatusCode.RequestSuccessfull).json({msg:"Interview updated successfully"});
      return;
  }
  catch(err){
    console.log("Error @updatePersonalInterviewExperience : \n"+err);
    res.status(StatusCode.ServerError).json({msg:"Server Error"});
    return;
  }
}

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
