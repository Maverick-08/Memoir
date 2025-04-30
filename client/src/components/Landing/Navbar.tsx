import { IoMdMenu } from "react-icons/io";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MdHome } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { GoPeople } from "react-icons/go";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed w-full top-0 py-5 md:py-4 backdrop-blur-xl z-50 rounded-md">
      <div className="w-[95%] mx-auto flex justify-between ">
        <div className=" text-2xl md:text-2xl font-medium">Memoir</div>
        <div className="">
          <ul className="hidden md:flex justify-around gap-16 text-xl text-gray-500">
            <li className="cursor-pointer">
              <Link to="Home" smooth={true} duration={1000}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="Reviews" smooth={true} duration={1000}>
                Reviews
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="Developers" smooth={true} duration={1000}>
                Developers
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="Contact Us" smooth={true} duration={1000}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <SideDrawer />
        </div>
      </div>
    </div>
  );
};

const SideDrawer = function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isUserLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")!) ? JSON.parse(localStorage.getItem("isLoggedIn")!).status as boolean : false;
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 224 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="pt-8 px-2 flex flex-col relative">
        <span className="absolute ml-[72%] p-1 bg-gray-100 rounded-md">
          <RxCross2 size={32} />
        </span>
        <div className="h-[64vh] mt-16 flex flex-col justify-around ">
          {[
            {
              text: "Home",
              Icon: <MdHome size={32} />,
            },
            {
              text: "Reviews",
              Icon: <CgNotes size={32} />,
            },
            {
              text: "Developers",
              Icon: <GoPeople size={32} />,
            },
            {
              text: "Contact Us",
              Icon: <MdOutlineSpeakerNotes size={32} />,
            },
          ].map((obj) => (
            <div
              key={obj.text}
              className="flex items-center gap-6 font-medium p-1 "
            >
              <div>{obj.Icon}</div>
              <div className="">
                <Link
                  to={obj.text}
                  smooth={true}
                  duration={1000}
                  className="text-2xl"
                >
                  {obj.text}
                </Link>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-16 ">
            <button onClick={()=>{
              if(isUserLoggedIn){
                navigate("/auth")
              }
              else{
                navigate("/dashboard")
              }
            }} className="text-xl cursor-pointer bg-[#272E3F] text-white px-6 py-2 rounded-md">
              {isUserLoggedIn ? "Check Dashboard" : "Login Now"}
            </button>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <div
        className="md:hidden p-1 bg-gray-100 rounded-md mr-2"
        onClick={toggleDrawer(true)}
      >
        <IoMdMenu size={32} />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Navbar;
