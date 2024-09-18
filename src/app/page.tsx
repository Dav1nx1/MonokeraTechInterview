'use client'

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/SearchInput";
import { ResultLists } from "@/components/shared/ResultList";
import { useState } from "react";

export default function Home() {
  const [nameFilter, setNameFilter] = useState('');

  const handleSearch = (value: string) => {
    setNameFilter(value);
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Rick and Morty</h1>

        {/* Subscription notice */}
        <div className="w-full max-w-xl mb-4 flex flex-col md:flex-row justify-between items-center bg-gray-800 rounded-lg p-2 text-center">
          <span className="text-sm text-gray-300 mb-2 md:mb-0">Created by Oscar Corcho.</span>
          <Button variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-400/10">
            Contact Me
          </Button>
        </div>
      </div>

        {/* Input field */}
        <div className="w-full relative items-center text-center justify-center">
          <SearchInput nameFilter={nameFilter} handleNameFilter={(value: string) => handleSearch(value) }/>
        </div>

        <div className="container mx-auto py-8">
          <ResultLists nameFilter={nameFilter} />
        </div>
    </div>
  );
}
