import { ComboboxDemo } from "../ComboBox";

const course = [
  {
    value: "UG",
    label: "UG",
  },
  {
    value: "PG",
    label: "PG",
  },
  {
    value: "DUAL",
    label: "DUAL",
  },
];
const stream = [
  {
    value: "CSE",
    label: "CSE",
  },
  {
    value: "ECE",
    label: "ECE",
  },
  {
    value: "MCA",
    label: "MCA",
  },
  {
    value: "MECH",
    label: "MECH",
  },
  {
    value: "MME",
    label: "MME",
  },
  {
    value: "MDS",
    label: "MDS",
  },
];

const CourseDetailsComponent = ({
  selectedCourse,
  setSelectedCourse,
  selectedBranch,
  setSelectedBranch,
  yearOfPassingOut,
  setYearOfPassingOut
}: {
  selectedCourse: string;
  setSelectedCourse: (x: string) => void;
  selectedBranch: string;
  setSelectedBranch: (x: string) => void;
  yearOfPassingOut:string;
  setYearOfPassingOut:(x:string) => void
}) => {
  return (
    <div>
      <p className="text-lg text-gray-600">Enter Course Details</p>
      <div className="mt-2 flex gap-2 md:gap-4 lg:gap-8">
        <ComboboxDemo
          title="Select Course"
          list={course}
          titleStyle="w-full px-4 py-1.5"
          dropDownStyle=""
          value={selectedCourse}
          setValue={setSelectedCourse}
        />
        <ComboboxDemo
          title="Select Stream"
          list={stream}
          titleStyle="w-full px-4 py-1.5"
          dropDownStyle="h-42"
          value={selectedBranch}
          setValue={setSelectedBranch}
        />
      </div>
      <input
        type="number"
        value={yearOfPassingOut}
        onChange={(e)=>setYearOfPassingOut(e.target.value)}
        min={1960}
        required
        autoComplete="on"
        name="Year of Passing Out"
       
        placeholder="Year of Passing Out"
        className="mt-4 w-full px-4 py-1.5 focus:outline-none border border-gray-200 rounded-md placeholder:text-sm placeholder:text-gray-300 focus:placeholder:text-gray-500"
      />
    </div>
  );
};

export default CourseDetailsComponent;
