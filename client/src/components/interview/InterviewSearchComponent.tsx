import { useCallback, useEffect, useState } from "react";
import { InterviewFilterComponent } from "./InterviewFilterComponent";
import { InterviewData } from "@/config";

const InterviewSearchComponent = ({
  interviewData,
  setFilteredInterviewData,
}: {
  interviewData: InterviewData[];
  setFilteredInterviewData: (x: InterviewData[]) => void;
}) => {
  const [selectedFilterTags, setSelectedFilterTags] = useState<string[]>([
    "ALL INTERVIEWS",
  ]);
  const [searchedCompany, setSearchedCompany] = useState("");

  const filterCompany = useCallback(() => {
    const targetCompany = searchedCompany.toUpperCase();

    if (targetCompany.length == 0) {
      setFilteredInterviewData(interviewData);
    } else {
      setFilteredInterviewData(
        interviewData.filter((interview) =>
          interview.companyName.toUpperCase().includes(targetCompany)
        )
      );
    }
  }, [interviewData, searchedCompany, setFilteredInterviewData]);

  useEffect(() => {
    filterCompany();
  }, [searchedCompany, filterCompany]);

  useEffect(() => {
    if (
      selectedFilterTags.length >= 2 &&
      selectedFilterTags[0] == "ALL INTERVIEWS"
    ) {
      const newSelectedTags = selectedFilterTags.filter(
        (tag) => tag != "ALL INTERVIEWS"
      );
      setSelectedFilterTags(newSelectedTags);
    } else if (
      selectedFilterTags.length >= 2 &&
      selectedFilterTags.includes("ALL INTERVIEWS")
    ) {
      setSelectedFilterTags(["ALL INTERVIEWS"]);
    }
  }, [selectedFilterTags]);

  return (
    <div className="px-8">
      {/* Title  */}
      <p className="text-2xl font-medium">All Interviews</p>

      {/* Search Component  */}
      <div className="mt-6 sm:ml-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <input
            type="text"
            onChange={(e) => {
              setSearchedCompany(e.target.value);
            }}
            placeholder="Enter company name"
            className="pl-2 py-1 placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:placeholder:text-gray-500 rounded-md"
          />

          <InterviewFilterComponent
            selectedTags={selectedFilterTags}
            setSelectedTags={setSelectedFilterTags}
          />
        </div>

        {/* Applied Filtered Tags */}
        <div className="mt-4 ">
          <p className="text-lg font-medium">Selected Tags</p>
          <div className="mt-2 sm:pl-2 w-full sm:w-[40%] transition-all duration-500 ease-in flex flex-wrap gap-2 sm:gap-4">
            {selectedFilterTags.map((tag, index) => {
              return <LabelComponent key={index} title={tag} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const LabelComponent = ({ title }: { title: string }) => {
  return (
    <div className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] px-2 py-1 rounded-md">
      <div className="text-xs text-white">{title}</div>
    </div>
  );
};

export default InterviewSearchComponent;
