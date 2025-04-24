import { LuSquarePen } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import MessageComponent from "./MessageComponent";


const UserMessages = () => {
  return (
    <div className="min-h-screen pt-[10vh] lg:pt-[10vh]  bg-gray-100">
      <div className="container mx-auto h-[90vh] lg:h-[90vh] px-4">
        <div className="px-4 h-full w-full xl:w-[70%] mx-auto bg-white shadow rounded-md">
          <div className="h-[20%] border-b">
            <HeaderComponent />
          </div>
          <div className="h-[80%] border-r">
            <MessageComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderComponent = () => {
  return (
    <div className="flex flex-col py-4 gap-4 lg:gap-6">
      <TitleComponent />
      <div className="w-[40%] px-2 py-1 flex items-center gap-2 rounded-md border border-gray-200 focus-within:border-gray-300">
        <CiSearch className="h-6 w-6" />
        <input
          type="text"
          placeholder="Enter Name"
          className="focus:outline-none border-transparent text-gray-400 focus:placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};

const TitleComponent = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl ">Messages</p>
      <LuSquarePen className="h-6 w-6 cursor-pointer" />
    </div>
  );
};

export default UserMessages;
