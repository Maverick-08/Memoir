import Companies from "./Companies";
import Developer from "./Developer";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Review from "./Review";

const LandingPage = () => {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <Companies />
      <Review />
      <Developer />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
