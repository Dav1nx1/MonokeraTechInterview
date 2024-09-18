'use client'

import { useContext, useState } from "react"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "../ui/button"
import { CharacterContext } from "@/context/CharacterContext"

const tags = [
  "Iron Man",
  "Thor",
  "Black Widow",
  "Spider-Man",
  "Doctor Strange"
]

interface Props {
  nameFilter: string;
  handleNameFilter: (value: string) => void;
}

export function SearchInput({ nameFilter, handleNameFilter }: Props) {
  const [filteredItems, setFilteredItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState(nameFilter)
  const [quickSearch, setQuickSearch] = useState<string>("")
  const { recentlyViewed } = useContext(CharacterContext)!;
  
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.length > 2) {
      handleNameFilter(value.toLowerCase())
    } else {
      handleNameFilter('')
    }
  }

  const handleQuickSearch = (value: string) => {
    setQuickSearch(value)
    handleSearch(value)
    setQuickSearch('')
  }
  
  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <Command className="rounded-lg border shadow-md bg-gray-700 border-gray-600">
        <CommandInput 
          placeholder="Search your favorite character" 
          value={ searchTerm === '' ? quickSearch : searchTerm }
          onValueChange={handleSearch}
          className='text-white placeholder-gray-400 border-gray-700'
        />
        <CommandList>
          <CommandGroup heading="Enter three Letters to start your character search" className="text-white border-gray-700">
            {filteredItems.map((item) => (
              <CommandItem 
                key={item} 
                value={item} 
                className="text-white hover:bg-gray-600 bg-gray-700 border-gray-700"
                onSelect={() => console.log(`Selected ${item}`)}
              >
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <div className="flex gap-2 flex-col">
        <p className="text-gray-400 mb-4 text-sm md:text-base">Most recent searches.</p>
        <div className="flex gap-2 align-middle justify-center ">
          {recentlyViewed.map((item, index) => (
            <Button key={index} variant="secondary" className="text-sm" onClick={() => handleQuickSearch(item.name)}>
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}