import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

export function SheetDemo({
  sheetOpen,
  setSheetOpen,
  links
}: {
  sheetOpen: boolean;
  setSheetOpen: (x: boolean) => void;
  links: {icon:JSX.Element;title:string;navigate:string}[]
}) {
    const navigate = useNavigate();
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="bg-white font-inter" side="left">
        <SheetHeader>
          <SheetTitle className="text-center text-4xl">Memoir</SheetTitle>
        </SheetHeader>
        <div className="pt-4 pl-6 flex flex-col justify-center gap-8 ">
            {links.map((link) => {
                return(
                    <div onClick={()=>{navigate(link.navigate)}} className="flex items-center space-x-4">
                        {link.icon}
                        <p className="text-2xl">{link.title}</p>
                    </div>
                )
            })}
        </div>
        <SheetFooter>
          <div className="flex justify-center">
            <span className="bg-red-500 text-white px-12 py-1 rounded-md">Sign Out</span>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
