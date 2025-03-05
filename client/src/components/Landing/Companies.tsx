import "../../index.css";
import Accolite from "../../assets/Accolite.png";
import Adobe from "../../assets/Adobe.webp";
import Fico from "../../assets/Fico.png";
import IBM from "../../assets/IBM.webp";
import Infosys from "../../assets/Infosys.png";
import Jp from "../../assets/JP.jpg";
import Kanerika from "../../assets/kanerika.jpg";
import Kratikal from "../../assets/kratikal.webp";
import Microsoft from "../../assets/Microsoft.png";
import Msci from "../../assets/Msci.png";
import NucleusTeq from "../../assets/NucleusTeq.png";
import Quantiphi from "../../assets/Quantiphi.png";
import Trianz from "../../assets/Trianz.png";
import Amazon from "../../assets/Amazon.png";

const Companies = () => {
  return (
    <div id="Companies" className="py-20">
      <p className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text mb-16">
        Our Alumni Work At
      </p>
      <section className="mt-4 p-4 overflow-x-hidden">
        <div className="flex gap-16 sm:gap-24 slider-animation-smallScreen slider-pause-smallScreen slider-animation-largeScreen slider-pause-largeScreen">
          <img
            src={Accolite}
            alt="Accolite"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Adobe}
            alt="Adobe"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Fico}
            alt="Fico"
            className="shrink-0 h-20 w-56 rounded-xl"
          />
          <img
            src={Infosys}
            alt="Infosys"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img src={Jp} alt="Jp" className="shrink-0 h-20 w-48 sm:h-24 sm:w-56" />
          <img
            src={Kanerika}
            alt="Kanerika"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Kratikal}
            alt="Kratikal"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Microsoft}
            alt="Microsoft"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Msci}
            alt="Msci"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Amazon}
            alt="Amazon"
            className="shrink-0 h-20 w-56 rounded-xl"
          />
          <img src={IBM} alt="IBM" className="shrink-0 h-20 w-48 sm:h-24 sm:w-56" />
          <img
            src={NucleusTeq}
            alt="NucleusTeq"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Quantiphi}
            alt="Quantiphi"
            className="shrink-0 h-20 w-48 sm:h-24 sm:w-56"
          />
          <img
            src={Trianz}
            alt="Trianz"
            className="shrink-0 h-24 w-64 rounded-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default Companies;
