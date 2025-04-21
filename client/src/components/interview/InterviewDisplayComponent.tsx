import "../../index.css";

import { InterviewData } from "@/config";

const InterviewDisplayComponent = ({
  loading,
  interviewData,
}: {
  loading: boolean;
  interviewData: InterviewData[];
}) => {
  if (loading) {
    return (
      <div className="pt-16">
        <div className="flex justify-center">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow border-t-4 border-b-4 border-sky-400 rounded-xl px-2">
      <div className="grid grid-cols-11 py-4 text-sm sm:text-sm md:text-xl font-medium text-center border-b">
        <div className="col-span-1">SR.NO</div>
        <div className="col-span-3">NAME</div>
        <div className="col-span-4 sm:col-span-3">COMPANY NAME</div>
        <div className="hidden sm:block sm:col-span-2">STATUS</div>
        <div className="col-span-3 sm:col-span-2">ACTION</div>
      </div>

      <div className="text-center flex flex-col">
        {interviewData.map((interviewData, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-11 h-16 place-items-center border-b-1 text-sm sm:text-sm md:text-lg"
            >
              <div className="col-span-1">{index + 1}</div>
              <div className="col-span-3">
                {interviewData.name.toUpperCase()}
              </div>
              <div className="col-span-4 sm:col-span-3">
                {interviewData.companyName.toUpperCase()}
              </div>
              <div className="hidden sm:block sm:col-span-2">
                {interviewData.interviewStatus.toUpperCase()}
              </div>
              <div className="col-span-3 sm:col-span-2 bg-black text-white px-4 md:px-6 py-1 md:py-1.5 cursor-pointer rounded-md">
                VIEW
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewDisplayComponent;
