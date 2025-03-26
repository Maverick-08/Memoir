import { useEffect, useState } from "react";
import { VariantType, useSnackbar } from "notistack";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";
import { useNavigate } from "react-router-dom";

interface InterviewDetails {
  id: string; 
  createdAt: Date;
  email:String;
  companyName: string;
  experienceType: string;
  interviewStatus: string;
  interviewExperienceId?: string
}


const PersonalInterviews = () => {
  const { enqueueSnackbar } = useSnackbar();
  const userDetails = useRecoilValue(userDetailsAtom);
  const navigate = useNavigate();
  const [filteredJobsList, setFilterJobsList] = useState<InterviewDetails[]>([]);
  const [jobsList, setJobsList] = useState<InterviewDetails[]>([]);
  const [modalState, setModalState] = useState(false);
  const [selectedJob, setSelectedJob] = useState<InterviewDetails|null>(null);


  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get("http://localhost:3000/experience/personal",{withCredentials:true})

        setJobsList(response.data.data)
        setFilterJobsList(response.data.data);
      }
      catch(err){
       handleClickVariant("error","Error Occurred")
      }
    }
    fetchData();
  },[])

  const handleClickVariant = (variant: VariantType, msg: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const filterByCompanyName = (selectedCompany: string) => {
    const filteredList = jobsList.filter((obj) =>
      obj.companyName.toLowerCase().includes(selectedCompany.toLowerCase())
    );

    setFilterJobsList(filteredList);
  };

  const filterByStatusTag = (selectedTag: string) => {
    let filteredList;
    if (selectedTag === "All") {
      setFilterJobsList(jobsList);
    } else if (selectedTag === "Intern" || selectedTag === "FTE") {
      filteredList = jobsList.filter((obj) =>
        obj.experienceType.toLowerCase().includes(selectedTag.toLowerCase())
      );
      setFilterJobsList(filteredList);
    } else {
      filteredList = jobsList.filter((obj) =>
        obj.interviewStatus.toLowerCase().includes(selectedTag.toLowerCase())
      );
      setFilterJobsList(filteredList);
    }
  };

  const handleUpdateJob = async (updatedJob: InterviewDetails) => {
    try{
       if(updatedJob.interviewExperienceId){
          const response = await axios.get(`http://localhost:3000/experience/update?interviewExperienceId=${updatedJob.interviewExperienceId}`,{withCredentials:true})

          localStorage.setItem("experienceDetails",JSON.stringify({...response.data.response,update:true}));
          navigate("/addExperience")
       }
       else{
          await axios.post("http://localhost:3000/experience/personal/update",updatedJob,{withCredentials:true});

          const updatedJobs = jobsList.map((job) => {
            if (job.id === updatedJob.id) {
              return { ...updatedJob };
            }
            return job;
          });
          setJobsList(updatedJobs);
          setFilterJobsList(updatedJobs);

          handleClickVariant("success","Interview updated successfully")()
       }
    }
    catch(err){
      console.log(err);
      handleClickVariant("error","Request Failed")()
    }
    
  };

  const handleDeleteJob = async (jobToDelete: InterviewDetails) => {
    try{
      await axios.delete(`http://localhost:3000/experience/personal?interviewId=${jobToDelete.id}`,{withCredentials:true});
      const updatedJobs = jobsList.filter((job) => job.id !== jobToDelete.id);
      setJobsList(updatedJobs);
      setFilterJobsList(updatedJobs);
      handleClickVariant("success","Interview Deleted Successfully")()
    }
    catch(err){
      handleClickVariant("error","Request Declined")()
    }
    
  };

  const addInterview = async (payload:{companyName:string,experienceType:string,interviewStatus:string,interviewExperienceId:undefined}) => {
    try{
  
     const response = await axios.post("http://localhost:3000/experience/personal",{...payload,email:userDetails.email},{withCredentials:true});

      const updatedJobsList = [response.data.response,...jobsList]
      setJobsList(updatedJobsList)
      setFilterJobsList(updatedJobsList)

      handleClickVariant("success","Experience added successfully")()
    }
    catch(err){
        console.log(err)
        handleClickVariant("error","Request Declined")()
    }
  }

  return (
    <div className="pt-16 pb-4 flex justify-center">
      {modalState && (
        <JobModal
          closeModal={setModalState}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          handleUpdateJob={handleUpdateJob}
          addInterview={addInterview}
        />
      )}
      <div className="shadow border border-gray-300 rounded-lg px-8 pt-8 w-[80%]">
        <div>
          <div>
            <p className="font-medium text-xl">My Interviews</p>

            <div className="mt-4 flex justify-between px-4">
              <input
                type="text"
                onChange={(e) => filterByCompanyName(e.target.value)}
                placeholder="Company Name"
                className="px-4 py-1 w-[30%]  rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              />
              <select
                name="Job Status"
                defaultValue={"All"}
                onChange={(e) => filterByStatusTag(e.target.value)}
                className="px-4 py-2 cursor-pointer rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
              >
                <option value="All">All</option>
                <option value="Intern">Intern</option>
                <option value="FTE">FTE</option>
                <option value="Applied">Applied</option>
                <option value="Selected">Selected</option>
                <option value="In Progress">In Progress</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="mt-12 grid grid-cols-5 ">
              <div className="font-medium">Sr.No</div>
              <div className="font-medium">Company</div>
              <div className="font-medium">Job Status</div>
              <div className="font-medium">Offer Type</div>
              <div className="font-medium text-center">Actions</div>
            </div>
            {filteredJobsList.map((job,index) => {
              return (
                <div
                  key={job.id}
                  className="mt-4 p-2 border-b border-slate-200 grid grid-cols-5 "
                >
                  <p className="tracking-wider">{index+1}</p>
                  <p>{job.companyName}</p>
                  <p
                    className={`font-semibold ${
                      job.interviewStatus === "Applied"
                        ? "text-slate-500"
                        : job.interviewStatus === "In Progress"
                        ? "text-sky-500"
                        : job.interviewStatus === "Selected"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {job.interviewStatus}
                  </p>
                  <p className="font-medium">{job.experienceType}</p>
                  <div className="flex justify-center gap-4">
                    <span
                      onClick={() => {
                        if(job.interviewExperienceId){
                          handleUpdateJob(job);
                        }
                        else{
                          setSelectedJob(job);
                          setModalState(true);
                        }
                        
                      }}
                      className="cursor-pointer px-2 py-1 text-gray-500 hover:border-green-500 hover:text-green-600 border border-gray-200 rounded-md"
                    >
                      Update
                    </span>
                    <span
                      onClick={() => handleDeleteJob(job)}
                      className="cursor-pointer px-2 py-1 text-gray-500 hover:border-red-400 hover:text-red-500 border border-gray-200 rounded-md"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              );
            })}

            <div
              onClick={() => {
                setSelectedJob(null);
                setModalState(true);
              }}
              className="mt-24 mb-4 flex justify-center"
            >
              <div className="px-12 py-2 rounded-md cursor-pointer bg-black text-slate-300 hover:text-white  text-center text-xl">
                Add a Job
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobModal = ({
  closeModal,
  selectedJob,
  setSelectedJob,
  handleUpdateJob,
  addInterview
}: {
  closeModal: (x: boolean) => void;
  selectedJob: InterviewDetails | null;
  setSelectedJob: (job: InterviewDetails | null) => void;
  handleUpdateJob: (updatedJob: InterviewDetails) => void;
  addInterview: (updatedJob:{companyName:string,experienceType:string,interviewStatus:string,interviewExperienceId:undefined} ) => void;
}) => {
  const [companyName, setCompanyName] = useState(selectedJob?.companyName ?? "");
  const [experienceType, setExperienceType] = useState(selectedJob?.experienceType ?? "2M Intern");
  const [interviewStatus, setInterviewStatus] = useState(selectedJob?.interviewStatus ?? "Applied");



  return (
    <div
      onClick={() => {
        closeModal(false);
        setSelectedJob(null);
      }}
      className="fixed top-0 w-screen h-screen bg-black/40 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-lg rounded-md bg-white w-[40%]"
      >
        <div className="px-8 pt-8 pb-4 ">
          <p className="font-medium text-xl">
            {selectedJob ? "Update Job Details" : "Enter Job Details"}
          </p>

          <div className="mt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="font-medium">Company Name</p>
              <input
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                className="w-[90%] bg-slate-50 px-2 py-1 rounded-sm border border-gray-100 focus:outline-none focus:border-gray-300"
                value={companyName}
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-medium">Experience Type</p>
              <select
                onChange={(e) => setExperienceType(e.target.value)}
                className="w-[90%] bg-slate-50 px-2 py-1.5 rounded-sm border border-gray-100 focus:outline-none focus:border-gray-300"
                value={experienceType}
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

            <div className="flex flex-col gap-4">
              <p className="font-medium">Interview Status</p>
              <select
                onChange={(e) => setInterviewStatus(e.target.value)}
                className="w-[90%] bg-slate-50 px-2 py-1.5 rounded-sm border border-gray-100 focus:outline-none focus:border-gray-300"
                value={interviewStatus}
              >
                <option value="Applied">Applied</option>
                <option value="Selected">Selected</option>
                <option value="In Progress">In Progress</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="mt-4 flex justify-center">
              <div
                onClick={() => {
                  selectedJob ? handleUpdateJob({...selectedJob,companyName,experienceType,interviewStatus}):addInterview({companyName,experienceType,interviewStatus,interviewExperienceId:undefined});
                  closeModal(false)
                }}
                className="cursor-pointer bg-black text-gray-200 hover:text-white px-24 py-1.5 rounded-md text-xl"
              >
                {selectedJob ? "Update" : "Submit"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInterviews;
