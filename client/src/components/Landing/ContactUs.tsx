import { useState } from "react";
import { useSnackbar, VariantType } from "notistack";
import axios from "axios";

type InputProps = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  placeHolder: string;
  type?: "text" | "textarea";
};

const InputElement = ({
  value,
  setValue,
  label,
  placeHolder,
  type = "text",
}: InputProps) => {
  if (type === "textarea") {
    return (
      <div>
        <p className="font-medium">{label}</p>
        <textarea
          value={value}
          placeholder={placeHolder}
          className="ml-4 mt-4 w-80 h-32 px-4 py-2 border-2 border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:bg-sky-50 focus:border-sky-200"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <p className="font-medium">{label}</p>
      <input
        type="text"
        value={value}
        placeholder={placeHolder}
        className="ml-4 mt-4 py-1 px-4 border-2 border-gray-200 bg-gray-50 rounded-md  w-80 focus:outline-none focus:bg-sky-50 focus:border-sky-200"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const ContactUs = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, msg: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const handleSubmit = async () => {
    try{
      const payload = {name:userName,email,message}
      console.log(payload);
      await axios.post("https://memoir.dev-projects.site/api/reviews",payload,{withCredentials:true});
      setEmail("")
      setUserName("")
      setMessage("")
      handleClickVariant("success","Review sent successfully")()
    }
    catch(err){
      handleClickVariant("error","Failed to sent review")();
    }
  }

  return (
    <div className="mt-16">
      <div id="Contact Us">
        <p className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text mb-16 p-1">
          Any Suggestions or Queries ?
        </p>
        <div className=" flex justify-center">
          <div className="shadow-md border border-gray-100 flex flex-col gap-8 px-4 md:px-8 py-4">
            <InputElement
              value={userName}
              setValue={setUserName}
              label="Name"
              placeHolder="Your Name"
            />
            <InputElement
              value={email}
              setValue={setEmail}
              label="Email"
              placeHolder="Your Email"
            />
            <InputElement
              value={message}
              setValue={setMessage}
              label="Message"
              type="textarea"
              placeHolder="Your Message"
            />
            <div className="flex justify-center items-center">
              <span onClick={handleSubmit} className="bg-black text-white text-center text-xl px-24 py-1 rounded-md cursor-pointer">Submit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
