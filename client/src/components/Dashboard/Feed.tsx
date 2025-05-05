import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import ImageComponent from "./ImageComponent";
import UserTitleComponent from "./UserTitleComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, Feed as UserFeed } from "@/config";
import "../../index.css";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";
import { showToast } from "../toast/CustomToast";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState<UserFeed[] | null>(null);
  const userDetails = useRecoilValue(userDetailsAtom);

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      const allFeeds = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      setFeeds(allFeeds.data.data);
      setLoading(false);
    };

    fetch();
  }, [userDetails?.userId]);

  if (loading) {
    return (
      <div className="pt-8 flex justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div>
      <SortFeedComponent />
      <div className="pb-8 flex flex-col gap-8">
        {feeds &&
          feeds.map((feed,index) => {
            return (
              <div key={index} className="shadow bg-white py-4 rounded-md border border-gray-100">
                {/*  ->  Posts top image and text component  */}
                <div className="flex items-center gap-4 px-4">
                  <ImageComponent
                    firstName={feed.firstName}
                    lastName={feed.lastName}
                  />
                  <UserTitleComponent
                    firstName={feed.firstName}
                    lastName={feed.lastName}
                    branch={feed.branch}
                    yearOfPassingOut={feed.yearOfPassingOut}
                    createdAt={feed.createdAt}
                  />
                </div>

                {/* Post Content & Post Tags  */}
                <div className="pt-8 pl-8">
                  <p>{feed.content}</p>
                  <div className="pt-4 flex gap-2">
                    {feed.tag.length > 0 &&
                      feed.tag.map((tag,index) => {
                        return (
                          <span key={index} className="text-sky-600">#{tag.tagName}</span>
                        );
                      })}
                  </div>
                </div>

                {/* Post Image  */}
                <div className="px-4 pt-4">
                  {feed.postResource.length > 0 ? (
                    <img
                      src={feed.postResource[0].imageUrl}
                      className="rounded-md"
                    ></img>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Post Buttons  */}
                <div className="flex justify-around border-t pt-4">
                  <div
                    onClick={async () => {
                      if (feed.didUserLiked) {
                        await axios.get(
                          `${BASE_URL}/post/impression?type=Decrement&impressionType=React&postId=${feed.id}`,
                          { withCredentials: true }
                        );
                        feeds.map((currFeed) => {
                          if (currFeed.id == feed.id) {
                            currFeed.didUserLiked = false;
                          }
                        });
                        const newFeeds = structuredClone(feeds);
                        setFeeds(newFeeds);
                      } else {
                        await axios.get(
                          `${BASE_URL}/post/impression/?type=Increment&impressionType=React&postId=${feed.id}`,
                          { withCredentials: true }
                        );
                        feeds.map((currFeed) => {
                          if (currFeed.id == feed.id) {
                            currFeed.didUserLiked = true;
                          }
                        });
                        const newFeeds = structuredClone(feeds);
                        setFeeds(newFeeds);
                      }
                    }}
                    className={`flex items-center gap-2 cursor-pointer ${
                      feed.didUserLiked ? "text-pink-500" : "text-gray-400"
                    }`}
                  >
                    <FaHeart
                      className={`h-4 w-4 sm:h-6 sm:w-6 `}
                    />
                    <span className="text-sm sm:text-lg">React</span>
                  </div>

                  <div
                    onClick={async () => {
                      if (feed.didUserSaved) {
                        await axios.get(
                          `${BASE_URL}/post/impression/?type=Decrement&impressionType=Save&postId=${feed.id}`,
                          { withCredentials: true }
                        );
                        feeds.map((currFeed) => {
                          if (currFeed.id == feed.id) {
                            currFeed.didUserSaved = false;
                          }
                        });
                        const newFeeds = structuredClone(feeds);
                        setFeeds(newFeeds);
                      } else {
                        await axios.get(
                          `${BASE_URL}/post/impression/?type=Increment&impressionType=Save&postId=${feed.id}`,
                          { withCredentials: true }
                        );
                        feeds.map((currFeed) => {
                          if (currFeed.id == feed.id) {
                            currFeed.didUserSaved = true;
                          }
                        });
                        const newFeeds = structuredClone(feeds);
                        setFeeds(newFeeds);
                      }
                    }}
                    className={`flex items-center gap-2 cursor-pointer  ${
                        feed.didUserSaved ? "text-sky-500" : "text-gray-400"
                      }`}
                  >
                    <FaBookmark
                      className={`h-4 w-4 sm:h-6 sm:w-6`}
                    />{" "}
                    <span className="text-sm sm:text-lg">Save</span>
                  </div>

                  <div
                    onClick={async (e) => {
                      const currDiv = e.currentTarget;
                      
                      if(currDiv.classList.contains("text-gray-400")){
                        currDiv.classList.remove("text-gray-400");
                        currDiv.classList.add("text-red-500")
                        showToast.info({
                          title: "Reported",
                          message: "The post has been flagged for inspection.",
                        });
                      await axios.get(
                        `${BASE_URL}/post/impression/?type=Increment&impressionType=Report&postId=${feed.id}`,
                        { withCredentials: true }
                      );

                    }else{
                      currDiv.classList.remove("text-red-500")
                      currDiv.classList.add("text-gray-400");
                      await axios.get(
                        `${BASE_URL}/post/impression/?type=Decrement&impressionType=Report&postId=${feed.id}`,
                        { withCredentials: true }
                      );
                    }
                      
                      feeds.map(currFeed => {
                        if(currFeed.id == feed.id){
                          currFeed.didUserLiked = false;
                          currFeed.didUserSaved = false;
                        }
                      })

                      setFeeds(structuredClone(feeds));

                      
                    }}
                    className="flex items-center gap-2 cursor-pointer text-gray-400"
                  >
                    <FaFlag className={`h-4 w-4 sm:h-6 sm:w-6`} />{" "}
                    <span className="text-sm sm:text-lg">Report</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const SortFeedComponent = () => {
  return (
    <div className="mt-8 mb-2">
      <div className="flex items-center gap-4 px-4">
        <div className="basis-full border-1 border-black"></div>
        <div className="flex gap-1 items-center text-lg cursor-pointer">
          Sort{" "}
          <span>
            <IoMdArrowDropdown className="h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Feed;
