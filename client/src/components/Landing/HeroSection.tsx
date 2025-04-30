import Lottie from "lottie-react";
import Confetti from "../../assets/Animation - 1740826000488.json";
import { FaAnglesDown } from "react-icons/fa6";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")!) ? JSON.parse(localStorage.getItem("isLoggedIn")!).status as boolean : null;

  return (
    <div
      id="Home"
      className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] flex flex-col justify-center items-center "
    >
      <div className="absolute top-8 md:top-[25%] w-full -z-10 p-4 ">
        <Lottie
          className="h-96"
          animationData={Confetti}
          loop={true}
          autoplay={true}
        />
      </div>

      <div className="z-10 flex flex-col items-center">
        <p className="text-4xl text-wrap md:text-6xl font-bold text-center text-transparent bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text">
          Elevate Your Interview Preparation with Memoir !
        </p>
        <p className="text-center text-3xl md:text-2xl mt-8 text-gray-600">
          Interview Questions & Guidance from Seniors
        </p>
        <button
          onClick={() => {
            if (!isUserLoggedIn) {
              navigate("/auth");
            } else {
              navigate("/dashboard");
            }
          }}
          className="text-lg sm:text-md mt-16 cursor-pointer bg-[#272E3F] text-white px-8 py-2 sm:px-6 sm:py-2 rounded-md"
        >
          {isUserLoggedIn ? "Check Dashboard" : "Login Now"}
        </button>
      </div>

      <div className="absolute bottom-8 cursor-pointer animate-bounce">
        <Link to="Companies" smooth={true} duration={1000}>
          <FaAnglesDown size={24} />
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
