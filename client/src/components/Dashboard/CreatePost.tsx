import { FaRegImage } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import profilePhoto from "../../assets/Vivek.jpg";

const CreatePost = () => {
  return (
    <div>
      <div className="shadow bg-white py-4 px-2 rounded-md border border-gray-100">
        <div className="flex items-center gap-2 sm:gap-6">
          <img
            src={profilePhoto}
            alt="Profile Photo"
            className="shrink-0 rounded-full h-12 w-12 sm:h-16 sm:w-16"
          ></img>
          <input
            type="text"
            placeholder="Write a post"
            className="basis-full pl-4 py-2 focus:outline-none border focus:border-sky-400 bg-transparent rounded-2xl border-gray-200 text-lg"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-24 ">
          <div className="flex items-center gap-2 cursor-pointer">
            <FaRegImage className="h-6 w-6 sm:h-8 sm:w-8 text-sky-400" />{" "}
            <span className="text-gray-500 font-semibold">Photo</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <IoLogoYoutube className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />{" "}
            <span className="text-gray-500 font-semibold">Video</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
