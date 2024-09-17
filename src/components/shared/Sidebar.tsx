import { PlusCircleIcon, ClockIcon, FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
    return (
        <aside className="hidden md:flex w-16 flex-col items-center py-4 border-r border-gray-800">
        <Button variant="ghost" size="icon" className="mb-4">
          <PlusCircleIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="mb-4">
          <ClockIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <FolderIcon className="h-6 w-6" />
        </Button>
      </aside>
    )
}