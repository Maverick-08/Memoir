import profilePhoto from "../../assets/Vivek.jpg";

const DashboardProfileCard = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 shadow bg-white border-l-4 border-sky-400 rounded-xl px-4 py-4">
        <img src={profilePhoto} alt="Profile Photo" className="shrink-0 rounded-full h-16 w-16" />
        <div className="flex flex-col">
            <p className="font-semibold">
              Vivek Ojha <span className="text-sm">(MCA-2026)</span>
            </p>
            <p className="text-sm text-gray-600">Student</p>
          </div>
      </div>
    </div>
  )
}

export default DashboardProfileCard
