'use client'

import { useState } from "react"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "../ui/button"

const tags = [
  "Iron Man",
  "Thor",
  "Black Widow",
  "Spider-Man",
  "Doctor Strange"
]

const allItems = [
  "Iron Man",
  "Captain America",
  "Thor",
  "Black Widow",
  "Hulk",
  "Hawkeye",
  "Spider-Man",
  "Black Panther",
  "Doctor Strange",
  "Scarlet Witch"
]

export function SearchInput() {
  const [filteredItems, setFilteredItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [quickSearch, setQuickSearch] = useState<string>("")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.length > 2) {
      const filtered = allItems.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems([])
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

      <div className="flex gap-2 mt-4 align-middle justify-center">
        {tags.map((tag, index) => (
          <Button key={index} variant="secondary" className="text-sm" onClick={() => handleQuickSearch(tag)}>
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}