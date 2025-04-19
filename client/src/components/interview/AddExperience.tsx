/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import { VariantType, useSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  interviewRoundsAtomFamily,
  isInterviewExperienceForUpdationAtom,
  roundIdsAtom,
  roundQuestionsAtomFamily,
  userDetailsAtom,
} from "../../../store/atoms";
import { allInterviewRoundsDetails } from "../../../store/selector";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

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
  const [interviewStatus, setInterviewStatus] = useState(
    "In Progress" as "In Progress" | "Selected" | "Rejected"
  );
  const [interviewExperienceForUpdation, setInterviewExperienceForUpdation] =
    useRecoilState(isInterviewExperienceForUpdationAtom);

  useEffect(() => {
    if (interviewExperienceForUpdation?.update) {
      setCompanyName(interviewExperienceForUpdation.companyName);
      setExperienceType(interviewExperienceForUpdation.experienceType);
      setInterviewStatus(
        interviewExperienceForUpdation.interviewStatus as
          | "In Progress"
          | "Selected"
          | "Rejected"
      );
      setCompensation(String(interviewExperienceForUpdation.compensation));
    }
  }, []);

  const setExperienceDetails = () => {
    const experienceDetails = {
      companyName,
      experienceType,
      interviewStatus,
      compensation,
    };

    if (interviewExperienceForUpdation?.update) {
      localStorage.setItem(
        "experienceDetails",
        JSON.stringify({
          ...interviewExperienceForUpdation,
          companyName,
          experienceType,
          interviewStatus,
          compensation: Number(compensation),
        })
      );

      setInterviewExperienceForUpdation({
        ...interviewExperienceForUpdation,
        companyName,
        experienceType,
        interviewStatus,
        compensation: Number(compensation),
      });
    } else {
      localStorage.setItem(
        "experienceDetails",
        JSON.stringify({ ...experienceDetails, update: false })
      );
    }
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
              <option value="Intern">Intern</option>
              <option value="2M Intern">2M Intern</option>
              <option value="6M Intern">6M Intern</option>
              <option value="FTE">FTE</option>
              <option value="2M + FTE">2M + FTE</option>
              <option value="6M + FTE">6M + FTE</option>
              <option value="Open Source">Open Source</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Compensation(in Lpa)</p>
            <input
              type="number"
              value={compensation}
              onChange={(e) => {
                setCompensation(e.target.value);
              }}
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200 focus:border-sky-500 focus:bg-sky-100"
            />
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Employment Status</p>
            <select
              value={interviewStatus}
              onChange={(e) =>
                setInterviewStatus(
                  e.target.value as "In Progress" | "Selected" | "Rejected"
                )
              }
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200"
            >
              <option value="Selected">Selected</option>
              <option value="In Progress">In Progress</option>
              <option value="Rejected">Rejected</option>
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
  const [interviewExperienceForUpdation,setInterviewExperienceForUpdation] = useRecoilState(
    isInterviewExperienceForUpdationAtom
  );
  const userDetails = useRecoilValue(userDetailsAtom);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (interviewExperienceForUpdation?.update) {
      const roundIds: string[] = [];
      interviewExperienceForUpdation.roundDetails.map(
        (round: { id: string }) => {
          roundIds.push(round.id);
        }
      );
      setRoundIds(roundIds);
    }
  }, []);

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
      if(roundIds.length == 0){
        handleClickVariant("info","Please add an Round")()
        return;
      }
      if(roundIds.length == 1){
        if(!allRoundsDetails[0].note){
          handleClickVariant("info","Please add a Note")();
          return;
        }
      }
      handleClickVariant("info", "Submitting Details")();
        const companyDetails = JSON.parse(localStorage.getItem("experienceDetails")!)
        const payload = {
          name: userDetails?.name,
          email: userDetails?.email,
          registrationNumber: userDetails?.registrationNumber,
          companyName: companyDetails.companyName,
          compensation: Number(companyDetails.compensation),
          experienceType: companyDetails.experienceType,
          interviewStatus: companyDetails.interviewStatus,
          roundDetails: allRoundsDetails,
        };

        await axios.post(`${BASE_URL}/experience`, payload, {
          withCredentials: true,
        });

        localStorage.removeItem("experienceDetails");

        handleClickVariant("success", "Experience Submitted Successfully !")();
        navigate("/allInterviews");
      
    } catch (err) {
      if(axios.isAxiosError(err) && err.response){
        handleClickVariant("error", err.response.data.msg)();
      }else{
        handleClickVariant("error", 'something went wrong')();
      }
    }
  };

  const handleUpdate = async () => {
    try {
      handleClickVariant("info", "Submitting Details")();

      if (!interviewExperienceForUpdation){
        handleClickVariant("error","Interview Details Missing")();
        navigate("/personalInterviews")
      }
      else {
        const payload = {
          name: userDetails?.name,
          email: userDetails?.email,
          registrationNumber: userDetails?.registrationNumber,
          id: interviewExperienceForUpdation.id,
          companyName: interviewExperienceForUpdation.companyName,
          compensation: Number(interviewExperienceForUpdation.compensation),
          experienceType: interviewExperienceForUpdation.experienceType,
          interviewStatus: interviewExperienceForUpdation.interviewStatus,
          roundDetails: allRoundsDetails,
        };
        

        await axios.post(`${BASE_URL}/experience/update`, payload, {
          withCredentials: true,
        });

        handleClickVariant("success", "Experience Updated Successfully !")();

        localStorage.removeItem("experienceDetails");
        setInterviewExperienceForUpdation(null);
        navigate("/allInterviews")
      }
    } catch (err) {
      if(axios.isAxiosError(err) && err.response){
        handleClickVariant("error", err.response.data.msg)();
      }
      else{
        handleClickVariant("error", 'something went wrong')();
      }
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
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                interviewExperienceForUpdation?.update
                  ? handleUpdate()
                  : handleSubmit();
              }}
              className="w-[50%] text-center bg-black text-gray-300 hover:text-white text-xl py-2 rounded-md cursor-pointer"
            >
              {interviewExperienceForUpdation?.update ? "Update" : "Submit"}
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
  const interviewExperienceForUpdation = useRecoilValue(
    isInterviewExperienceForUpdationAtom
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

  useEffect(() => {
    if (interviewExperienceForUpdation?.update) {
      interviewExperienceForUpdation.roundDetails.map((round) => {
        if (round.id === roundId) {
          const givenQuestionIds: string[] = [];
          round.questions.map((question: { id: string }) => {
            givenQuestionIds.push(question.id);
          });

          setRoundDetails({
            roundId,
            roundName: `Round ${round.roundName}`,
            roundType: round.roundType,
            note: round.note ? round.note : "",
            questionIds: givenQuestionIds,
          });
        }
      });
    }
  }, []);

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
                    roundId={roundId}
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
  roundId,
  totalQuestions,
  deleteQuestion,
}: {
  questionNumber: number;
  questionId: string;
  roundId: string;
  totalQuestions: number;
  deleteQuestion: (x: string) => void;
}) => {
  const [accordianOpen, setAccordionOpen] = useState(false);
  const [questionDetails, setQuestionDetails] = useRecoilState(
    roundQuestionsAtomFamily(questionId)
  );
  const interviewExperienceForUpdation = useRecoilValue(
    isInterviewExperienceForUpdationAtom
  );

  useEffect(() => {
    if (interviewExperienceForUpdation?.update) {
      interviewExperienceForUpdation.roundDetails.map((round) => {
        if (round.id === roundId) {
          round.questions.map((question) => {
            if (question.id === questionId) {
              setQuestionDetails({
                questionId,
                title: question.title,
                description: question.description,
                link: question.link ?? "",
              });
            }
          });
        }
      });
    }
  }, []);

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
            {totalQuestions > 0 ? (
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
