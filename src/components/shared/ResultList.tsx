'use client'

import { CharacterCard } from "./CharacterCard";
import { useState } from "react";
import { useFetchCharacters } from "@/useCases/fetchCharacters";
import { Pagination } from "./Pagination";

interface Props {
  nameFilter: string;
}

export function ResultLists({ nameFilter }: Props){

  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading } = useFetchCharacters(currentPage, nameFilter);

  const handleNextPage = () => {
    console.log(data?.info)
    if (data?.info?.next) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.info?.next) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.results.map((person, index) => (
          <CharacterCard key={index} character={person} />
        ))}
      </div>
      <Pagination currentPage={currentPage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} pages={data?.info?.pages ? data?.info?.pages : 0} />
    </div>
  )
}