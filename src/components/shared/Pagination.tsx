import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export interface PaginationProps {
  currentPage: number;
  handleNextPage: (prev: unknown) => void;
  handlePreviousPage: (prev: unknown) => void;
  pages: number;
}

export function Pagination({ currentPage, handleNextPage, handlePreviousPage, pages }: PaginationProps) {
  // Memoized handlers to prevent re-renders
  const handlePrevClick = useCallback(() => {
    handlePreviousPage((prev: number) => Math.max(prev - 1, 1));
  }, [handlePreviousPage]);

  const handleNextClick = useCallback(() => {
    handleNextPage((prev: number) => Math.min(prev + 1, pages));
  }, [handleNextPage, pages]);

  return (
    <div className="mt-8 flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {pages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={handleNextClick}
        disabled={currentPage === pages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
