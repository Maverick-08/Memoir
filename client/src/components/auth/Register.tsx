import { MdArrowBackIos } from "react-icons/md";
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

  return (
    <div>
      <div className="flex">
        <div className="hidden relative w-full h-screen bg-blue-600 sm:flex flex-col items-center justify-center gap-4">
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
            onClick={() => navigate("/")}
          >
            <MdArrowBackIos size={24} />
          </span>
          <div className="border-gray-200 w-[80%] sm:w-fit shadow-lg">
            <div className="py-8">
              <p className="text-2xl font-medium text-center">Create an Account</p>
            </div>
            <div className="px-8 mt-6 sm:mt-4 mb-4">
              <p className="text-lg sm:font-medium">Registration Number</p>
              <input
                type="text"
                placeholder="10 digits number"
                className="ml-4 sm:ml-8 mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-56 md:w-96 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
              />
            </div>
            <div className="px-8 mt-6 sm:mt-4 mb-4">
              <p className="text-lg sm:font-medium">College Mail Id</p>
              <input
                type="email"
                placeholder="PG26@stu.manit.ac.in"
                className="ml-4 sm:ml-8 mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-56 md:w-96 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
              />
            </div>
            <div className="mt-8">
              <div className="w-[80%] py-1 rounded-lg mx-auto bg-black text-white flex items-center justify-center gap-2">
                <span className="text-lg">Get OTP </span>
                <span>
                  <MdArrowRightAlt size={20} />
                </span>
              </div>
            </div>
            <div className="mt-4 mb-8 text-md sm:text-sm  flex justify-center text-gray-500">
              Already have an account ?{" "}
              <span
                className="text-black cursor-pointer"
                onClick={() => navigate("/auth")}
              >
                &nbsp;Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
