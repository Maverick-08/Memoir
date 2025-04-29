import { useEffect, useState } from "react";
import CourseDetailsComponent from "./CourseDetailsComponent";
import axios from "axios";
import { BASE_URL } from "@/config";
import { showToast } from "../toast/CustomToast";
import { useSetRecoilState } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";

const UserRegistration = ({
  setComponentActive,
}: {
  setComponentActive: (x: "Register" | "OTP Sent" | "OTP Verified") => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfPassingOut, setYearOfPassingOut] = useState("");
  const [email, setEmail] = useState("");
  const setUserDetails = useSetRecoilState(userDetailsAtom);

  const registrationStatus = JSON.parse(
    localStorage.getItem("registrationStatus")!
  )
    ? (JSON.parse(localStorage.getItem("registrationStatus")!).level as
        | "Register"
        | "OTP Sent"
        | "OTP Verified")
    : "Register";

  useEffect(() => {
    const userRegistrationData: {
      firstName: string;
      lastName: string;
      course: string;
      branch: string;
      yearOfPassingOut: string;
      email: string;
    } = JSON.parse(localStorage.getItem("registrationDetails")!)
      ? JSON.parse(localStorage.getItem("registrationDetails")!)
      : {};

    setFirstName(userRegistrationData.firstName ?? "");
    setLastName(userRegistrationData.lastName ?? "");
    setCourse(userRegistrationData.course ?? "");
    setBranch(userRegistrationData.branch ?? "");
    setYearOfPassingOut(userRegistrationData.yearOfPassingOut ?? "");
    setEmail(userRegistrationData.email ?? "");
  }, []);

  const handleSubmit = async () => {
    const validationResponse = validations({
      firstName,
      lastName,
      course,
      branch,
      yearOfPassingOut: Number(yearOfPassingOut),
      email,
    });

    // 1. Validate Data
    if (validationResponse.status == false) {
      {
        showToast.warning({
          title: "Invalid User Data",
          message: validationResponse.msg,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
      }
      return;
    }

    // 2. Set in local storage for persistence
    localStorage.setItem(
      "registrationDetails",
      JSON.stringify({
        firstName,
        lastName,
        course,
        branch,
        yearOfPassingOut: Number(yearOfPassingOut),
        email,
      })
    );

    // 3. If user has completed the registration process then send OTP
    if (registrationStatus == "Register") {
      // 3.1 Register user
      {
        showToast.info({
          title: "Sending OTP",
          message: "You will recieve an OTP on your mail shortly!",
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
      }
      try {
        // 3.2 Send the data on server
        const response = await axios.post(`${BASE_URL}/register`, {
          firstName,
          lastName,
          email,
          course,
          branch,
          yearOfPassingOut:Number(yearOfPassingOut),
        });

        setUserDetails(response.data);

        // 3.3 Show toast if user is registered
        {
          showToast.success({
            title: "OTP Delivered",
            message: "We have sent an OTP on your registered mail.",
            action: {
              label: "Dismiss",
              onClick: () => {},
            },
          });
        }

        // 3.4 Persistance
        localStorage.setItem(
          "registrationStatus",
          JSON.stringify({ level: "OTP Sent" })
        );
        localStorage.setItem("userDetails",JSON.stringify(response.data));

        // 3.5 Activate the next component
        setComponentActive("OTP Sent");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data.msg);
          {
            showToast.warning({
              title: "Failed",
              message:
                err.response?.data.msg ||
                "Failed to deliver OTP on your registered mail. Try using another mail ?",
              action: {
                label: "Dismiss",
                onClick: () => {},
              },
            });
          }
        }
      }
    }
    // 4. If otp has been sent then verify it
    else if (registrationStatus == "OTP Sent") {
      setComponentActive("OTP Sent");
    }
    // 5. If verification of otp is done then set user password
    else if (registrationStatus == "OTP Verified") {
      setComponentActive("OTP Verified");
    }
  };

  return (
    <div>
      <p className="text-xl font-semibold text-center">Create an Account</p>

      <div className="mt-6 flex flex-col gap-6 md:gap-8">
        <NameComponent
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
        />
        <CourseDetailsComponent
          selectedCourse={course}
          setSelectedCourse={setCourse}
          selectedBranch={branch}
          setSelectedBranch={setBranch}
          yearOfPassingOut={yearOfPassingOut}
          setYearOfPassingOut={setYearOfPassingOut}
        />
        <EmailComponent userEmail={email} setUserEmail={setEmail} />
      </div>

      <div className="mt-8 flex justify-center">
        <span
          onClick={handleSubmit}
          className="select-none px-8 py-1 rounded-md text-lg cursor-pointer text-white bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]"
        >
          {registrationStatus == "Register"
            ? "Get OTP"
            : registrationStatus == "OTP Sent"
            ? "Enter OTP"
            : registrationStatus == "OTP Verified"
            ? "Create Passowrd"
            : ""}
        </span>
      </div>
    </div>
  );
};

const NameComponent = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
}: {
  firstName: string;
  setFirstName: (x: string) => void;
  lastName: string;
  setLastName: (x: string) => void;
}) => {
  return (
    <div>
      <p className="text-lg text-gray-600">Enter Name</p>
      <div className="flex gap-2 md:gap-4 lg:gap-8">
        <input
          type="text"
          name="First Name"
          autoComplete="on"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="Enter First Name"
          className="w-full px-4 py-1.5 focus:outline-none border border-gray-200 rounded-md placeholder:text-sm placeholder:text-gray-300 focus:placeholder:text-gray-500"
        />
        <input
          type="text"
          name="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="on"
          placeholder="Enter Last Name"
          className="w-full px-4 py-1.5 focus:outline-none border border-gray-200 rounded-md placeholder:text-sm placeholder:text-gray-300 focus:placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};

const EmailComponent = ({
  userEmail,
  setUserEmail,
}: {
  userEmail: string;
  setUserEmail: (x: string) => void;
}) => {
  return (
    <div>
      <p className="text-lg text-gray-600">Enter Email</p>
      <input
        type="email"
        autoComplete="on"
        name="email"
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
        placeholder="Mail Address"
        className="mt-2 w-full px-4 py-1.5 focus:outline-none border border-gray-200 rounded-md placeholder:text-sm placeholder:text-gray-300 focus:placeholder:text-gray-500"
      />
    </div>
  );
};

const validations = ({
  firstName,
  lastName,
  course,
  branch,
  yearOfPassingOut,
  email,
}: {
  firstName: string;
  lastName: string;
  course: string;
  branch: string;
  yearOfPassingOut: number;
  email: string;
}) => {
  const regex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PGStreams = ["MCA", "MTECH"];
  const UGStreams = ["CSE", "EE", "ECE"];

  if (!regex.test(firstName)) {
    return { status: false, msg: "Incorrect first name provided" };
  } else if (!regex.test(lastName)) {
    return { status: false, msg: "Incorrect last name provided" };
  } else if (course == "UG" && PGStreams.includes(branch)) {
    return { status: false, msg: "Selected branch belongs to PG course" };
  } else if (course == "PG" && UGStreams.includes(branch)) {
    return { status: false, msg: "Selected branch belongs to UG course" };
  } else if (
    yearOfPassingOut < 1960 ||
    yearOfPassingOut > new Date().getFullYear() + 5
  ) {
    return { status: false, msg: "Year of passing out is invalid" };
  } else if (!emailRegex.test(email)) {
    return { status: false, msg: "Invalid Email" };
  }

  return { status: true };
};

export default UserRegistration;
