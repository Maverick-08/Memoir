import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../store/atoms";

const UserTitleComponent = ({isPost}:{isPost:boolean}) => {
    const userDetails = useRecoilValue(userDetailsAtom);
  return (
    <div className="flex flex-col">
      <p className="font-semibold">
        {TitleCase(userDetails?.firstName as string)+" "+TitleCase(userDetails?.lastName as string)} <span className="text-sm">({userDetails?.branch}-{userDetails?.yearOfPassingOut})</span>
      </p>
      <p className="text-sm text-gray-600 text-left">Student</p>
      {isPost && (<p className="text-xs text-gray-400">12h</p>)}
    </div>
  );
};

const TitleCase = (userName:string) => {
    return userName.slice(0,1).toUpperCase()+userName.slice(1).toLowerCase();
}

export default UserTitleComponent;
