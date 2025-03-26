"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPersonalInterviewExperience = exports.deleteUserInterviewExperience = exports.postUserInterviewExperience = exports.getUserInterviewExperience = exports.updateInterviewExperience = exports.getInterviewExperienceUpdateDetails = exports.postInterviewExperience = exports.getAllInterviewExperience = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const getAllInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all interview experiences with round details and questions in a single query
        const allInterviewExperiences = yield prisma.interviewExperience.findMany({
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
            roundDetails: experience.roundDetails.map((round) => {
                var _a;
                return ({
                    roundName: round.roundName,
                    roundType: round.roundType,
                    note: round.note,
                    questions: (_a = round.questions) === null || _a === void 0 ? void 0 : _a.map((question) => ({
                        title: question.title,
                        description: question.description,
                        link: question.link,
                    })),
                });
            }),
        }));
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ data: transformedData });
        return;
    }
    catch (err) {
        console.error("Error @getAllInterviewExperience: ", err);
        res
            .status(status_code_1.StatusCode.ServerError)
            .json({ msg: "Failed to fetch interview experiences" });
        return;
    }
});
exports.getAllInterviewExperience = getAllInterviewExperience;
const postInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // NOTE : year property should create a new date in backend keeping month and year of interview same
    try {
        // 1. Extract the data
        const interviewExperience = req.body;
        // 2. Validate the data
        // 2.1 Round name & Round type cannot be empty
        for (let i = 0; i < interviewExperience.roundDetails.length; i++) {
            if (interviewExperience.roundDetails[i].roundName === "" ||
                interviewExperience.roundDetails[i].roundType === "") {
                res
                    .status(status_code_1.StatusCode.BadRequest)
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
                            .status(status_code_1.StatusCode.BadRequest)
                            .json({ msg: "Question title or description cannot be empty" });
                        return;
                    }
                }
            }
        }
        // 3. Update the record
        const userDetails = req.userDetails;
        interviewExperience.name = userDetails.name;
        interviewExperience.email = userDetails.email;
        // 4. Insert the record in the database
        const createdInterviewExperience = yield prisma.interviewExperience.create({
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
        yield prisma.personalInterviews.create(({
            data: {
                email: interviewExperience.email,
                companyName: interviewExperience.companyName,
                experienceType: interviewExperience.experienceType,
                interviewStatus: interviewExperience.interviewStatus,
                interviewExperienceId: createdInterviewExperience.id
            }
        }));
        // 5. Create RoundDetails and Questions
        for (const round of interviewExperience.roundDetails) {
            const createdRound = yield prisma.roundDetails.create({
                data: {
                    roundName: round.roundName,
                    roundType: round.roundType,
                    note: round.note,
                    interviewExperienceId: createdInterviewExperience.id,
                },
            });
            if (round.questions) {
                for (const question of round.questions) {
                    yield prisma.question.create({
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
            .status(status_code_1.StatusCode.ResourceCreated)
            .json({ msg: "Interview experience record created successfully" });
        return;
    }
    catch (err) {
        console.error("Error @postInterviewExperience \n" + err);
        res
            .status(status_code_1.StatusCode.ServerError)
            .json({ msg: "Failed to create interview experience" });
        return;
    }
});
exports.postInterviewExperience = postInterviewExperience;
const getInterviewExperienceUpdateDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const interviewExperienceId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.interviewExperienceId;
        if (!interviewExperienceId) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Interview Id is missing" });
            return;
        }
        const response = yield prisma.interviewExperience.findFirst({
            where: {
                id: interviewExperienceId
            },
            include: {
                roundDetails: {
                    include: {
                        questions: true,
                    },
                },
            }
        });
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ response });
        return;
    }
    catch (err) {
        console.log("Error @getUpdateDetails : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
        return;
    }
});
exports.getInterviewExperienceUpdateDetails = getInterviewExperienceUpdateDetails;
const updateInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        // 1. Check if payload has Interview Experience Id 
        if (!payload.id) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Interview Experience Id is missing" });
            return;
        }
        console.log("-------------- STEP 1 ------------------");
        console.log(payload);
        // 2. Find all the details associated with Interview Experience Id 
        const response = yield prisma.interviewExperience.findFirst({
            where: {
                id: payload.id
            },
            include: {
                roundDetails: {
                    include: {
                        questions: true
                    }
                }
            }
        });
        console.log("-------------- STEP 2 ------------------");
        console.log(response);
        // 3. Extract Ids for deletion
        const interviewExperienceId = response === null || response === void 0 ? void 0 : response.id;
        const roundIds = response === null || response === void 0 ? void 0 : response.roundDetails.map((round) => round.id);
        console.log("-------------- STEP 3 ------------------");
        console.log(interviewExperienceId);
        console.log(roundIds);
        console.log("-------------- STEP 4 ------------------");
        // 4. Delete all the questions associated with the each Round Id
        for (let roundId of roundIds) {
            console.log(roundId);
            yield prisma.question.deleteMany({
                where: {
                    roundDetailsId: roundId
                }
            });
        }
        console.log("-------------- STEP 5 ------------------");
        // 5. Delete all the Rounds associated with Interview Experience Id
        yield prisma.roundDetails.deleteMany({
            where: {
                interviewExperienceId
            }
        });
        console.log("-------------- STEP 6 ------------------");
        // 6. Delete the record associated with Interview Experience
        yield prisma.interviewExperience.delete({
            where: {
                id: interviewExperienceId
            }
        });
        console.log("-------------- STEP 7 ------------------");
        // 7. Delete the record in Personal Interview
        const result = yield prisma.personalInterviews.findFirst({
            where: {
                interviewExperienceId
            }
        });
        yield prisma.personalInterviews.delete({
            where: {
                id: result === null || result === void 0 ? void 0 : result.id
            }
        });
        console.log("-------------- STEP 8 ------------------");
        // 8. Create fresh record
        (0, exports.postInterviewExperience)(req, res);
    }
    catch (err) {
        console.log("Error @updateInterviewExperience : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
        return;
    }
});
exports.updateInterviewExperience = updateInterviewExperience;
const getUserInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract the email from the request
        const email = (_a = req.userDetails) === null || _a === void 0 ? void 0 : _a.email;
        if (!email) {
            res
                .status(status_code_1.StatusCode.Unauthorized)
                .json({ msg: "User details not found" });
            return;
        }
        // Fetch all interview experiences for the given email
        const userInterviewExperiences = yield prisma.personalInterviews.findMany({
            where: { email },
            orderBy: {
                createdAt: 'desc', // or 'asc' for ascending order
            }
        });
        res
            .status(status_code_1.StatusCode.RequestSuccessfull)
            .json({ data: userInterviewExperiences });
        return;
    }
    catch (err) {
        console.error("Error @getUserInterviewExperience: ", err);
        res
            .status(status_code_1.StatusCode.ServerError)
            .json({ msg: "Failed to fetch user interview experiences" });
        return;
    }
});
exports.getUserInterviewExperience = getUserInterviewExperience;
const postUserInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        if (!payload.email ||
            !payload.companyName ||
            !payload.experienceType) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Invalid payload" });
            return;
        }
        const response = yield prisma.personalInterviews.create({
            data: payload
        });
        res.status(status_code_1.StatusCode.ResourceCreated).json({ response });
        return;
    }
    catch (err) {
        console.log("Error @postUserInterviewExperience : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
    }
});
exports.postUserInterviewExperience = postUserInterviewExperience;
const deleteUserInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const interviewId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.interviewId;
        if (!interviewId) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Interview Id is missing" });
            return;
        }
        yield prisma.personalInterviews.delete({
            where: { id: interviewId }
        });
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ msg: "Interview Deleted Successfully !" });
        return;
    }
    catch (err) {
        console.log("Error @deleteUserInterviewExperience : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Deletion Failed" });
        return;
    }
});
exports.deleteUserInterviewExperience = deleteUserInterviewExperience;
const updateUserPersonalInterviewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        if (!payload.id || !payload.email || !payload.companyName || !payload.experienceType || !payload.interviewStatus) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Invalid payload" });
            return;
        }
        yield prisma.personalInterviews.update({
            where: { id: payload.id },
            data: {
                companyName: payload.companyName,
                experienceType: payload.experienceType,
                interviewStatus: payload.interviewStatus
            }
        });
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ msg: "Interview updated successfully" });
        return;
    }
    catch (err) {
        console.log("Error @updatePersonalInterviewExperience : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
        return;
    }
});
exports.updateUserPersonalInterviewExperience = updateUserPersonalInterviewExperience;
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
