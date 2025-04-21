import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const courses = [
  {
    value: "ALL INTERVIEWS",
    label: "ALL INTERVIEWS",
  },
  {
    value: "BTECH-CSE",
    label: "BTECH-CSE",
  },
  {
    value: "BTECH-MECH",
    label: "BTECH-MECH",
  },
  {
    value: "BTECH-MME",
    label: "BTECH-MME",
  },
  {
    value: "BTECH-CIVIL",
    label: "BTECH-CIVIL",
  },
  {
    value: "BTECH-ECE",
    label: "BTECH-ECE",
  },
  {
    value: "MCA",
    label: "MCA",
  },
  {
    value: "MTECH",
    label: "MTECH",
  },
];

export function InterviewFilterComponent({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: string[];
  setSelectedTags: (x: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between sm:gap-8 border border-gray-200 px-2 py-1 rounded-md focus:first:text-gray-500">
          <span className="text-gray-400">Select Filter Tags</span>
          <span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="h-56">
          <CommandInput placeholder="Search course..." />
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  key={course.value}
                  value={course.value}
                  onSelect={(currentValue) => {
                    if(!selectedTags.includes(currentValue)){
                        setSelectedTags([...selectedTags, currentValue]);
                    }
                    if(selectedTags.includes(currentValue)){
                        setSelectedTags(selectedTags.filter(tag => tag != currentValue))
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.includes(course.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {course.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
