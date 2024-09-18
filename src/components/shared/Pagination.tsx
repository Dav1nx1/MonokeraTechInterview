import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  handleNextPage: (prev: unknown) => void;
  handlePreviousPage: (prev: unknown) => void;
  pages: number;
}

export function Pagination({currentPage, handleNextPage, handlePreviousPage, pages}: Props) {
  return (
    <div className="mt-8 flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePreviousPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {pages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleNextPage((prev: number) => Math.min(prev + 1, pages))}
        disabled={currentPage === pages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}