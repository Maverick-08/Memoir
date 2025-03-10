import { useMemo, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";

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
  return (
    <div className="pt-16 flex justify-center">
      <div className="w-[40%] shadow-lg">
        <div className="p-8">
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Company Name</p>
            <input
              type="text"
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200 focus:border-sky-500 focus:bg-sky-100"
            />
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Employment Type</p>
            <select className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200">
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
              className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200 focus:border-sky-500 focus:bg-sky-100"
            />
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <p className="font-medium">Employment Status</p>
            <select className="ml-4 focus:outline-none w-[90%] px-2 py-1 bg-slate-100/70 rounded-md border border-slate-200">
              <option value="selected">Selected</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div
            className="mt-12 flex justify-center"
            onClick={() => nextStateActive(true)}
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

interface Rounds {
  roundNumber: number;
  roundName: string;
  roundType: string;
  note?: string;
  questions: Questions[];
}

interface Questions {
  questionId: number;
  title: string;
  answer: string;
  link?: string;
}

const RoundDetails = () => {
  const [roundCount, setRoundCount] = useState(1);
  const [allRoundsDetails, setAllRoundsDetails] = useState([] as Rounds[]);

  const increaseRound = () => {
    setRoundCount((prev) => prev + 1);
  };

  const addNewRound = () => {
    setAllRoundsDetails([
      ...allRoundsDetails,
      {
        roundNumber: roundCount,
        roundName: "",
        roundType: "",
        note: "",
        questions: [{ questionId: 1, title: "", answer: "", link: "" }],
      },
    ]);
  };

  return (
    <div className="flex justify-center pt-16">
      <div className="shadow-lg border-gray-400 w-[40%] flex flex-col justify-between">
        <div className="p-8 w-full ">
          <div>
            {allRoundsDetails.length == 0 ? (
              <div className="border border-gray-300 py-4 px-4">
                <p>Add a Round</p>
              </div>
            ) : (
              allRoundsDetails.map((obj, index) => {
                return (
                  <RoundAccordian
                    key={index}
                    roundDetails={obj}
                    allRoundsDetails={allRoundsDetails}
                    setRoundCount={setRoundCount}
                    setAllRoundsDetails={setAllRoundsDetails}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-8">
          <div
            onClick={() => {
              increaseRound();
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
            <div className="w-[50%] text-center bg-black text-gray-300 hover:text-white text-xl py-2 rounded-md cursor-pointer">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoundAccordian = ({
  roundDetails,
  allRoundsDetails,
  setRoundCount,
  setAllRoundsDetails,
}: {
  roundDetails: Rounds;
  allRoundsDetails: Rounds[];
  setRoundCount: (x: number) => void;
  setAllRoundsDetails: (x: Rounds[]) => void;
}) => {
  const [accordianOpen, setAccrodianOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);

  const deleteRound = (round: Rounds) => {
    const updatedRoundsDetails = allRoundsDetails.filter(
      (obj) => obj.roundNumber != round.roundNumber
    );

    updatedRoundsDetails.forEach((value, index) => {
      value.roundNumber = index + 1;
    });

    setRoundCount(updatedRoundsDetails.length + 1);
    setAllRoundsDetails(updatedRoundsDetails);
  };

  const increaseQuestionCount = () => {
    setQuestionCount(questionCount + 1);
  };

  const newCountValue = useMemo(() => questionCount + 1, [questionCount]);

  const addNewQuestion = (round: Rounds) => {
    round.questions.push({
      questionId: newCountValue,
      title: "",
      answer: "",
      link: "",
    });

    allRoundsDetails.filter((obj) => {
      if (obj.roundNumber == round.roundNumber) {
        obj.questions = round.questions;
        return;
      }
    });

    setAllRoundsDetails(allRoundsDetails);
  };

  return (
    <>
      <div
        className={`mt-8 flex flex-col border border-gray-300 py-4 px-4 cursor-pointer`}
      >
        <div className="w-full flex justify-between">
          <span className="font-medium text-xl">
            Round <span>{roundDetails.roundNumber} </span>
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
            {allRoundsDetails.length > 1 ? (
              <span
                onClick={() => deleteRound(roundDetails)}
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
                value={`Round ${roundDetails.roundNumber}`}
                className="ml-2 px-4 py-2 w-[90%] pointer-events-none rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-medium">Round Type</p>
              <select
                name="round type"
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
                placeholder="Any thought's ? (optional)"
                className="ml-2 px-4 py-2 w-[90%] h-[15vh] resize-none rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              ></textarea>
            </div>

            <div className="flex flex-col gap-8">
              {roundDetails.questions.map((obj, index) => {
                return (
                  <QuestionAccordian
                    key={index}
                    questionObject={obj}
                    allRoundsDetails={allRoundsDetails}
                    setQuestionCount={setQuestionCount}
                    roundDetails={roundDetails}
                    setAllRoundsDetails={setAllRoundsDetails}
                  />
                );
              })}
            </div>
            <div
              onClick={() => {
                increaseQuestionCount();
                addNewQuestion(roundDetails);
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
  questionObject,
  allRoundsDetails,
  setQuestionCount,
  roundDetails,
  setAllRoundsDetails,
}: {
  questionObject: Questions;
  allRoundsDetails:Rounds[]
  setQuestionCount: (x: number) => void;
  roundDetails: Rounds;
  setAllRoundsDetails: ([]: Rounds[]) => void;
}) => {
  const [accordianOpen, setAccordionOpen] = useState(false);

  const deleteQuestion = (selectedQuestion:Questions) => {
    const filetredQuestionList = roundDetails.questions.filter(obj => obj.questionId!=selectedQuestion.questionId);

    filetredQuestionList.forEach((obj,index) => obj.questionId=index+1);
    roundDetails.questions = filetredQuestionList

    allRoundsDetails.forEach((obj) => {
      if(obj.roundNumber == roundDetails.roundNumber){
        obj.questions = roundDetails.questions;
        return;
      }
    })

    setQuestionCount(roundDetails.questions.length);
    setAllRoundsDetails(allRoundsDetails);
  }

  return (
    <div>
      <div className="border border-gray-200 px-4 py-4 w-[90%] ">
        <div className="flex justify-between items-center">
          <span className="font-medium">
            Question {questionObject.questionId}
          </span>
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
            {roundDetails.questions.length > 1 ? <span onClick={()=>deleteQuestion(questionObject)} className="text-red-500"><MdDeleteSweep size={16}/></span>:<></>}
          </div>
        </div>
        <div>
          {accordianOpen && (
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-medium">Title</p>
                <input
                  type="text"
                  placeholder="Question's title"
                  className="ml-2 px-4 py-2 w-[90%] rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Description</p>
                <textarea
                  name="answer"
                  placeholder="Any thought's ? (optional)"
                  className="ml-2 px-4 py-2 w-[90%] h-[15vh] resize-none rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">Link(optional)</p>
                <input
                  type="text"
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
