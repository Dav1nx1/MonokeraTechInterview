'use client';

import { SearchInput } from "@/components/shared/SearchInput";
import { ResultLists } from "@/components/shared/ResultList";
import { useState, useCallback } from "react";
import Head from "next/head"; // For adding metadata

export default function Home() {
  const [nameFilter, setNameFilter] = useState('');

  // Memoize the search handler to prevent unnecessary re-renders
  const handleSearch = useCallback((value: string) => {
    setNameFilter(value);
  }, []);

  return (
    <>
      {/* SEO: Head for Title and Meta Tags */}
      <Head>
        <title>Rick and Morty - Character Search</title>
        <meta name="description" content="Search for your favorite characters from the Rick and Morty series." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <div className="flex flex-col" role="main" aria-labelledby="page-title" data-testid="page-container">
        {/* Page Header */}
        <div className="flex justify-center items-center flex-col">
          <h1
            id="page-title"
            className="text-3xl md:text-4xl font-bold mb-4"
            aria-label="Rick and Morty Page Title"
            data-testid="page-title"
          >
            Rick and Morty
          </h1>

          {/* Info Notice */}
        </div>

        {/* Search Section */}
        <div
          className="w-full relative items-center text-center justify-center"
          aria-label="Search Section"
          data-testid="search-section"
        >
          <SearchInput
            nameFilter={nameFilter}
            handleNameFilter={handleSearch}
            aria-label="Search Input"
            data-testid="search-input"
          />
        </div>

        {/* Results list with lazy loading */}
        <div className="container mx-auto py-8" role="list" aria-label="Search Results" data-testid="results-list">
          <ResultLists nameFilter={nameFilter} />
        </div>

        {/* Footer */}
        <footer className="p-4 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-gray-400">
          <a href="#" className="hover:text-white">Oscar Corcho - Made with Love</a>
          <a href="#" className="hover:text-white">For Monokera</a>
        </footer>
      </div>
    </>
  );
}
