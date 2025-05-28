import UserProfileCard from "./UserProfileCard";
import UserExperienceCard from "./UserExperienceCard";
import UserPostsCard from "./UserPostsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import "../index.css";
import UserAnalytics from "./Analytics";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const location = window.location.href;
    const userId = location.slice(location.indexOf("profile/") + 8);
    console.log("Profile.tsx : "+userId);

    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        withCredentials: true,
      });

      if (response.status != 200) {
        setUserExist(false);
      } else {
        setUserExist(true);
      }
    };
    setIsLoading(false);

    fetch();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 flex justify-center">
        <span className="loading"></span>
      </div>
    );
  }

  if (!isLoading && !userExist) {
    return (
      <div>
        <p>User does not exist</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <UserAnalytics />
          </div>

          <div className="col-start-4 col-end-11">
            <div className="flex flex-col gap-12">
              <UserProfileCard />
              <UserExperienceCard />
              <UserPostsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Profile;
