"use client";

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

export function ComboboxDemo({
  title,
  list,
  titleStyle,
  dropDownStyle = "",
  value,
  setValue
}: {
  title: string;
  list: { value: string; label: string }[];
  titleStyle: string;
  dropDownStyle: string;
  value:string;
  setValue:(x:string)=>void
}) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={`${titleStyle} flex items-center justify-between rounded-md border cursor-pointer `}
        >
          {value
            ? <p className="">{list.find((listItem) => listItem.value === value)?.label}</p>
            : <p className="text-sm lg:text-md text-gray-300">{title}</p>}

          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className={`${dropDownStyle}`}>
          <CommandInput placeholder="Search" className="h-9" />
          <CommandList>
            <CommandEmpty>Whoops !</CommandEmpty>
            <CommandGroup>
              {list.map((listItem) => (
                <CommandItem
                  key={listItem.value}
                  value={listItem.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {listItem.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === listItem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
