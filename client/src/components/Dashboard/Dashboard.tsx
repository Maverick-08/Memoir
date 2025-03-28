import { useMemo, useState } from "react";
import { useSnackbar, VariantType } from "notistack";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";

const Dashboard = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const greeting = useMemo(() => {
    const date = new Date();
    const utcHour = date.getUTCHours(); // Get the hour in UTC
    const utcMinute = date.getUTCMinutes(); // Get the minute in UTC

    // Add 5 hours and 30 minutes for IST
    const currentHour = (utcHour + 5 + Math.floor((utcMinute + 30) / 60)) % 24;

    if (currentHour < 12) return "Good Morning,";
    else if (currentHour >= 12 && currentHour < 17) return "Good Afternoon,";
    else if (currentHour >= 17 && currentHour < 22) return "Good Evening,";
    return "It's a bit late don't you think ?";
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className="h-[20%] pt-8">
        <div className="flex flex-col gap-6">
          <p className="text-center text-5xl font-medium">Dashboard</p>
          <p className="text-center text-xl">
            {greeting} <span className="font-medium">{userDetails?.name}</span>
          </p>
        </div>
      </div>
      <div className="h-[80%] flex justify-center">
        <div className="w-[40%] flex flex-col gap-4">
          <CreateUpdate />
          <AllUpdates />
        </div>
      </div>
    </div>
  );
};

const CreateUpdate = () => {
  const [postUpdate, setPostUpdate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleVariant = (variant: VariantType, msg: string) => () => {
    enqueueSnackbar(msg, { variant });
  };

  return (
    <div className="shadow-lg border border-gray-200 px-4 py-6">
      <div className="px-4">
        <p className="text-lg font-medium">Post an Update</p>
        <textarea
          name="postUpdate"
          value={postUpdate}
          className="ml-4 mt-4 pt-2 px-4 border border-gray-200 bg-[#F3F3F3] rounded-md  w-full h-[8vh] resize-none focus:outline-none focus:border-gray-400"
          placeholder="what's on your mind ?"
          onChange={(e) => setPostUpdate(e.target.value)}
        ></textarea>
        <div className="pt-8 flex justify-center cursor-pointer">
          <div
            onClick={() =>
              handleVariant(
                "info",
                "Section under review, kindly explore other features !"
              )()
            }
            className="w-[80%] py-2 rounded-md bg-black text-white text-center text-xl font-medium"
          >
            Create post
          </div>
        </div>
      </div>
    </div>
  );
};

const AllUpdates = () => {
  return (
    <div className="">
      <p className="text-xl text-center font-medium">All Updates</p>
      <div className="mt-8 py-4 shadow border border-gray-200">
        <p className="text-gray-600 text-center">No new updates</p>
      </div>
    </div>
  );
};

export default Dashboard;
