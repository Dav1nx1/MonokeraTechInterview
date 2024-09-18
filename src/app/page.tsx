'use client';

import { SearchInput } from "@/components/shared/SearchInput";
import { ResultLists } from "@/components/shared/ResultList";
import { useState, useCallback } from "react";
import Head from "next/head"; // For adding metadata

import './styles/home.css'

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

      <div className="home" role="main" aria-labelledby="page-title" data-testid="page-container">
        {/* Page Header */}
        <div className="home__header">
          <h1
            id="page-title"
            className="home__title"
            aria-label="Rick and Morty Page Title"
            data-testid="page-title"
          >
            Rick and Morty
          </h1>
        </div>

        {/* Search Section */}
        <div
          className="home__search-section"
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
        <div className="home__results" role="list" aria-label="Search Results" data-testid="results-list">
          <ResultLists nameFilter={nameFilter} />
        </div>

        {/* Footer */}
        <footer className="home__footer">
          <a href="#" className="home__footer-link home__footer-link--highlight">Oscar Corcho - Made with Love</a>
          <a href="#" className="home__footer-link">For Monokera</a>
        </footer>
      </div>
    </>
  );
}
