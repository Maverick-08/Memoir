import React from "react";
import { Box, Drawer } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { useSetRecoilState } from "recoil";
import { userAuthStateAtom, userDetailsAtom } from "../../store/atoms";
import axios from "axios";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const setUserAuthState = useSetRecoilState(userAuthStateAtom);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
        await axios.get("https://memoir.dev-projects.site/api/signout",{withCredentials:true});
        setUserAuthState(false);
        setUserDetails(null);
        navigate("/")
    }
    catch(err){
      console.log(err);
    }
  }

  const Options = [
    {
      text: "All Interviews",
      link:"allInterviews",
      icon: <GoPeople size={24} />,
    },
    {
      text: "My Interviews",
      link:"personalInterviews",
      icon: <GoPerson size={24} />,
    },
    {
      text: "Add Experience",
      link:"addExperience",
      icon: <IoAddCircleOutline size={24} />,
    },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, height: "100%" }} role="presentation">
      <div className="relative px-2 flex flex-col justify-between w-full h-full">
        <span className="absolute top-4 right-4 px-3 py-2 hover:bg-slate-100 rounded-md cursor-pointer">
          <RxCross2 size={28} onClick={toggleDrawer(false)} />
        </span>
        <div className="w-full h-[60vh] pt-24">
          <p className="text-3xl font-medium pl-4 cursor-pointer">Dashboard</p>
          <div className="pl-3 pr-2 mt-8 flex flex-col gap-12">
            {Options.map((option, index) => {
              return (
                <Link to={"/"+option.link} key={index}>
                  <div
                    className="pl-4 py-1.5 rounded-md flex items-center gap-4 hover:bg-slate-100 cursor-pointer"
                  >
                    <span>{option.icon}</span>
                    <span className="text-lg font-medium">{option.text}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-full pl-2 pb-8">
          <div onClick={handleLogout} className="flex items-center gap-4 py-1.5 pl-3 rounded-md cursor-pointer hover:bg-slate-100">
            <span>
              <TbLogout2 size={24} />
            </span>
            <span className="text-lg font-medium">Logout</span>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div className="relative container mx-auto">
      <div className="absolute cursor-pointer top-4 pl-4 hover:pl-6 py-0.5 rounded-md ease-in duration-200 hover:bg-gray-100 w-20">
        <span onClick={() => toggleDrawer(true)()}>
          <IoMenu size={36} />
        </span>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {children}
    </div>
  );
};

export default DashboardLayout;
