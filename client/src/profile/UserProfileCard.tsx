import BgImage from "../assets/profile-background.png";
import ProfilePhoto from "../assets/Vivek.jpg";
import { MdModeEdit } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { SiGeeksforgeeks } from "react-icons/si";

const UserProfileCard = () => {
  return (
    <div className="relative rounded-xl bg-white h-96">
      {/* Bcakground Image  */}
      <div className="h-[50%] ">
        <img
          src={BgImage}
          alt="Background Image"
          className="h-full w-full object-cover rounded-t-xl"
        />
      </div>

      {/* Profile Photo  */}
      <div className="absolute z-10 top-[30%] left-[5%]  rounded-full bg-white p-1">
        <img
          src={ProfilePhoto}
          alt="Profile Photo"
          className="w-36 h-36 rounded-full object-cover"
        />
      </div>

      {/* Profile Content  */}
      <div className="h-[50%]">
        <div className="flex flex-col h-full">
          {/* Top Box  */}
          <div className="px-8 py-4 flex justify-end ">
            <span className="bg-black text-white p-2 rounded-full cursor-pointer">
              <MdModeEdit className="h-6 w-6" />
            </span>
          </div>

          {/* Bottom Content Box  */}
          <div className="">
            <div className="flex">
              {/* Left Box - Profile Info  */}
              <div className="w-full pl-8 pt-4">
                <div className="flex items-center gap-2">
                  <p className="text-3xl">Vivek Ojha</p>
                  <p className="text-lg">(MCA-26)</p>
                </div>
                <p className="mt-2 text-gray-400">Student</p>
              </div>

              {/* Right Box - Other platform profiles  */}
              <div className="w-full flex flex-col pt-4">
                <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                    
                    {/* Codeforces  */}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>
                      <SiCodeforces className="h-6 w-6" />
                    </span>
                    <span className="">Codeforces</span>
                  </div>

                  {/* Leetcode  */}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>
                      <SiLeetcode className="h-6 w-6" />
                    </span>
                    <span className="text-sm">Leetcode</span>
                  </div>

                    {/* GFG  */}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>
                      <SiGeeksforgeeks className="h-6 w-6" />
                    </span>
                    <span className="text-sm">GFG</span>
                  </div>
                    
                    {/* Github  */}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>
                      <IoLogoGithub className="h-6 w-6" />
                    </span>
                    <span className="">Github</span>
                  </div>

                  {/* LinkedIn  */}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>
                      <IoLogoLinkedin className="h-6 w-6" />
                    </span>
                    <span className="">LinkedIn</span>
                  </div>

                  {/* X handle  */}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>
                      <FaXTwitter className="h-6 w-6" />
                    </span>
                    <span className="">Handle</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
