import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { showToast } from "../toast/CustomToast";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";

const OTPComponent = ({setComponentActive}:{setComponentActive:(x: "Register" | "OTP Sent" | "OTP Verified") => void}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-4xl font-semibold text-center bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] bg-clip-text text-transparent">
        OTP Verification
      </p>

      <OTPInput setComponentActive={setComponentActive}/>
    </div>
  );
};

const OTPInput = ({setComponentActive}:{setComponentActive:(x: "Register" | "OTP Sent" | "OTP Verified") => void}) => {
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);
  const input5 = useRef<HTMLInputElement>(null);
  const input6 = useRef<HTMLInputElement>(null);
  const [isLoading,setIsLoading] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom)

  const inputRefs = [input1, input2, input3, input4, input5, input6];

  useEffect(() => {
    input1.current?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }else if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = async () => {
    if(isLoading) return ;
    setIsLoading(true);

    try {
      const otp = Number(inputRefs.map((x) => x.current?.value).join(""));

      await axios.post(`${BASE_URL}/register/otp`,{userId:userDetails?.userId,otp});

      localStorage.setItem("registrationStatus",JSON.stringify({level:"OTP Verified"}))

      showToast.success({
        title: "Verification Compeleted",
        message: "User is verified",
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
      setComponentActive("OTP Verified");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showToast.warning({
          title:"Incomplete Verification",
          message:err.response?.data.msg
        })
      }
    }
    setIsLoading(false);
  };

  const resendOtp = async() => {
    if(isLoading) return;
    
    setIsLoading(true);
    try{
      await axios.get(`${BASE_URL}/register/otp?email=${userDetails?.email}.com&userId=${userDetails?.userId}`)
      showToast.success({
        title:"Information",
        message:"New otp has been sent on your registered mail address."
      })
    }
    catch(err){
      if(axios.isAxiosError(err)){
        showToast.error({
          title:"Failed",
          message:"Otp could not be sent on your mail Id",
          action:{
            label:"Dismiss",
            onClick: () => {}
          }
        })
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="">
      <div className="mt-4 flex gap-4 ">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type="text"
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            className="w-10 h-10 shadow text-center border border-gray-200 rounded"
          />
        ))}
      </div>

      <div className="mt-8 flex gap-4 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center">
        <span onClick={!isLoading ? resendOtp : undefined} className="px-4 lg:px-8 py-1.5 text-[#0ea5e9] rounded-md border border-[#0ea5e9] cursor-pointer">
          Resend OTP
        </span>
        <span onClick={!isLoading ? verifyOtp : undefined} className="px-8 py-1.5 rounded-md text-white bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] cursor-pointer">
          Verify OTP
        </span>
      </div>
      <p className="mt-4 text-xs text-center text-gray-400">
        Didn't receive the code? Check your spam folder
      </p>
    </div>
  );
};
export default OTPComponent;
