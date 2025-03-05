import { FaLinkedin } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import Developer1 from "../../assets/Vivek.jpg";

const Developer = () => {
  return (
    <div id="Developers" className="mt-16 ">
      <p className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text mb-16">
        Developers
      </p>
      <div  className="flex justify-center">
        <div className="border border-gray-200 shadow-xl w-72 p-4 rounded-xl flex flex-col items-center">
          <img
            src={Developer1}
            alt="Developer-Vivek"
            className="rounded-full h-28 w-28"
          />
          <p className="text-xl font-medium mt-4">Vivek Ojha</p>
          <p className="text-gray-500">Full Stack Developer</p>{" "}
          <div className="mt-6 flex gap-8">
            <a
              href={"https://www.linkedin.com/in/nitb-vivek-ojha"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} className="cursor-pointer" />
            </a>
            <a
              href={"https://github.com/Maverick-08"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <VscGithubInverted size={24} className="cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
