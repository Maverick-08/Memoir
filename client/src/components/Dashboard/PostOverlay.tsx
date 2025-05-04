import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import ImageComponent from "./ImageComponent";
import UserTitleComponent from "./UserTitleComponent";
import { FiPlus } from "react-icons/fi";
import { IoVideocam } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import { showToast } from "../toast/CustomToast";
import "../../index.css";

const PostOverlay = ({
  isOverlayOpen,
  setIsOverlayOpen,
}: {
  isOverlayOpen: boolean;
  setIsOverlayOpen: (x: boolean) => void;
}) => {
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const postContent = JSON.parse(localStorage.getItem("postContent")!)
      ? JSON.parse(localStorage.getItem("postContent")!).text
      : "";
    setContent(postContent);
  }, [isOverlayOpen]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;

    if (inputFiles) {
      const filteredInputFiles = Array.from(inputFiles).filter((file) =>
        file.type.includes("image")
      );
      console.log(filteredInputFiles);

      if (inputFiles.length != filteredInputFiles.length) {
        showToast.warning({
          title: "Invalid File Type",
          message: "Please select only images",
        });
      }
      setSelectedFiles(filteredInputFiles);
    }
  };

  const handleFileDelete = (file: File) => {
    if (selectedFiles) {
      const filteredInputFilesList = selectedFiles.filter(
        (currFile) => currFile.name != file.name
      );

      setSelectedFiles(filteredInputFilesList);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles && !content) {
      showToast.warning({
        title: "No Content",
        message: "Please add content in your post.",
      });
      return;
    }

    setPosting(true);
    const formData = new FormData();

    // Append the text content
    formData.append("content", content);

    // Append each selected image file
    selectedFiles?.forEach((file) => {
      formData.append("images", file, file.name);
    });

    try {
      await axios.post(`${BASE_URL}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      localStorage.removeItem("postContent");
      setSelectedFiles(null);

      showToast.success({
        title: "Post Created",
        message: "Your post has been created successfully!",
      });

      setTimeout(() => {
        setIsOverlayOpen(false);
      }, 1500);
    } catch (err) {
      
      if (axios.isAxiosError(err)) {
        showToast.error({
          title: "Failed",
          message: err.response?.data.msg,
        });
      }
    }
    setPosting(false);
  };

  return (
    <div>
      <Dialog open={isOverlayOpen} onOpenChange={setIsOverlayOpen}>
        <DialogContent className="h-fit">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <ImageComponent />
              <UserTitleComponent isPost={false} />
            </div>

            {/* Post content - text area  */}
            <div className="pt-6">
              <textarea
                name="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  localStorage.setItem(
                    "postContent",
                    JSON.stringify({ text: e.target.value })
                  );
                }}
                placeholder={`Share your thoughts... \n\nDid you know ? Using Hashtags in your post content can improve it's visibility !`}
                className="w-full h-56 focus:outline-none placeholder:text-gray-500 resize-none"
              ></textarea>
            </div>

            {/* Control buttons  */}
            <div className="mt-4 sm:flex sm:justify-between">
              <div className="flex items-center justify-between sm:gap-6">
                <input
                  type="file"
                  multiple
                  name="images"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={handleImageClick}
                  className="flex items-center gap-2 text-green-500 cursor-pointer"
                >
                  <FiPlus className="h-6 w-6" />
                  <span className="text-gray-500">Add Image</span>
                  {/* <span>{files?.length}</span> */}
                </div>

                <div className="flex items-center gap-2 text-sky-500 cursor-pointer">
                  <IoVideocam className="h-6 w-6" />
                  <span className="text-gray-500">Add Video</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center">
                <button
                  disabled={!(content.length !== 0 || selectedFiles !== null)}
                  onClick={handleUpload}
                  className={`select-none px-8 py-1 text-lg rounded-md cursor-pointer ${
                    (content.length != 0 || selectedFiles != null) && !posting
                      ? "text-white"
                      : "text-gray-300"
                  } bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]`}
                >
                  Post
                </button>
              </div>
            </div>

            {/* Uploaded File names */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {selectedFiles &&
                selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    onClick={() => handleFileDelete(file)}
                    className="px-2 py-0.5 border rounded-md cursor-pointer"
                  >
                    {file.name.split(".")[0]}
                  </div>
                ))}
            </div>
            <div className="flex sm:hidden items-center justify-end">
                <button
                  disabled={!(content.length !== 0 || selectedFiles !== null)}
                  onClick={handleUpload}
                  className={`select-none px-8 py-1 text-lg rounded-md cursor-pointer ${
                    (content.length != 0 || selectedFiles != null) && !posting
                      ? "text-white"
                      : "text-gray-300"
                  } bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]`}
                >
                  Post
                </button>
              </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostOverlay;
