const UserTitleComponent = ({
  firstName,
  lastName,
  branch,
  yearOfPassingOut,
  createdAt,
}: {
  firstName: string;
  lastName: string;
  branch: string;
  yearOfPassingOut: number;
  createdAt: Date | undefined;
}) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">
        {TitleCase(firstName) + " " + TitleCase(lastName)}{" "}
        <span className="text-sm">
          ({branch}-{yearOfPassingOut})
        </span>
      </p>
      <p className="text-sm text-gray-600 text-left">Student</p>
      {createdAt && <p className="mt-1 text-[10px] text-gray-400">{calculateHourDfference(createdAt)}</p>}
    </div>
  );
};

const TitleCase = (userName: string) => {
  return userName.slice(0, 1).toUpperCase() + userName.slice(1).toLowerCase();
};

const calculateHourDfference = (createdAt: Date) => {
  const currentTimeStamp = new Date();
  const currentDate = currentTimeStamp.getDate();
  const currentHour = currentTimeStamp.getHours();
  const postTimeStamp = new Date(createdAt);
  const postDate = postTimeStamp.getDate();
  const postHour = postTimeStamp.getHours();

  if (currentDate == postDate) {
    if (currentHour == postHour) {
      return `${currentTimeStamp.getMinutes() - postTimeStamp.getMinutes()}m`;
    } else {
      return `${currentHour - postHour}h`;
    }
  } else {
    return `${postTimeStamp.getDate()}/${
      postTimeStamp.getMonth() + 1
    }/${postTimeStamp.getFullYear()}`;
  }
};

export default UserTitleComponent;
