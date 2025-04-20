// import { useMemo } from "react";
// // import { useSnackbar, VariantType } from "notistack";
// import { useRecoilValue } from "recoil";
// import { userDetailsAtom } from "../../../store/atoms";

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
    <div className="min-h-screen pt-24">
      <div className="container mx-auto border px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 h-44 w-full bg-red-400"></div>
            <div className="col-span-6  h-44 w-full bg-sky-500"></div>
            <div className="col-span-3  h-44 w-full bg-red-400"></div>
          </div>
      </div>
    </div>
  );
};


export default Dashboard;
