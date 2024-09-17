import { PlusCircleIcon, ClockIcon, FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileSidebar() {
    return (
      <div className="md:hidden flex justify-around py-2 border-b border-gray-800">
        <Button variant="ghost" size="icon">
          <PlusCircleIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <ClockIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <FolderIcon className="h-6 w-6" />
        </Button>
      </div>
    )
}