import { showToast } from "@/components/toast/CustomToast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useRef, useState } from "react";

const ProfileEditModal = ({
  isModalOpen,
  setIsModalOpen,
  profileId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (x: boolean) => void;
  profileId: string | null;
}) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState<File | null>(null);
  const [leetcodeLink, setLeetcodeLink] = useState<string | null>(null);
  const [codeforcesLink, setCodeforcesLink] = useState<string | null>(null);
  const [gfgLink, setGfgLink] = useState<string | null>(null);
  const [githubLink, setGithubLink] = useState<string | null>(null);
  const [linkedInLink, setLinkedInLink] = useState<string | null>(null);
  const [xHandleLink, setXHandleLink] = useState<string | null>(null);
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (profilePhoto) {
        formData.append("profileImage", profilePhoto, profilePhoto.name);
      }
      if (backgroundPhoto) {
        formData.append(
          "backgroundImage",
          backgroundPhoto,
          backgroundPhoto.name
        );
      }
      const links = {
        leetcodeLink,
        codeforcesLink,
        gfgLink,
        githubLink,
        linkedInLink,
        xHandleLink,
      };
      formData.append("links", JSON.stringify(links));

      setIsSubmitting(true);
      await axios.post(`${BASE_URL}/user/profile/${profileId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      showToast.success({
        title:"Profile Updated Successfully !"
      });

    } catch (err) {
      console.log(err);
      showToast.error({
        title:"Profile Update Failed"
      });
    }
    setIsSubmitting(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account Details</DialogTitle>
          </DialogHeader>
          <div>
            <SetProfileImages
              profilePhoto={profilePhoto}
              backgroundPhoto={backgroundPhoto}
              setProfilePhoto={setProfilePhoto}
              setBackgroundPhoto={setBackgroundPhoto}
            />
            <SocialLinks
              leetcodeLink={leetcodeLink}
              setLeetcodeLink={setLeetcodeLink}
              codeforcesLink={codeforcesLink}
              setCodeforcesLink={setCodeforcesLink}
              gfgLink={gfgLink}
              setGfgLink={setGfgLink}
              githubLink={githubLink}
              setGithubLink={setGithubLink}
              linkedInLink={linkedInLink}
              setLinkedInLink={setLinkedInLink}
              xHandleLink={xHandleLink}
              setXHandleLink={setXHandleLink}
            />
            <div className="pt-6 flex justify-center items-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-16 py-1.5 text-xl rounded-md bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] ${isSubmitting ? 'text-gray-400':'text-white'}  cursor-pointer`}
              >
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SetProfileImages = ({
  profilePhoto,
  backgroundPhoto,
  setProfilePhoto,
  setBackgroundPhoto,
}: {
  profilePhoto: File | null;
  backgroundPhoto: File | null;
  setProfilePhoto: (x: File) => void;
  setBackgroundPhoto: (x: File) => void;
}) => {
  const profilePhotoRef = useRef<HTMLInputElement | null>(null);
  const BackgroundPhotoRef = useRef<HTMLInputElement | null>(null);

  const handleProfileButtonClick = () => {
    if (profilePhotoRef.current) {
      profilePhotoRef.current.click();
    }
  };

  const handleBackgroundButtonClick = () => {
    if (BackgroundPhotoRef.current) {
      BackgroundPhotoRef.current.click();
    }
  };

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && !files[0].type.includes("image")) {
      showToast.warning({
        title: "INVALID IMAGE",
        message: "Please select png or jpeg file.",
        action: { label: "Dismiss", onClick: () => {} },
      });
    }
    if (files && files[0].type.includes("image")) {
      setProfilePhoto(files[0]);
    }
  };

  const handleBackgroundImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && !files[0].type.includes("image")) {
      showToast.warning({
        title: "INVALID IMAGE",
        message: "Please select png or jpeg file.",
        action: { label: "Dismiss", onClick: () => {} },
      });
    }
    if (files && files[0].type.includes("image")) {
      setBackgroundPhoto(files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Profile Photo */}
      <div className="flex gap-8 items-center">
        <div>
          {profilePhoto ? (
            profilePhoto.name.length > 10 ? (
              <span className="text-sm border px-2 py-1 rounded-sm border-green-500">
                {profilePhoto.name.slice(0, 8) +
                  "..." +
                  profilePhoto.type.slice(6)}
              </span>
            ) : (
              <span className="text-sm border px-2 py-1 rounded-sm border-green-500">
                {profilePhoto.name}
              </span>
            )
          ) : (
            <span className="text-sm text-gray-400 border px-2 py-1 rounded-sm">
              No file selected
            </span>
          )}
        </div>
        <span
          onClick={handleProfileButtonClick}
          className="select-none px-2 py-1 border rounded-md bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white cursor-pointer"
        >
          Select Profile Image
        </span>
      </div>
      <input
        type="file"
        onChange={handleProfileImageUpload}
        ref={profilePhotoRef}
        className="hidden"
      />

      {/* Background Photo */}
      <div className="flex gap-8 items-center">
        <div>
          {backgroundPhoto ? (
            backgroundPhoto.name.length > 10 ? (
              <span className="text-sm border px-2 py-1 rounded-sm border-green-500">
                {backgroundPhoto.name.slice(0, 8) +
                  "..." +
                  backgroundPhoto.type.slice(6)}
              </span>
            ) : (
              <span className="text-sm border px-2 py-1 rounded-sm border-green-500">
                {backgroundPhoto.name}
              </span>
            )
          ) : (
            <span className="text-sm text-gray-400 border px-2 py-1 rounded-sm">
              No file selected
            </span>
          )}
        </div>
        <div
          onClick={handleBackgroundButtonClick}
          className="shrink-0 select-none px-2 py-1 border rounded-md bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white cursor-pointer"
        >
          Select Background Image
        </div>
      </div>

      <input
        type="file"
        onChange={handleBackgroundImageUpload}
        ref={BackgroundPhotoRef}
        className="hidden"
      />
    </div>
  );
};

const SocialLinks = ({
  leetcodeLink,
  codeforcesLink,
  gfgLink,
  githubLink,
  linkedInLink,
  xHandleLink,
  setLeetcodeLink,
  setCodeforcesLink,
  setGfgLink,
  setGithubLink,
  setLinkedInLink,
  setXHandleLink,
}: {
  leetcodeLink: string | null;
  codeforcesLink: string | null;
  gfgLink: string | null;
  githubLink: string | null;
  linkedInLink: string | null;
  xHandleLink: string | null;
  setLeetcodeLink: (x: string) => void;
  setCodeforcesLink: (x: string) => void;
  setGfgLink: (x: string) => void;
  setGithubLink: (x: string) => void;
  setLinkedInLink: (x: string) => void;
  setXHandleLink: (x: string) => void;
}) => {
  return (
    <div className="pt-6 flex flex-col gap-4">
      <div className="flex gap-4">
        <div>
          <p>Leetcode Profile Link</p>
          <input
            type="text"
            className="mt-2 focus:outline-none w-full px-4 py-1 focus:border-sky-400 border rounded-md"
            value={leetcodeLink ? leetcodeLink : ""}
            onChange={(e) => setLeetcodeLink(e.target.value)}
          />
        </div>
        <div>
          <p>Codeforces Profile Link</p>
          <input
            type="text"
            className="mt-2 focus:outline-none w-full px-4 py-1 focus:border-sky-400 border rounded-md"
            value={codeforcesLink ? codeforcesLink : ""}
            onChange={(e) => setCodeforcesLink(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <p>GFG Profile Link</p>
          <input
            type="text"
            className="mt-2 focus:outline-none w-full px-4 py-1 focus:border-sky-400 border rounded-md"
            value={gfgLink ? gfgLink : ""}
            onChange={(e) => setGfgLink(e.target.value)}
          />
        </div>
        <div>
          <p>Github Profile Link</p>
          <input
            type="text"
            className="mt-2 focus:outline-none w-full px-4 py-1 focus:border-sky-400 border rounded-md"
            value={githubLink ? githubLink : ""}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <p>X Handle Link</p>
          <input
            type="text"
            className="mt-2 focus:outline-none w-full px-4 py-1 focus:border-sky-400 border rounded-md"
            value={xHandleLink ? xHandleLink : ""}
            onChange={(e) => setXHandleLink(e.target.value)}
          />
        </div>
        <div>
          <p>LinkedIn Profile Link</p>
          <input
            type="text"
            className="mt-2 focus:outline-none w-full px-4 py-1 focus:border-sky-400 border rounded-md"
            value={linkedInLink ? linkedInLink : ""}
            onChange={(e) => setLinkedInLink(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
