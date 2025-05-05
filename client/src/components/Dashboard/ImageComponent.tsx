import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";

const ImageComponent = ({
  firstName = "",
  lastName = "",
}: {
  firstName: string;
  lastName: string;
}) => {
  const userDetails = useRecoilValue(userDetailsAtom);
  return (
    <div>
      {!userDetails?.profileUrl ? (
        <div className="bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] shrink-0 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center text-white text-xl">
          {firstName == "" && lastName == ""
            ? userDetails?.firstName.slice(0, 1).toUpperCase() +
              " " +
              userDetails?.lastName.slice(0, 1).toUpperCase()
            : firstName.slice(0, 1).toUpperCase() +
              " " +
              lastName.slice(0, 1).toUpperCase()}
        </div>
      ) : (
        <img
          src={userDetails.profileUrl}
          alt="Profile Photo"
          className="shrink-0 rounded-full h-12 w-12 sm:h-16 sm:w-16"
        ></img>
      )}
    </div>
  );
};

export default ImageComponent;
