import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowRightAlt } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";
import { VariantType, useSnackbar } from "notistack";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [componentActive, setComponentActive] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, msg: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const getLastActiveSection = () => {
    try {
      const data = localStorage.getItem("lastVisited");

      if (data) {
        return JSON.parse(data).section;
      }
    } catch (err) {
      return undefined;
    }
  };

  const setLastActiveSection = (section: string) => {
    localStorage.setItem("lastVisited", JSON.stringify({ section }));
  };

  useEffect(() => {
    const lastActiveSection = getLastActiveSection();

    if (!lastActiveSection) {
      setLastActiveSection("Registration");
      setComponentActive("Registration");
    } else {
      setComponentActive(lastActiveSection);
    }
  }, []);

  return (
    <div>
      {getLastActiveSection() === "Auth" ? <Navigate to={"/auth"} /> : <></>}
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
          {componentActive === "OTP" ? (
            <OTPComponent
              setComponentActive={setComponentActive}
              setLastActiveSection={setLastActiveSection}
              handleClickVariant={handleClickVariant}
            />
          ) : componentActive === "Password" ? (
            <PasswordComponent
              setLastActiveSection={setLastActiveSection}
              handleClickVariant={handleClickVariant}
            />
          ) : (
            <RegisterComponent
              setComponentActive={setComponentActive}
              setLastActiveSection={setLastActiveSection}
              handleClickVariant={handleClickVariant}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const RegisterComponent = ({
  setComponentActive,
  setLastActiveSection,
  handleClickVariant,
}: {
  setComponentActive: (x: string) => void;
  setLastActiveSection: (x: string) => void;
  handleClickVariant: (x: VariantType, y: string) => () => void;
}) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [degree, setDegree] = useState("MCA");
  const [branch, setBranch] = useState("NA");
  const [yearOfPassingOut, setYearOfPassingOut] = useState<null | number>();
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [email, setEmail] = useState("");
  const setUserDetails = useSetRecoilState(userDetailsAtom);

  const verifyDetails = () => {
    if (firstName.length < 3 || lastName.length < 3) {
      alert("Name field cannot be empty");
      return false;
    } else if (
      !yearOfPassingOut ||
      yearOfPassingOut < 1980 ||
      yearOfPassingOut > new Date().getFullYear() + 6
    ) {
      alert("Please enter correct passing out year");
      return false;
    } else if (!registrationNumber) {
      alert("Invalid Registration Number");
      return false;
    } else if (!email.includes("@")) {
      alert("Invalid Email account");
      return false;
    }
    return true;
  };

  const registrationHandler = async () => {
    if (!verifyDetails()) {
      return;
    } else {
      handleClickVariant("info", "Sending OTP")();
    }

    if (registrationNumber && yearOfPassingOut) {
      setUserDetails({
        name: firstName.toUpperCase() + " " + lastName.toUpperCase(),
        email,
        degree,
        branch,
        registrationNumber,
        yearOfPassingOut,
        password: "",
        linkedIn: "",
        xHandle: "",
      });
    }
    console.log({
      name: firstName.toUpperCase() + " " + lastName.toUpperCase(),
      email,
      degree,
      branch,
      registrationNumber,
      yearOfPassingOut,
    });

    try {
      await axios.get(`http://localhost:3000/register?email=${email}`, {
        withCredentials: true,
      });

      handleClickVariant("success", "OTP sent successfully")();
      setLastActiveSection("OTP");
      setComponentActive("OTP");
    } catch (err: any) {
      handleClickVariant("error", err?.response.data.msg)();
    }
  };

  return (
    <div className="border-gray-200  sm:w-fit shadow-lg">
      <div className="py-8">
        <p className="text-2xl font-medium text-center">Create an Account</p>
      </div>
      {/* Enter Full Name */}
      <div className="px-8 mt-6 sm:mt-4 mb-4">
        <p className="text-lg sm:font-medium">Enter Name</p>
        <div className="flex gap-16">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className=" mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-40 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="ml-4 mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-40 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
          />
        </div>
      </div>

      {/* Course Details  */}
      <div className="px-8 mt-6 sm:mt-6 mb-4">
        <p className="text-lg sm:font-medium">Course Details</p>
        <div className="mt-4 flex gap-4">
          <select
            name="degree"
            value={degree} // Use the `value` prop to control the selected option
            onChange={(e) => setDegree(e.target.value)}
            className="px-4 py-2 w-32 cursor-pointer rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
          >
            <option value="MCA">MCA</option>
            <option value="BTECH">BTECH</option>
            <option value="MTECH">MTECH</option>
            <option value="MBA">MBA</option>
            <option value="MSC">MSC</option>
          </select>
          <select
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-4 py-2 cursor-pointer rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MDS">MDS</option>
            <option value="CIVIL">CIVIL</option>
            <option value="NA">NOT APPLICABLE</option>
          </select>
          <input
            type="text"
            onChange={(e) =>
              setYearOfPassingOut(Number(e.target.value) || null)
            }
            placeholder="Year of passing out"
            className="px-4 py-2 w-52 rounded-lg focus:outline-none bg-slate-50 border border-slate-50 focus:border-slate-200"
          />
        </div>
      </div>

      {/* Registration Number  */}
      <div className="px-8 mt-6 sm:mt-6 mb-4">
        <p className="text-lg sm:font-medium">Registration Number</p>
        <input
          type="text"
          onChange={(e) => setRegistrationNumber(e.target.value)}
          placeholder="Enter reg number"
          className="mt-4 py-1.5 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-[90%] focus:outline-none focus:bg-sky-50 focus:border-sky-200"
        />
      </div>

      {/* College Mail ID */}
      <div className="px-8 mt-6 sm:mt-6 mb-4">
        <p className="text-lg sm:font-medium">College Mail Id</p>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="PG26@stu.manit.ac.in"
          className="mt-4 py-1.5 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-[90%] focus:outline-none focus:bg-sky-50 focus:border-sky-200"
        />
      </div>

      <div className="mt-8">
        <div
          onClick={() => {
            registrationHandler();
          }}
          className="w-[80%] py-1 rounded-lg mx-auto bg-black text-white flex items-center justify-center gap-2 cursor-pointer"
        >
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
  );
};

const OTPComponent = ({
  setComponentActive,
  setLastActiveSection,
  handleClickVariant,
}: {
  setComponentActive: (x: string) => void;
  setLastActiveSection: (x: string) => void;
  handleClickVariant: (x: VariantType, y: string) => () => void;
}) => {
  const [otpValue, setOtpValue] = useState("");
  const userDetails = useRecoilValue(userDetailsAtom);

  const handleOtpChange = (otp: string) => {
    setOtpValue(otp);
  };

  const verifyOTP = async () => {
    try {
      handleClickVariant("info", "Verifying OTP")();
      await axios.get(
        `http://localhost:3000/register?email=${userDetails?.email}&otp=${otpValue}`,
        { withCredentials: true }
      );

      setLastActiveSection("Password");
      setComponentActive("Password");
    } catch (err: any) {
      handleClickVariant("error", err.response.data.msg)();
    }
  };

  return (
    <div className="border-gray-200 rounded-xl sm:w-fit shadow-lg">
      <div className="mt-4 py-4">
        <p className="text-4xl font-medium text-center">Enter OTP</p>
      </div>
      <div className="mx-12  w-72 mt-6 sm:mt-4 mb-4">
        <div className="mt-8 mb-8  flex justify-center">
          <OTPInput length={4} onChange={handleOtpChange} />
        </div>
        <div>
          <div
            onClick={verifyOTP}
            className="w-[80%] py-1 rounded-lg mx-auto bg-black text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-lg">Verify</span>
            <span>
              <MdArrowRightAlt size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OTPInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onChange(newOtp.join(""));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Initialize ref array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  return (
    <div>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          className="border border-gray-200 bg-slate-50 rounded-md"
          maxLength={1}
          value={data}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            marginRight: "10px",
            fontSize: "18px",
          }}
        />
      ))}
    </div>
  );
};

const PasswordComponent = ({
  setLastActiveSection,
  handleClickVariant,
}: {
  setLastActiveSection: (x: string) => void;
  handleClickVariant: (x: VariantType, y: string) => () => void;
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userDetails = useRecoilValue(userDetailsAtom);

  const checkPassword = () => {
    if (password.length == 0 || confirmPassword.length == 0) {
      alert("Password field cannot be empty");
      return false;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match !");
      return false;
    }
    return true;
  };

  const submitPassword = async () => {
    if (!checkPassword()) {
      return;
    } else {
      try {
        await axios.post(
          "http://localhost:3000/register",
          { ...userDetails, password: confirmPassword },
          { withCredentials: true }
        );

        handleClickVariant("success", "Account Created")();
        setLastActiveSection("Auth");
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      } catch (err: any) {
        handleClickVariant(
          "error",
          err.response.data.msg ?? "Internal Server Error"
        )();
      }
    }
  };

  return (
    <div className="border-gray-200 rounded-xl sm:w-fit shadow-lg">
      <div className="py-8">
        <p className="text-2xl font-medium text-center">Create Password</p>
      </div>
      <div className="ml-8">
        <div className="flex flex-col gap-8">
          <div className="w-96">
            <p className="font-medium">Enter Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-4 py-1.5 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-[90%] focus:outline-none focus:bg-sky-50 focus:border-sky-200"
            />
          </div>
          <div>
            <p className="font-medium">Confirm Password</p>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password"
              className="mt-4 py-1.5 px-4 border-2 border-gray-200 bg-gray-50 rounded-md w-64 md:w-[90%] focus:outline-none focus:bg-sky-50 focus:border-sky-200"
            />
          </div>
        </div>
        <div
          onClick={submitPassword}
          className="mt-8 mb-4 w-[80%] py-1 rounded-lg mx-auto bg-black text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-lg">Set Password</span>
          <span>
            <MdArrowRightAlt size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
