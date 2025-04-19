import React from "react";
import { IoHome } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { LuMessageSquareText } from "react-icons/lu";
import { GoBellFill } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname);
  return (
    <div>
      <nav className="top-0 left-0 font-inter">
        <div className="container mx-auto py-1">
          <div className="flex justify-between items-center px-16 shadow">
            <div className="text-4xl font-medium">Memoir</div>
            <div className="flex space-x-12 text-sm cursor-pointer">

                {/* Home  */}
              <div
              onClick={()=>{navigate("/dashboard")}}
                className={`${
                  location.pathname == "/dashboard" ? "border-b-2 text-black" : "text-gray-400"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <IoHome size={20} /> Home
              </div>

              {/* All Interview */}
              <div
              onClick={()=>{navigate("/allInterviews")}}
                className={`${
                  location.pathname == "/allInterviews"? "border-b-2 text-black" : "text-gray-400"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <IoPeople size={20} /> Interviews
              </div>

              {/* Share Interviews */}
              <div
              onClick={()=>{navigate("/personalInterviews")}}
                className={`${
                  location.pathname == "/personalInterviews" ? "border-b-2 text-black" : "text-gray-400"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <LuNotebookPen size={20} /> Share Experience
              </div>

              {/* Messages */}
              <div
              onClick={()=>{navigate("/messages")}}
                className={`${
                  location.pathname == "/messages"? "border-b-2 text-black" : "text-gray-400"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <LuMessageSquareText size={20} /> Mesasges
              </div>

              {/* Notifications */}
              <div
              onClick={()=>{navigate("/notifications")}}
                className={`${
                  location.pathname == "/notifications" ? "border-b-2 text-black" : "text-gray-400"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <GoBellFill size={20} /> Notifications
              </div>

              {/* Profile */}
              <div
              onClick={()=>{navigate("/profile")}}
                className={`${
                  location.pathname == "/profile" ? "border-b-2 text-black" : "text-gray-400"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <IoPerson size={20} /> Profile
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default DashboardLayout;
