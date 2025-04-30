import axios from "axios";
import { useEffect, useState } from "react";
import { showToast } from "../toast/CustomToast";
import { BASE_URL } from "@/config";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";
import { useNavigate } from "react-router-dom";

const PasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame,setIsPasswordSame] = useState<boolean|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword === "") {
      setIsPasswordSame(null);
    } else {
      setIsPasswordSame(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    if(isLoading) return;
    setIsLoading(true);
    try{
        await axios.post(`${BASE_URL}/register/password`,{userId:userDetails?.userId,password:confirmPassword});

        showToast.success({
          title:"Password Created",
          message:"Login with your credentials"
        })

        localStorage.removeItem("registrationDetails")

        setTimeout(()=> navigate("/"),3000);
    }
    catch(err){
      if(axios.isAxiosError(err)){
        showToast.error({
          title:"Error Occurred",
          message:err.response?.data.msg
        })
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-8 my-4">

      <p className="text-2xl sm:text-4xl font-semibold text-center bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] bg-clip-text text-transparent">
        Create Password
      </p>

      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-lg text-gray-600">Enter Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password..."
            className="w-full px-4 py-1.5 focus:outline-none border border-gray-200 rounded-md placeholder:text-sm placeholder:text-gray-300 focus:placeholder:text-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg text-gray-600">Enter Confirm Password</p>
          <input
            type="password"
            name="confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
            placeholder="Enter Confirm Password..."
            className={`w-full px-4 py-1.5 focus:outline-none border ${isPasswordSame == null ? "border-gray-200":isPasswordSame == false ? "border-red-400":"border-green-400"} rounded-md placeholder:text-sm placeholder:text-gray-300 focus:placeholder:text-gray-500`}
          />
        </div>
      </div>

      <div className="mt-12 flex justify-center"><button onClick={handleSubmit} className="select-none px-16 py-2  rounded-md text-xl cursor-pointer text-white bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]">
        Submit
      </button></div>
      

    </div>
  );
};

export default PasswordComponent;
