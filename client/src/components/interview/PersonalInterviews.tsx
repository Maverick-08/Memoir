import { useEffect, useState } from "react";

interface JobDetails {
  id: string; // Added an id for each job
  date: Date;
  company: string;
  jobStatus: string;
  offerType: string;
  verificationStatus: "Not Required" | "Not Verified" | "Verified";
}

// Helper function to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const PersonalInterviews = () => {
  const [filteredJobsList, setFilterJobsList] = useState([] as JobDetails[]);
  const [jobsList, setJobsList] = useState([
    {
      id: generateId(),
      date: new Date(),
      company: "Texsas Instruments",
      jobStatus: "Applied",
      offerType: "2M Intern",
      verificationStatus: "Not Verified",
    },
    {
      id: generateId(),
      date: new Date(),
      company: "Browser Stack",
      jobStatus: "In Progress",
      offerType: "6M Intern",
      verificationStatus: "Verified",
    },
    {
      id: generateId(),
      date: new Date(),
      company: "A",
      jobStatus: "Selected",
      offerType: "FTE",
      verificationStatus: "Not Verified",
    },
    {
      id: generateId(),
      date: new Date(),
      company: "B",
      jobStatus: "In Progress",
      offerType: "FTE",
      verificationStatus: "Not Required",
    },
    {
      id: generateId(),
      date: new Date(),
      company: "C",
      jobStatus: "Rejected",
      offerType: "FTE",
      verificationStatus: "Not Required",
    },
    {
      id: generateId(),
      date: new Date(),
      company: "D",
      jobStatus: "Applied",
      offerType: "FTE",
      verificationStatus: "Not Required",
    },
  ] as JobDetails[]);
  const [modalState, setModalState] = useState(false);
  const [updateJob, setUpdateJob] = useState<JobDetails | null>(null); // track the job being updated

  useEffect(() => {
    setFilterJobsList(jobsList);
  }, [jobsList]);

  const filterByCompanyName = (selectedCompany: string) => {
    const filteredList = jobsList.filter((obj) =>
      obj.company.toLowerCase().includes(selectedCompany.toLowerCase())
    );

    setFilterJobsList(filteredList);
  };

  const filterByStatusTag = (selectedTag: string) => {
    let filteredList;
    if (selectedTag === "All") {
      setFilterJobsList(jobsList);
    } else if (selectedTag === "Intern" || selectedTag === "FTE") {
      filteredList = jobsList.filter((obj) =>
        obj.offerType.toLowerCase().includes(selectedTag.toLowerCase())
      );
      setFilterJobsList(filteredList);
    } else {
      filteredList = jobsList.filter((obj) =>
        obj.jobStatus.toLowerCase().includes(selectedTag.toLowerCase())
      );
      setFilterJobsList(filteredList);
    }
  };

  const handleUpdateJob = (updatedJob: JobDetails) => {
    const updatedJobs = jobsList.map((job) => {
      if (job.id === updatedJob.id) {
        return { ...updatedJob };
      }
      return job;
    });
    setJobsList(updatedJobs);
    setFilterJobsList(updatedJobs);
  };

  const handleDeleteJob = (jobToDelete: JobDetails) => {
    const updatedJobs = jobsList.filter((job) => job.id !== jobToDelete.id);
    setJobsList(updatedJobs);
    setFilterJobsList(updatedJobs);
  };

  return (
    <div className="relative pt-16 pb-4 flex justify-center">
      {modalState && (
        <JobModal
          closeModal={setModalState}
          jobsList={jobsList}
          setJobsList={setJobsList}
          updateJob={updateJob}
          setUpdateJob={setUpdateJob}
          onUpdate={handleUpdateJob}
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

            <div className="mt-12 grid grid-cols-6 ">
              <div className="font-medium">Date</div>
              <div className="font-medium">Company</div>
              <div className="font-medium">Job Status</div>
              <div className="font-medium">Offer Type</div>
              <div className="font-medium">Verification Status</div>
              <div className="font-medium text-center">Actions</div>
            </div>
            {filteredJobsList.map((job) => {
              const date =
                job.date.getDate() +
                "/" +
                (job.date.getMonth() + 1) +
                "/" +
                job.date.getFullYear();
              return (
                <div
                  key={job.id}
                  className="mt-4 p-2 border-b border-slate-200 grid grid-cols-6 "
                >
                  <p className="tracking-wider">{date}</p>
                  <p>{job.company}</p>
                  <p
                    className={`font-semibold ${
                      job.jobStatus === "Applied"
                        ? "text-slate-500"
                        : job.jobStatus === "In Progress"
                        ? "text-blue-500"
                        : job.jobStatus === "Selected"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {job.jobStatus}
                  </p>
                  <p className="font-medium">{job.offerType}</p>
                  <div>
                    <span
                      className={` px-2 py-1 rounded-md ${
                        job.verificationStatus === "Not Required"
                          ? "bg-slate-300"
                          : job.verificationStatus === "Not Verified"
                          ? "bg-red-400"
                          : "bg-green-400"
                      }`}
                    >
                      {job.verificationStatus}
                    </span>
                  </div>
                  <div className="flex justify-center gap-4">
                    <span
                      onClick={() => {
                        setUpdateJob(job);
                        setModalState(true);
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
                setUpdateJob(null);
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
  jobsList,
  setJobsList,
  updateJob,
  setUpdateJob,
  onUpdate,
}: {
  closeModal: (x: boolean) => void;
  jobsList: JobDetails[];
  setJobsList: (updatedJobs: JobDetails[]) => void; // Changed type here
  updateJob: JobDetails | null;
  setUpdateJob: (job: JobDetails | null) => void;
  onUpdate: (updatedJob: JobDetails) => void;
}) => {
  const [company, setCompanyName] = useState(updateJob?.company || "");
  const [offerType, setOfferType] = useState(updateJob?.offerType || "");
  const [jobStatus, setJobStatus] = useState(updateJob?.jobStatus || "");

  useEffect(() => {
    if (updateJob) {
      setCompanyName(updateJob.company);
      setOfferType(updateJob.offerType);
      setJobStatus(updateJob.jobStatus);
    } else {
      setCompanyName("");
      setOfferType("");
      setJobStatus("");
    }
  }, [updateJob]);

  const addJob = () => {
    const jobDetails = {
      id: generateId(),
      date: new Date(),
      company,
      offerType,
      jobStatus,
      verificationStatus: "Not Required",
    } as JobDetails;

    const updatedJobsList = [...jobsList, jobDetails];
    setJobsList(updatedJobsList);
    closeModal(false);
  };

  const handleUpdate = () => {
    if (updateJob) {
      const updatedJobDetails: JobDetails = {
        ...updateJob,
        company: company,
        offerType: offerType,
        jobStatus: jobStatus,
      };
      onUpdate(updatedJobDetails);
      closeModal(false);
      setUpdateJob(null);
    }
  };

  return (
    <div
      onClick={() => {
        closeModal(false);
        setUpdateJob(null);
      }}
      className="fixed top-0 w-screen h-screen bg-black/40 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-lg rounded-md bg-white w-[40%]"
      >
        <div className="px-8 pt-8 pb-4 ">
          <p className="font-medium text-xl">
            {updateJob ? "Update Job Details" : "Enter Job Details"}
          </p>

          <div className="mt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="font-medium">Company Name</p>
              <input
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                className="w-[90%] bg-slate-50 px-2 py-1 rounded-sm border border-gray-100 focus:outline-none focus:border-gray-300"
                value={company}
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-medium">Offer Type</p>
              <select
                onChange={(e) => setOfferType(e.target.value)}
                className="w-[90%] bg-slate-50 px-2 py-1.5 rounded-sm border border-gray-100 focus:outline-none focus:border-gray-300"
                value={offerType}
              >
                <option disabled selected hidden>
                  Select Type
                </option>
                <option value="2M Intern">2M Intern</option>
                <option value="6M Intern">6M Intern</option>
                <option value="Intern">Intern</option>
                <option value="FTE">FTE</option>
                <option value="2M + FTE">2M + FTE</option>
                <option value="6M + FTE">6M + FTE</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-medium">Offer Status</p>
              <select
                onChange={(e) => setJobStatus(e.target.value)}
                className="w-[90%] bg-slate-50 px-2 py-1.5 rounded-sm border border-gray-100 focus:outline-none focus:border-gray-300"
                value={jobStatus}
              >
                <option disabled selected hidden>
                  Select Status
                </option>
                <option value="Applied">Applied</option>
                <option value="Selected">Selected</option>
                <option value="In Progress">In Progress</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="mt-4 flex justify-center">
              <div
                onClick={() => {
                  updateJob ? handleUpdate() : addJob();
                }}
                className="cursor-pointer bg-black text-gray-200 hover:text-white px-24 py-1.5 rounded-md text-xl"
              >
                {updateJob ? "Update" : "Submit"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInterviews;
