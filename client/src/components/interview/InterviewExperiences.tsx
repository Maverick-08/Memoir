import { useEffect, useState } from "react";
import InterviewDisplayComponent from "./InterviewDisplayComponent";
import InterviewSearchComponent from "./InterviewSearchComponent";
import { BASE_URL, InterviewData } from "@/config";
import axios from "axios";

const InterviewExperiences = () => {
  const [loading, setLoading] = useState(true);
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
  const [filteredInterviewData, setFilteredInterviewData] = useState<
    InterviewData[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/experience`, {
        withCredentials: true,
      });
      setLoading(false);
      setInterviewData(response.data.data);
      setFilteredInterviewData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-24 lg:pt-8">
        <div className="shadow bg-white rounded-lg py-8">
          {/* Search Component */}
          <InterviewSearchComponent
            interviewData={interviewData}
            setFilteredInterviewData={setFilteredInterviewData}
          />

          {/* Main Component  */}
          <div className="sm:px-8 mt-8">
    
            <InterviewDisplayComponent
              loading={loading}
              interviewData={filteredInterviewData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewExperiences;
