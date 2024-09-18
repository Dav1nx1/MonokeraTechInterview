'use client';
import { PlusCircleIcon, ClockIcon, FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileSidebar({ closeSidebar }: { closeSidebar: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      {/* Sidebar content */}
      <div className="bg-gray-900 p-4 shadow-lg w-full">
        <div className="text-white font-bold text-xl mb-4">Menu</div>
      </div>

      {/* Navigation icons at the bottom */}
      <div className="md:hidden flex justify-around py-2 border-t border-gray-800 mt-auto">
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

      {/* Click outside to close */}
      <div className="flex-1" onClick={closeSidebar} />
    </div>
  );
}
