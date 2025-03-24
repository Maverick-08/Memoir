import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import { VariantType, useSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  interviewRoundsAtomFamily,
  roundIdsAtom,
  roundQuestionsAtomFamily,
  userDetailsAtom,
} from "../../../store/atoms";
import { allInterviewRoundsDetails } from "../../../store/selector";
import axios from "axios";

const AddExperience = () => {
  const [nextStateActivated, setNextStateActivated] = useState(false);

  if (!nextStateActivated) {
    return <CompanyDetails nextStateActive={setNextStateActivated} />;
  }

  return <RoundDetails />;
};

const CompanyDetails = ({
  nextStateActive,
}: {
  nextStateActive: (x: boolean) => void;
}) => {
  const [companyName, setCompanyName] = useState("");
  const [experienceType, setExperienceType] = useState("2M Intern");
  const [compensation, setCompensation] = useState("");
  const [interviewStatus, setInterviewStatus] = useState("pending");

  useEffect(() => {
    const experienceDetails = JSON.parse(
      localStorage.getItem("experienceDetails")!
    );

    if (experienceDetails) {
      setCompanyName(experienceDetails.companyName);
      setExperienceType(experienceDetails.experienceType);
      setInterviewStatus(experienceDetails.interviewStatus);
      setCompensation(experienceDetails.compensation);
    }
  }, []);

  const setExperienceDetails = () => {
    const experienceDetails = {
      companyName,
      experienceType,
      interviewStatus,
      compensation,
    };

    localStorage.setItem(
      "experienceDetails",
      JSON.stringify(experienceDetails)
    );
  };

  return (
    <div className="pt-16 flex justify-center">
      <div className="w-[40%] shadow-lg">
        <div className="p-8">
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Company Name</p>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200 focus:border-sky-500 focus:bg-sky-100"
            />
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Employment Type</p>
            <select
              value={experienceType}
              onChange={(e) => setExperienceType(e.target.value)}
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200"
            >
              <option value="2M Intern">2M Intern</option>
              <option value="6M Intern">6M Intern</option>
              <option value="Intern">Intern</option>
              <option value="Research Intern">Research Intern</option>
              <option value="Open Source">Open Source</option>
              <option value="FTE">FTE</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Compensation(in Lpa)</p>
            <input
              type="number"
              value={compensation}
              onChange={(e) => setCompensation(e.target.value)}
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200 focus:border-sky-500 focus:bg-sky-100"
            />
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Employment Status</p>
            <select
              value={interviewStatus}
              onChange={(e) => setInterviewStatus(e.target.value)}
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200"
            >
              <option value="selected">Selected</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div
            className="mt-12 flex justify-center"
            onClick={() => {
              nextStateActive(true);
              setExperienceDetails();
            }}
          >
            <div className="w-[60%] py-1 text-lg text-center text-gray-200 hover:text-white bg-black rounded-md cursor-pointer">
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoundDetails = () => {
  const [roundIds, setRoundIds] = useRecoilState(roundIdsAtom);
  const allRoundsDetails = useRecoilValue(allInterviewRoundsDetails);
  const userDetails = useRecoilValue(userDetailsAtom);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, msg: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const addNewRound = () => {
    const roundId = "" + Math.floor(Math.random() * 1000);

    setRoundIds((prevRoundIds) => [...prevRoundIds, roundId]);
  };

  const deleteRound = (roundId: string) => {
    const updatedRoundIds = roundIds.filter((Id) => Id !== roundId);
    setRoundIds(updatedRoundIds);
  };

  const handleSubmit = async () => {
    try {
      handleClickVariant("info", "Submitting Details")();
      const companyDetails = JSON.parse(
        localStorage.getItem("experienceDetails") || "{}"
      );

      if (!companyDetails) console.log("No company data");
      else {
        const payload = {
          name: userDetails.name,
          email: userDetails.email,
          registrationNumber:userDetails.registrationNumber,
          companyName: companyDetails.companyName,
          compensation: Number(companyDetails.compensation),
          experienceType: companyDetails.experienceType,
          interviewStatus: companyDetails.interviewStatus,
          roundDetails: allRoundsDetails,
        };
        console.log(payload)
        await axios.post("http://localhost:3000/experience", payload, {
          withCredentials: true,
        });

        handleClickVariant("success", "Experience Submitted Successfully !")();
      }
    } catch (err: any) {
      handleClickVariant("error", err.response.data.msg)();
    }
  };

  return (
    <div className="flex justify-center pt-16">
      <div className="shadow-lg border-gray-400 w-[40%] flex flex-col justify-between">
        <div className="p-8 w-full ">
          <div>
            {roundIds.length == 0 ? (
              <div className="border border-gray-300 py-4 px-4">
                <p>Add a Round</p>
              </div>
            ) : (
              roundIds.map((Id, index) => {
                return (
                  <RoundAccordian
                    key={Id}
                    roundId={Id}
                    roundNumber={index + 1}
                    deleteRound={deleteRound}
                    totalRounds={roundIds.length}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-8">
          <div
            onClick={() => {
              addNewRound();
            }}
            className="ml-8 w-fit flex items-center gap-2 border border-gray-200 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 "
          >
            <span>
              <IoMdAddCircleOutline size={22} />
            </span>
            <span className="font-medium ">Add Round</span>
          </div>

          <div className="flex justify-center mb-4">
            <div
              onClick={handleSubmit}
              className="w-[50%] text-center bg-black text-gray-300 hover:text-white text-xl py-2 rounded-md cursor-pointer"
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoundAccordian = ({
  roundNumber,
  roundId,
  deleteRound,
  totalRounds,
}: {
  roundNumber: number;
  roundId: string;
  deleteRound: (x: string) => void;
  totalRounds: number;
}) => {
  const [accordianOpen, setAccrodianOpen] = useState(false);
  const [roundDetails, setRoundDetails] = useRecoilState(
    interviewRoundsAtomFamily(roundId)
  );

  useEffect(() => {
    setRoundDetails({
      roundId,
      roundName: `Round ${roundNumber}`,
      roundType: "Technical Round",
      note: "",
      questionIds: [],
    });
  }, [roundNumber]);

  const addQuestion = () => {
    const questionId =
      "R-" + roundNumber + "Q-" + Math.floor(Math.random() * 100);
    setRoundDetails({
      ...roundDetails,
      questionIds: [...roundDetails.questionIds, questionId],
    });
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestionIds = roundDetails.questionIds.filter(
      (question) => question !== questionId
    );
    setRoundDetails({ ...roundDetails, questionIds: [...updatedQuestionIds] });
  };

  return (
    <>
      <div
        className={`mt-8 flex flex-col border border-gray-300 py-4 px-4 cursor-pointer`}
      >
        <div className="w-full flex justify-between">
          <span className="font-medium text-xl">
            Round <span>{roundNumber} </span>
          </span>

          <div className="flex gap-8">
            {accordianOpen ? (
              <span onClick={() => setAccrodianOpen(false)}>
                {<FaAngleUp size={20} />}
              </span>
            ) : (
              <span onClick={() => setAccrodianOpen(true)}>
                {<FaAngleDown size={20} />}
              </span>
            )}
            {totalRounds > 1 ? (
              <span
                onClick={() => deleteRound(roundDetails.roundId)}
                className="text-red-500 cursor-pointer"
              >
                <MdDeleteSweep size={20} />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        {accordianOpen && (
          <div className="mt-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Round Name</p>
              <input
                type="text"
                defaultValue={`Round ${roundNumber}`}
                className="ml-2 px-4 py-2 w-[90%] pointer-events-none rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-medium">Round Type</p>
              <select
                name="round type"
                value={roundDetails.roundType}
                onChange={(e) =>
                  setRoundDetails({
                    ...roundDetails,
                    roundType: e.target.value,
                  })
                }
                className="ml-2 px-4 py-2 w-[90%] cursor-pointer rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              >
                <option value="Online Assessment">Online Assessment</option>
                <option value="Technical Round">Technical Round</option>
                <option value="Machine Coding Round">
                  Machine Coding Round
                </option>
                <option value="Group Discussion">Group Discussion</option>
                <option value="HR Round">HR round</option>
                <option value="CTO Round">CTO Round</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-medium">Add a Note</p>
              <textarea
                name="note"
                value={roundDetails.note}
                onChange={(e) =>
                  setRoundDetails({ ...roundDetails, note: e.target.value })
                }
                placeholder="Any thought's ? (optional)"
                className="ml-2 px-4 py-2 w-[90%] h-[15vh] resize-none rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              ></textarea>
            </div>

            <div className="flex flex-col gap-8">
              {roundDetails.questionIds.map((Id, index) => {
                return (
                  <QuestionAccordian
                    key={Id}
                    questionId={Id}
                    questionNumber={index + 1}
                    deleteQuestion={deleteQuestion}
                    totalQuestions={roundDetails.questionIds.length}
                  />
                );
              })}
            </div>
            <div
              onClick={() => {
                addQuestion();
              }}
              className="ml-8 w-fit flex items-center gap-2 border border-gray-200 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 "
            >
              <span>
                <IoMdAddCircleOutline size={20} />
              </span>
              <span>Add Question</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const QuestionAccordian = ({
  questionNumber,
  questionId,
  totalQuestions,
  deleteQuestion,
}: {
  questionNumber: number;
  questionId: string;
  totalQuestions: number;
  deleteQuestion: (x: string) => void;
}) => {
  const [accordianOpen, setAccordionOpen] = useState(false);
  const [questionDetails, setQuestionDetails] = useRecoilState(
    roundQuestionsAtomFamily(questionId)
  );

  return (
    <div>
      <div className="border border-gray-200 px-4 py-4 w-[90%] ">
        <div className="flex justify-between items-center">
          <span className="font-medium">Question {questionNumber}</span>
          <div className="flex gap-4">
            {accordianOpen ? (
              <span onClick={() => setAccordionOpen(false)}>
                <FaAngleUp size={16} />
              </span>
            ) : (
              <span onClick={() => setAccordionOpen(true)}>
                <FaAngleDown size={16} />
              </span>
            )}
            {totalQuestions > 1 ? (
              <span
                onClick={() => deleteQuestion(questionId)}
                className="text-red-500"
              >
                <MdDeleteSweep size={16} />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          {accordianOpen && (
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-medium">Title</p>
                <input
                  type="text"
                  name="title"
                  value={questionDetails.title}
                  onChange={(e) =>
                    setQuestionDetails({
                      ...questionDetails,
                      title: e.target.value,
                    })
                  }
                  placeholder="Question's title"
                  className="ml-2 px-4 py-2 w-[90%] rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Description</p>
                <textarea
                  name="description"
                  value={questionDetails.description}
                  onChange={(e) =>
                    setQuestionDetails({
                      ...questionDetails,
                      description: e.target.value,
                    })
                  }
                  placeholder="Any thought's ? (optional)"
                  className="ml-2 px-4 py-2 w-[90%] h-[15vh] resize-none rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Link(optional)</p>
                <input
                  type="text"
                  value={questionDetails.link}
                  onChange={(e) =>
                    setQuestionDetails({
                      ...questionDetails,
                      link: e.target.value,
                    })
                  }
                  placeholder="Resource link"
                  className="ml-2 px-4 py-2 w-[90%] rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
