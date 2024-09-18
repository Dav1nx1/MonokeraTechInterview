'use client'

import { CharacterCard } from "./CharacterCard";
import { useState, useCallback } from "react";
import { useFetchCharacters } from "@/useCases/fetchCharacters";
import { Pagination } from "./Pagination";

interface Props {
  nameFilter: string;
}

export function ResultLists({ nameFilter }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useFetchCharacters(currentPage, nameFilter);

  // Handle next page memoized to avoid unnecessary re-renders
  const handleNextPage = useCallback(() => {
    if (data?.info?.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [data]);

  // Handle previous page memoized to avoid unnecessary re-renders
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;

  // Check if no results are found
  if (!data?.results.length) return <div>No results found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.results.map((person, index) => (
          <CharacterCard key={index} character={person} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        pages={data?.info?.pages ?? 0}
      />
    </div>
  );
}