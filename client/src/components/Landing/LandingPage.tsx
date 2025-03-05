import Companies from "./Companies";
import ContactUs from "./ContactUs";
import Developer from "./Developer";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Review from "./Review";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Companies />
      <Review />
      <Developer />
      <ContactUs />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
