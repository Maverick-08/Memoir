import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { LuMessageSquareText } from "react-icons/lu";
import { GoBellFill } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import {SheetDemo} from "@/components/SideDrawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      icon: <IoHome className="h-6 w-6" />,
      title:"Home",
      navigate:"/dashboard"
    },
    {
      icon: <IoPeople className="h-6 w-6"/>,
      title:"Interviews",
      navigate:"/allInterviews"
    },
    {
      icon: <LuNotebookPen className="h-6 w-6"/>,
      title:"Share Experience",
      navigate:"/addExperience"
    },
    {
      icon: <IoSettingsSharp className="h-6 w-6"/>,
      title:"Manage",
      navigate:"/personalInterviews"
    },
    {
      icon: <LuMessageSquareText className="h-6 w-6"/>,
      title:"Messages",
      navigate:"/messages"
    },
    {
      icon: <GoBellFill className="h-6 w-6"/>,
      title:"Notifications",
      navigate:"/notifications"
    },
    {
      icon: <IoPerson className="h-6 w-6"/>,
      title:"Profile",
      navigate:"/profile"
    },
  ]

  console.log(location.pathname);
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="md:text-4xl lg:text-2xl font-medium ">Memoir</div>

            <div className="hidden lg:flex lg:space-x-4 xl:space-x-8 text-sm cursor-pointer">
              {/* Home  */}
              <div
                onClick={() => {
                  navigate("/dashboard");
                }}
                className={`${
                  location.pathname == "/dashboard"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <div className="relative">
                  {/* <div className="absolute top-0 left-5 bg-red-600 rounded-full h-2 w-2"></div> */}
                  <IoHome size={20} />
                </div>
                <p>Home</p>
              </div>

              {/* All Interview */}
              <div
                onClick={() => {
                  navigate("/allInterviews");
                }}
                className={`${
                  location.pathname == "/allInterviews"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <IoPeople size={20} /> Interviews
              </div>

              {/* Share Interviews */}
              <div
                onClick={() => {
                  navigate("/addExperience");
                }}
                className={`${
                  location.pathname == "/addExperience"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <LuNotebookPen size={20} /> Share Experience
              </div>

              {/* Personal Interviews */}
              <div
                onClick={() => {
                  navigate("/personalInterviews");
                }}
                className={`${
                  location.pathname == "/personalInterviews"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <IoSettingsSharp size={20} /> Manage
              </div>

              {/* Messages */}
              <div
                onClick={() => {
                  navigate("/messages");
                }}
                className={`${
                  location.pathname == "/messages"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <LuMessageSquareText size={20} /> Mesasges
              </div>

              {/* Notifications */}
              <div
                onClick={() => {
                  navigate("/notifications");
                }}
                className={`${
                  location.pathname == "/notifications"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <GoBellFill size={20} /> Notifications
              </div>

              {/* Profile */}
              <div
                onClick={() => {
                  navigate("/profile");
                }}
                className={`${
                  location.pathname == "/profile"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                } px-4 py-1 flex flex-col items-center gap-1`}
              >
                <IoPerson size={20} /> Profile
              </div>
            </div>

            <div
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden"
            >
              <IoMenu size={24} />
            </div>

          </div>
        </div>
      </nav>
      {isMenuOpen && <div className="lg:hidden"><SheetDemo sheetOpen={isMenuOpen} setSheetOpen={setIsMenuOpen} links={links}/></div>}
      {children}
    </div>
  );
};

export default DashboardLayout;
