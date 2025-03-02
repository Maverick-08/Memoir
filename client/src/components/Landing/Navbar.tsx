import { IoMdMenu } from "react-icons/io";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MdHome } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="sticky top-0 py-5 md:py-4 backdrop-blur-xl shadow-2xs">
      <div className="w-[95%] mx-auto flex justify-between ">
        <div className=" text-3xl md:text-2xl ">Memoir</div>
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 216 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="pt-8 px-4 flex flex-col gap-12">
        <span className="ml-34 p-1 bg-gray-100 rounded-md">
          <RxCross2 size={32} />
        </span>
        {[
          {
            text: "Home",
            Icon: <MdHome size={32} />,
          },
          {
            text: "Reviews",
            Icon: <MdOutlineReviews size={32} />,
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
          <div key={obj.text} className="flex items-center gap-6 font-semibold">
            <span>{obj.Icon}</span>
            <Link
              to={obj.text}
              smooth={true}
              duration={1000}
              className="text-xl"
            >
              {obj.text}
            </Link>
            
          </div>
        ))}
      </div>
    </Box>
  );

  return (
    <div>
      <div
        className="md:hidden p-1 bg-gray-100 rounded-md"
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
