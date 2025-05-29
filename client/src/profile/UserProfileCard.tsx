import { MdModeEdit } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { SiGeeksforgeeks } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import ProfileEditModal from "./ProfileEditModal";
// import { showToast } from "@/components/toast/CustomToast";

interface User {
  firstName: string;
  lastName: string;
  course: string;
  branch: string;
  yearOfPassingOut: string;
  linkedIn: string;
  leetcode: string;
  github: string;
  gfg: string;
  xHandle: string;
  codeforces: string;
  profileUrl: string;
  backgroundImageUrl: string;
  showEditOption: boolean;
}

const UserProfileCard = ({profileId}:{profileId:string|null}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);

  useEffect(() => {

    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/user/profile/${profileId}`, {
        withCredentials: true,
      });

      setUserDetails(response.data);
    };

    fetch();
  }, [profileId]);

  return (
    <div className="relative rounded-xl bg-white h-96">
      {/* Bcakground Image  */}
      <div className="h-[50%] ">
        {userDetails?.backgroundImageUrl ? (
          <img
            src={userDetails?.backgroundImageUrl}
            alt="Background Image"
            className="h-full w-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="h-full w-full rounded-t-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]"></div>
        )}
      </div>

      {/* Profile Photo  */}
      <div className="absolute z-10 top-[30%] left-[5%]  rounded-full bg-white p-1">
        {userDetails?.profileUrl ? (
          <img
            src={userDetails.profileUrl}
            alt="Profile Photo"
            className="w-36 h-36 rounded-full object-cover"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-gray-400 flex justify-center items-center">
            {userDetails?.firstName.slice(0, 1) +
              " " +
              userDetails?.lastName.slice(0, 1)}
          </div>
        )}
      </div>

      {/* Profile Content  */}
      <div className="h-[50%]">
        <div className="flex flex-col h-full">
          {/* Top Box  */}
          <div className="px-8 py-4 flex justify-end ">
            <span onClick={()=>setIsEditModalOpen(prev=>!prev)} className="bg-black text-white p-2 rounded-full cursor-pointer">
              <MdModeEdit className="h-6 w-6" />
            </span>
          </div>

          {/* Bottom Content Box  */}
          <div className="">
            <div className="flex">
              {/* Left Box - Profile Info  */}
              <div className="w-full pl-8 pt-4">
                <div className="flex items-center gap-2">
                  <p className="text-3xl">
                    {userDetails?.firstName + " " + userDetails?.lastName}
                  </p>
                  <p className="text-lg">
                    ({userDetails?.branch + "-" + userDetails?.yearOfPassingOut}
                    )
                  </p>
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
                {isEditModalOpen && <ProfileEditModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} profileId={profileId}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
