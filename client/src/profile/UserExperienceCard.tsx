import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const UserExperienceCard = () => {
  return (
    <div>
      <div className="px-8 py-4 bg-white rounded-lg">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Experience</p>
          <div className="flex gap-6">
            <span>
              <IoMdAdd className="h-6 w-6" />
            </span>
            <span>
              <MdModeEdit className="h-6 w-6" />
            </span>
          </div>
        </div>
        <p className="my-4 text-gray-500">Working somewhere ? Add it here..</p>
      </div>
    </div>
  );
};

export default UserExperienceCard;
