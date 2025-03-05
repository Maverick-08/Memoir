import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const FooterSection = () => {
  return (
    <div className="mt-24 px-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-medium">Memoir</span>
          <span className="ml-4 text-xl font-medium">Organization</span>
        </div>
        <div className="flex gap-8">
          <a
            href="https://www.linkedin.com/company/manit-mca/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} className="cursor-pointer" />
          </a>
          <BsTwitterX size={24} className="cursor-pointer" />
        </div>
      </div>
      <div className="text-slate-500 text-sm mt-4 flex flex-col items-center text-center gap-2">
        <span>Privacy Policy</span>
        <span>&copy;{new Date().getFullYear()}. All rights reserved.</span>
      </div>
    </div>
  );
};

export default FooterSection;
