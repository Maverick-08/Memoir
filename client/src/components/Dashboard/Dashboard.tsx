import { useMemo, useState } from "react";

const Dashboard = () => {
  const greeting = useMemo(() => {
    const date = new Date();
    const ist = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
    const currentHour = ist.getHours();

    if (currentHour >= 12) return "Good Afternoon,";

    return "Good Morning,";
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className="h-[20%] pt-8">
        <div className="flex flex-col gap-6">
          <p className="text-center text-5xl font-medium">Dashboard</p>
          <p className="text-center text-xl">
            {greeting} <span className="font-medium">Vivek Ojha</span>
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
        <div className="pt-8 flex justify-center cursor-pointer"><div className="w-[80%] py-2 rounded-md bg-black text-white text-center text-xl font-medium">Create post</div></div>
      </div>
    </div>
  );
};

const AllUpdates = () => {
  return <div className="">
    <p className="text-xl text-center font-medium">All Updates</p>
    <div className="mt-8 py-4 shadow border border-gray-200">
        <p className="text-gray-600 text-center">No new updates</p>
    </div>
  </div>;
};

export default Dashboard;
