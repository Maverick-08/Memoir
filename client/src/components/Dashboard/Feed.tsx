import profilePhoto from "../../assets/Vivek.jpg";
import post from "../../assets/post.png";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import ImageComponent from "./ImageComponent";
import UserTitleComponent from "./UserTitleComponent";

const Feed = () => {
  return (
    <div>
        <SortFeedComponent />
      <div className="shadow bg-white py-4 rounded-md border border-gray-100">

        {/*  ->  Posts top image and text component  */}
        <div className="flex items-center gap-4 px-6">
          <ImageComponent />
          <UserTitleComponent isPost={true}/>
        </div>

        {/*  ->  Post description  */}
        <div className="mt-4 px-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam beatae
          aut veritatis ut unde perferendis sunt officiis neque corporis a eos
          odio debitis cupiditate dolorum officia ad labore facilis quo corrupti
          qui, ipsum aliquam provident? Impedit accusantium ipsa, consequatur,
          modi eum ex amet numquam odio eaque voluptatum provident veniam hic
          corporis quidem perferendis nisi sit? Placeat facere quas sed
          assumenda.
        </div>

        {/*  ->  Post Image  */}
        <img src={post} className=""></img>

        {/*  ->  Post Reaction */}
        <div className="flex justify-around border-t pt-4">
          <div
            onClick={(e) => {
              const icon = e.currentTarget.querySelector("svg");
              icon?.classList.toggle("text-pink-500");
              icon?.classList.toggle("text-gray-400");
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaHeart className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" />
            <span className="text-sm sm:text-lg">React</span>
          </div>

          <div
            onClick={(e) => {
              const icon = e.currentTarget.querySelector("svg");
              icon?.classList.toggle("text-sky-500");
              icon?.classList.toggle("text-gray-400");
            }}
            className="flex items-center gap-2"
          >
            <FaBookmark className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" /> <span className="text-sm sm:text-lg">Save</span>
          </div>

          <div
            onClick={(e) => {
              const icon = e.currentTarget.querySelector("svg");
              icon?.classList.toggle("text-red-500");
              icon?.classList.toggle("text-gray-400");
            }}
            className="flex items-center gap-2"
          >
            <FaFlag className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" /> <span className="text-sm sm:text-lg">Report</span>
          </div>
        </div>
      </div>

      <div className="mt-8 shadow bg-white py-4 rounded-md border border-gray-100">

        {/*  ->  Posts top image and text component  */}
        <div className="flex items-center gap-4 px-6">
          <img
            src={profilePhoto}
            alt="Profile Photo"
            className="shrink-0 rounded-full h-16 w-16 bg-sky-200"
          ></img>
          <div className="flex flex-col">
            <p className="font-semibold">
              Vivek Ojha <span className="text-sm">(MCA-2026)</span>
            </p>
            <p className="text-sm text-gray-600">Student</p>
            <p className="text-xs text-gray-400">12h</p>
          </div>
        </div>

        {/*  ->  Post description  */}
        <div className="mt-4 px-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam beatae
          aut veritatis ut unde perferendis sunt officiis neque corporis a eos
          odio debitis cupiditate dolorum officia ad labore facilis quo corrupti
          qui, ipsum aliquam provident? Impedit accusantium ipsa, consequatur,
          modi eum ex amet numquam odio eaque voluptatum provident veniam hic
          corporis quidem perferendis nisi sit? Placeat facere quas sed
          assumenda.
        </div>

        {/*  ->  Post Image  */}
        <img src={post} className=""></img>

        {/*  ->  Post Reaction */}
        <div className="flex justify-around border-t pt-4">
          <div
            onClick={(e) => {
              const icon = e.currentTarget.querySelector("svg");
              icon?.classList.toggle("text-pink-500");
              icon?.classList.toggle("text-gray-400");
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaHeart className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" />
            <span className="text-sm sm:text-lg">React</span>
          </div>

          <div
            onClick={(e) => {
              const icon = e.currentTarget.querySelector("svg");
              icon?.classList.toggle("text-sky-500");
              icon?.classList.toggle("text-gray-400");
            }}
            className="flex items-center gap-2"
          >
            <FaBookmark className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" /> <span className="text-sm sm:text-lg">Save</span>
          </div>

          <div
            onClick={(e) => {
              const icon = e.currentTarget.querySelector("svg");
              icon?.classList.toggle("text-red-500");
              icon?.classList.toggle("text-gray-400");
            }}
            className="flex items-center gap-2"
          >
            <FaFlag className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" /> <span className="text-sm sm:text-lg">Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SortFeedComponent = () => {
    return(
        <div className="mt-8 mb-2">
            <div className="flex items-center gap-4 px-4">
                <div className="basis-full border-1 border-black"></div>
                <div className="flex gap-1 items-center text-lg cursor-pointer">Sort <span><IoMdArrowDropdown className="h-6 w-6"/></span></div>
            </div>
        </div>
    )
}

export default Feed;
