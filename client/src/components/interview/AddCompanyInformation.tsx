import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const AddCompanyInformation = ({
  activateNextSection,
}: {
  activateNextSection: (x: boolean) => void;
}) => {
  const [roleType, setRoleType] = useState("Select");
  const [compensation, setCompensation] = useState("6+");
  const [applicationStatus, setApplicationStatus] = useState("Status");
  const [stateCheck, setStateCheck] = useState(false);

  const roleTypeHandler = (value: string) => {
    setRoleType(value);
  };

  const compensationHandler = (value: string) => {
    setCompensation(value);
  };

  const applicationStatusHandler = (value: string) => {
    setApplicationStatus(value);
  };

  const handleStateChecks = () => {
    if (roleType === "Select" || applicationStatus === "Status") {
      setStateCheck(true);
    } else {
      activateNextSection(true);
    }
  };

  return (
    <div className="pt-24">
      <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto shadow bg-white rounded-lg border border-gray-100 pl-4 sm:pl-8 sm:pr-16 py-4 sm:py-8">
        <p className="text-xl sm:text-2xl font-normal">Share Company Profile</p>

        <div className="mt-8 px-4 flex flex-col gap-4 sm:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm sm:text-lg">Enter Company Name</p>
            <input
              type="text"
              placeholder="Type Here...."
              className="text-sm sm:text-lg focus:outline-none border border-gray-200 
              focus:placeholder:text-gray-600 focus:text-gray-500 rounded-md py-1.5 pl-4"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm sm:text-lg">Role Type</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm sm:text-lg w-full flex border border-gray-200 rounded-md focus:outline-none text-gray-400 focus:text-gray-600  py-1.5 pl-4 cursor-pointer">
                {roleType}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="h-44">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => roleTypeHandler("2M Intern")}
                >
                  2M Intern
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => roleTypeHandler("6M Intern")}
                >
                  6M Intern
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => roleTypeHandler("FTE")}
                >
                  FTE
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => roleTypeHandler("2M + FTE")}
                >
                  2M + FTE
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => roleTypeHandler("6M + FTE")}
                >
                  6M + FTE
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => roleTypeHandler("Intern")}
                >
                  Intern
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm sm:text-lg">
              Compensation <span className="text-sm">(In Lpa)</span>
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm sm:text-lg w-full flex border border-gray-200 rounded-md focus:outline-none text-gray-400 focus:text-gray-600  py-1.5 pl-4 cursor-pointer">
                {compensation}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="h-44">
                <DropdownMenuLabel>Pay Scale</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => compensationHandler("8+")}
                >
                  8 +
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => compensationHandler("10+")}
                >
                  10 +
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => compensationHandler("15+")}
                >
                  15 +
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => compensationHandler("20+")}
                >
                  20 +
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => compensationHandler("30+")}
                >
                  30 +
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => compensationHandler("50+")}
                >
                  50 +
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm sm:text-lg">Application Status</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm sm:text-lg w-full flex border border-gray-200 rounded-md focus:outline-none text-gray-400 focus:text-gray-600  py-1.5 pl-4 cursor-pointer">
                {applicationStatus}
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => applicationStatusHandler("Selected")}
                >
                  Selected
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => applicationStatusHandler("Pending")}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => applicationStatusHandler("Rejected")}
                >
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <span
            onClick={() => handleStateChecks()}
            className="text-white sm:text-lg bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] px-8 py-1 sm:px-16 sm:py-2 rounded-md cursor-pointer"
          >
            Next Section
          </span>
        </div>
      </div>
      <AlertDialog open={stateCheck} onOpenChange={setStateCheck}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              The data does not look correct ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Kindly enter accurate information — your insights can truly make a
              meaningful difference for your juniors, more than you can imagine!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" onClick={() => setStateCheck(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddCompanyInformation;
