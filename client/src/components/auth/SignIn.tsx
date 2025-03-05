import { MdArrowBackIos } from "react-icons/md";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VariantType, useSnackbar } from 'notistack';
// import { useState } from "react";


const SignIn = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType,msg:string) => () => {
    console.log("click")
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  return (
    <div>
      <div className="flex">
        <div className="hidden sm:flex relative w-full h-screen bg-blue-600  flex-col items-center justify-center gap-4">
          <span
            className="absolute top-4 left-8 cursor-pointer text-white"
            onClick={() => navigate("/")}
          >
            <MdArrowBackIos size={24} />
          </span>
          <p className="text-6xl text-white font-medium">
            Welcome to our platform
          </p>
          <p className="text-xl text-white">
            Share and Explore the Interview Experiences of Others.
          </p>
        </div>
        <div className="w-full h-screen flex justify-center items-center relative">
        <span
            className="absolute sm:hidden top-8 left-8 cursor-pointer text-black"
            onClick={() => navigate("/register")}
          >
            <MdArrowBackIos size={24} />
          </span>
          <div className="border-gray-200 w-[90%] sm:w-fit shadow-lg">
            <div className="py-8">
              <p className="text-2xl font-medium text-center">Login to your Account</p>
            </div>
            <div className="px-8 mt-4 mb-4">
              <p className="text-lg sm:font-medium">College Mail Id</p>
              <input
                type="email"
                placeholder="PG26@stu.manit.ac.in"
                className="ml-4 sm:ml-8 mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-96 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
              />
            </div>
            <div className="px-8 mt-4 mb-4">
              <p className="text-lg sm:font-medium">Password</p>
              <input
                type="password"
                placeholder="**********"
                className="ml-4 sm:ml-8 mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-96 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
              />
            </div>
            <div className="flex justify-end w-[80%] sm:w-[95%] text-sm cursor-pointer">
              <span>Forgot Password ?</span>
            </div>
            <div className="mt-8">
              <div className="w-[80%] py-1 text-xl rounded-lg mx-auto bg-black text-white flex items-center justify-center gap-2 cursor-pointer" onClick={()=>handleClickVariant('default',"OTP Sent")()}>
                <span className="text-lg">Log In </span>
                <span>
                  <MdOutlineArrowRightAlt size={24} />
                </span>
              </div>
            </div>
            <div className="mt-4 mb-8 text-md sm:text-sm  flex justify-center text-gray-500">
              Don't have an account yet ?{" "}
              <span
                className="text-black cursor-pointer"
                onClick={() => navigate("/register")}
              >
                &nbsp;Register
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
