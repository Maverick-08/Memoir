// import { useMemo } from "react";
// // import { useSnackbar, VariantType } from "notistack";
// import { useRecoilValue } from "recoil";
// import { userDetailsAtom } from "../../../store/atoms";

import CreatePost from "./CreatePost";
import DashboardProfileCard from "./DashboardProfileCard";
import Feed from "./Feed";
import PostIndicators from "./PostIndicators";
import TrendingCard from "./TrendingCard";

const Dashboard = () => {
  // const userDetails = useRecoilValue(userDetailsAtom);
  // const greeting = useMemo(() => {
  //   const date = new Date();
  //   const utcHour = date.getUTCHours(); // Get the hour in UTC
  //   const utcMinute = date.getUTCMinutes(); // Get the minute in UTC

  //   // Add 5 hours and 30 minutes for IST
  //   const currentHour = (utcHour + 5 + Math.floor((utcMinute + 30) / 60)) % 24;

  //   if (currentHour < 12) return "Good Morning,";
  //   else if (currentHour >= 12 && currentHour < 17) return "Good Afternoon,";
  //   else if (currentHour >= 17 && currentHour < 22) return "Good Evening,";
  //   return "It's a bit late don't you think ?";
  // }, []);

  return (
    <div className="min-h-screen pt-16 lg:pt-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">

          {/* ->  Left Side bar */}
          <div className="grid grid-cols-1 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-8 sm:gap-4 md:gap-6 lg:gap-8">

            <div className="sm:col-span-3 md:col-span-4 lg:col-span-3 flex flex-col gap-6 sm:gap-4 md:gap-6 lg:gap-8">
              <DashboardProfileCard />
              <PostIndicators />
              <div className="visible lg:hidden">
                <TrendingCard />
              </div>
            </div>
            
             {/* ->  Central Component */}
            <div className="sm:col-span-5 md:col-span-6 lg:col-span-6">
              <CreatePost />
              <Feed />
            </div>

              {/* ->  Right Side bar */}
            <div className="hidden lg:flex lg:col-span-3 ">
              <TrendingCard />
            </div>
          </div>
      </div>
    </div>
  );
};


export default Dashboard;
