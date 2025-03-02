import Lottie from "lottie-react";
import Confetti from "../../assets/Animation - 1740826000488.json";

const HeroSection = () => {
  return (
    <div
      id="Hero"
      className="relative h-[70vh] sm:h-[80vh] lg:h-[70vh] flex justify-center items-center"
    >
      <div className="absolute w-full -z-10 p-4">
        <Lottie
          className="h-96"
          animationData={Confetti}
          loop={true}
          autoplay={true}
        />
      </div>

      <div className="z-10 flex flex-col items-center">
        <p className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text">Elevate Your Interview Preparation with Memoir !</p>
        <p className="text-center text-2xl mt-8 text-gray-600">Interview Questions & Guidance from Seniors</p>
        <button className="text-md mt-16 cursor-pointer bg-[#272E3F] text-white px-6 py-2 rounded-md animate-bounce">Login Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
