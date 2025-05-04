import { FaRegImage } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { useState } from "react";
import PostOverlay from "./PostOverlay";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";
import ImageComponent from "./ImageComponent";

const CreatePost = () => {
  const [isPostOverlayOpen, setIsPostOverlayOpen] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom);

  return (
    <div>
      <div className="shadow bg-white py-4 px-2 rounded-md border border-gray-100">
        <div className="flex items-center gap-2 sm:gap-6">
          <ImageComponent />

          <input
            type="text"
            name="post"
            onClick={() => setIsPostOverlayOpen(true)}
            placeholder="Write a post"
            className="flex-1 pl-4 sm:pl-4 py-2 focus:outline-none border focus:border-sky-400 bg-transparent rounded-2xl border-gray-200 text-lg"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-16 sm:gap-24 ">
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
      <PostOverlay
        isOverlayOpen={isPostOverlayOpen}
        setIsOverlayOpen={setIsPostOverlayOpen}
      />
    </div>
  );
};

export default CreatePost;
