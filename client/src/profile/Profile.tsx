import { IoAnalyticsSharp } from "react-icons/io5";
import UserProfileCard from "./UserProfileCard";
import UserExperienceCard from "./UserExperienceCard";

const Profile = () => {
  return (
    <div className="min-h-screen pt-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <div className="flex flex-col gap-16">
              <SavedArticles />
              <Events />
            </div>
          </div>

          <div className="col-start-4 col-end-11">
            <div className="flex flex-col gap-12">
              <UserProfileCard />
              <UserExperienceCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SavedArticles = () => {
  return (
    <div className="border-l-4 rounded-md border-sky-500 shadow bg-white">
      <div className="px-4 py-4 flex justify-between">
        <p>Saved Articles</p>
        <p className="text-sky-500">10</p>
      </div>
    </div>
  );
};

const Events = () => {
  return (
    <div className="border-t-4 rounded-md border-teal-500 shadow bg-white">
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <IoAnalyticsSharp className="h-6 w-6" />
          <p className="text-lg">Analytics</p>
        </div>
        <div className="mt-4 flex flex-col gap-2 select-none">
          <div className="flex justify-between cursor-default">
            <p className="text-gray-500 hover:text-black">Profile Views</p>
            <p className="text-sky-500">54</p>
          </div>
          <div className="flex justify-between cursor-default">
            <p className="text-gray-500 hover:text-black">Post Impressions</p>
            <p className="text-sky-500">440</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
