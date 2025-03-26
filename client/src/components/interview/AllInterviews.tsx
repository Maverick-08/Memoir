import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiBriefcase } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { LuExternalLink } from "react-icons/lu";
import axios from "axios";

interface InterviewData {
  companyName: string;
  name: string;
  registrationNumber: number;
  interviewStatus: string;
  compensation?: number;
  roundDetails: Rounds[];
}

interface Rounds {
  roundName: string;
  roundType: string;
  note?: string;
  questions: Questions[];
}

interface Questions {
  title: string;
  description: string;
  link?: string;
}

const AllInterviews = () => {
  const [companies, setCompanies] = useState<InterviewData[]>([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [selectedCompany, setSelectedCompany] = useState({} as InterviewData);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/experience",{withCredentials:true})
      
     setCompanies(response.data.data)
    }

    fetch();
  },[])

  const filterCompanies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchCompany(searchText);

    if (searchText.length === 0) {
      setCompanies(companies);
    } else {
      const filteredCompanies = companies.filter((data) =>
        data.companyName.toLowerCase().includes(searchText.toLowerCase())
      );
      setCompanies(filteredCompanies);
    }
  };

  return (
    <div className="pt-12 px-32">
      <InterviewModal
        open={modalState}
        setOpen={setModalState}
        selectedCompany={selectedCompany}
      />
      <div className="w-full pt-8 shadow px-4 rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-[15%] flex flex-col justify-center gap-4  px-4 ">
          <p className="text-2xl font-medium">All Interviews</p>
          <input
            type="text"
            placeholder="Enter company name"
            value={searchCompany}
            onChange={filterCompanies}
            className="focus:outline-none border border-gray-200 w-72 px-2 py-2 ml-1 rounded-md hover:border-sky-500 hover:bg-sky-100"
          />
        </div>
        <div className="pt-8">
          <div className="grid grid-cols-5 border-b border-gray-200 py-4 font-semibold text-xl text-center">
            <div>
              <p>Reg Number</p>
            </div>
            <div>
              <p>Name</p>
            </div>
            <div>
              <p>Company Name</p>
            </div>
            <div>
              <p>Status</p>
            </div>
            <div>
              <p>Action</p>
            </div>
          </div>
          {companies.map((data, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-5 text-center py-4 border-b border-gray-200 text-wrap text-lg"
              >
                <div className="my-auto">
                  <p>{data.registrationNumber}</p>
                </div>
                <div className="my-auto">
                  <p>{data.name}</p>
                </div>
                <div className="my-auto">
                  <p>{data.companyName}</p>
                </div>
                <div className="my-auto">
                  <p>{data.interviewStatus.toUpperCase()}</p>
                </div>
                <div
                  className="cursor-pointer my-auto"
                  onClick={() => {
                    setModalState(true);
                    setSelectedCompany(data);
                  }}
                >
                  <span className="bg-black text-gray-200 hover:text-white px-6 py-1.5 rounded-md">
                    View
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

const InterviewModal = ({
  open,
  setOpen,
  selectedCompany,
}: {
  open: boolean;
  setOpen: (x: boolean) => void;
  selectedCompany: {
    companyName: string;
    name: string;
    registrationNumber: number;
    interviewStatus: string;
    compensation?: number;
    roundDetails: {
      roundName: string;
      roundType: string;
      note?: string;
      questions: {
        title: string;
        description: string;
        link?: string;
      }[];
    }[];
  };
}) => {
  const handleClose = () => setOpen(false);

  if (!open) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-[60%] h-[60%] p-4 overflow-auto"
      >
        <div className="w-full h-full">
          <div className=" w-full">
            <div className="flex justify-between">
              <p className="text-xl font-medium">Interview Details</p>
              <span className="cursor-pointer" onClick={handleClose}>
                <RxCross2 size={24} />
              </span>
            </div>
            <div className="mt-8 px-8 pb-8 ">
              <div className="border  px-4 pt-6 pb-4 border-gray-300 rounded-md ">
                <TextComponent selectedCompany={selectedCompany} />

                {selectedCompany.roundDetails.map((data, index) => {
                  return <Accordion key={index} roundDetails={data} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextComponent = ({
  selectedCompany,
}: {
  selectedCompany: {
    companyName: string;
    name: string;
    registrationNumber: number;
    interviewStatus: string;
    compensation?: number;
  };
}) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <p className="text-3xl font-bold">{selectedCompany.companyName}</p>
        <p className="text-[#64748B] text-lg mt-3">
          Name :{" "}
          <span className="text-[#64748B] font-medium">
            {selectedCompany.name}
          </span>
        </p>
        <p className="text-[#64748B] text-lg mt-1">
          Reg Number : <span>{selectedCompany.registrationNumber}</span>
        </p>
      </div>
      <div className=" col-span-2">
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>
              <FiBriefcase size={24} />
            </span>
            <span className="text-lg font-semibold">Placement Status : </span>
          </div>
          <div>
            {selectedCompany.interviewStatus === "selected" ? (
              <span className="bg-emerald-400 px-6 py-1 rounded-md text-md">
                Placed
              </span>
            ) : selectedCompany.interviewStatus === "pending" ? (
              <span className="bg-sky-400 px-6 py-2 rounded-md text-lg">
                Pending
              </span>
            ) : (
              <span className="bg-red-400 px-6 py-2 rounded-md text-lg">
                Rejected
              </span>
            )}
          </div>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span>
              <MdCurrencyRupee size={24} />
            </span>
            <span className="text-lg font-semibold">Compensation : </span>
          </div>
          <span className="text-lg">{selectedCompany.compensation}</span>
          <span>Lpa</span>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  roundDetails,
}: {
  roundDetails: {
    roundName: string;
    roundType: string;
    note?: string;
    questions: {
      title: string;
      description: string;
      link?: string;
    }[];
  };
}) => {
  const [accordianOpen, setAccordionOpen] = useState(false);
  return (
    <div className="mt-6 border-b border-gray-400 py-3 ">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setAccordionOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2 font-medium">
          <p>{roundDetails.roundName}</p>
          <span className="px-2 py-1 border border-gray-300 rounded-xl ">
            {roundDetails.roundType}
          </span>
        </div>
        {accordianOpen ? (
          <span>
            <FiMinus size={24} />
          </span>
        ) : (
          <span>
            <FiPlus size={24} />
          </span>
        )}
      </div>

      {accordianOpen && ( //Conditional rendering here
        <div className="text-[#64748B] text-sm">
          {roundDetails.note && (
            <div className="py-4 tracking-wider">{roundDetails.note}</div>
          )}
          {roundDetails.questions.map((data, index) => (
            <div
              key={index}
              className="mt-4 py-4 px-4 rounded-md border border-gray-300"
            >
              <p className="text-md text-black font-medium mb-6">
                {data.title}
              </p>
              <p className="mb-4">{data.description}</p>
              {data.link && (
                <span className="flex gap-2 items-center text-[#2563EB]">
                  <span>
                    <LuExternalLink size={16} />
                  </span>
                  <a href={data.link} target="_blank" rel="noopener noreferrer">
                    Resource Link
                  </a>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInterviews;
