import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoAnalyticsSharp } from "react-icons/io5";

const UserAnalytics = () => {
  const [userStats, setUserStats] = useState<{
    saveCount: number;
    impressionCount: number;
    profileViewCount: number;
  } | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/user/stats`);
      setUserStats(response.data);
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <SavedArticles savedArticlesCount={userStats?.saveCount as number} />
      <Analytics
        profileViewsCount={userStats?.profileViewCount as number}
        impressionCount={userStats?.impressionCount as number}
      />
    </div>
  );
};

export default UserAnalytics;

const SavedArticles = ({
  savedArticlesCount,
}: {
  savedArticlesCount: number;
}) => {
  return (
    <div className="border-l-4 rounded-md border-sky-500 shadow bg-white">
      <div className="px-4 py-4 flex justify-between">
        <p>Saved Articles</p>
        <p className="text-sky-500">{savedArticlesCount}</p>
      </div>
    </div>
  );
};

const Analytics = ({
  profileViewsCount,
  impressionCount,
}: {
  profileViewsCount: number;
  impressionCount: number;
}) => {
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
            <p className="text-sky-500">{profileViewsCount}</p>
          </div>
          <div className="flex justify-between cursor-default">
            <p className="text-gray-500 hover:text-black">Post Impressions</p>
            <p className="text-sky-500">{impressionCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
