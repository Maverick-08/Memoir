import UserProfileCard from "./UserProfileCard";
import UserExperienceCard from "./UserExperienceCard";
import UserPostsCard from "./UserPostsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import "../index.css";
import UserAnalytics from "./Analytics";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userExist, setUserExist] = useState<boolean>(false);
  const [profileId,setProfileId] = useState<string|null>(null);

  useEffect(() => {
    const location = window.location.href;
    const userId = location.slice(location.indexOf("profile/") + 8);
    setProfileId(userId);

    const fetch = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        await axios.get(`${BASE_URL}/user/${userId}`, {
          withCredentials: true,
        });
        setUserExist(true);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    fetch();

  }, []);

  if (isLoading) {
    return (
      <div className="pt-24">
        <div className="flex justify-center">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if (!isLoading && !userExist) {
    return (
      <div className="pt-24">
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
              <UserProfileCard profileId={profileId} />
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
