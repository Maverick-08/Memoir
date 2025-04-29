import { useState } from "react";
// import { MdArrowBackIos } from "react-icons/md";
// import { MdArrowRightAlt } from "react-icons/md";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { userDetailsAtom } from "../../../store/atoms";
// import { VariantType, useSnackbar } from "notistack";
// import axios from "axios";
// import { BASE_URL } from "../../config";
import TitleComponent from "./TitleComponent";
import UserRegistration from "./UserRegistration";
import OTPComponent from "./OTPComponent";
import PasswordComponent from "./PasswordComponent";

const Register = () => {
  const [componentActive, setComponentActive] = useState<
    "Register" | "OTP Sent" | "OTP Verified"
  >("Register");
  return (
    <div className="w-screen h-screen flex">
      {/* Left Side bar  */}
      <div className="hidden md:block w-[50%] h-full bg-blue-600">
        <TitleComponent />
      </div>

      {/* Right Side bar  */}
      <div className="w-full md:w-[50%] h-full bg-gray-100">
        <div className="px-2 md:px-4 h-full flex justify-center items-center">
          <div className="px-4 md:px-4 lg:px-8 py-4 shadow bg-white rounded-md">
            {componentActive == "Register" ? (
              <UserRegistration setComponentActive={setComponentActive} />
            ) : componentActive == "OTP Sent" ? (
              <OTPComponent setComponentActive={setComponentActive} />
            ) : (
              <PasswordComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
