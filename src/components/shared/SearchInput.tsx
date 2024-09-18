'use client';

import { useCallback, useContext, useState } from 'react';
import { Button } from '../ui/button';
import { CharacterContext } from '@/context/CharacterContext';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash'; // or implement a custom debounce function

interface Props {
  nameFilter: string;
  handleNameFilter: (value: string) => void;
}

export function SearchInput({ nameFilter, handleNameFilter }: Props) {
  const [searchTerm, setSearchTerm] = useState(nameFilter);
  const { recentlyViewed } = useContext(CharacterContext)!;

  // Debounce the search input to improve performance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value.length > 2) {
        handleNameFilter(value.toLowerCase());
      } else {
        handleNameFilter('');
      }
    }, 300), // Adjust delay time (e.g., 300ms)
    [handleNameFilter]
  );

  // Update search term and trigger search
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    handleSearch(value);
  };

  // Trigger quick search from recently viewed
  const handleQuickSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      handleSearch(value);
    },
    [handleSearch]
  );

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8"
          aria-label="Search input"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      {/* Recently Viewed Quick Search */}
      <div className="flex gap-2 flex-col">
        <p className="text-gray-400 mb-4 text-sm md:text-base">Most recent searches.</p>
        <div className="flex gap-2 align-middle justify-center">
          {recentlyViewed.map((item, index) => (
            <Button
              key={index}
              variant="secondary"
              className="text-sm"
              onClick={() => handleQuickSearch(item.name)}
              aria-label={`Search for ${item.name}`}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
