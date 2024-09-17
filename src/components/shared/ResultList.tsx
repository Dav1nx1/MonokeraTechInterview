'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { CharacterCard } from "./CharacterCard";
import { useState } from "react";

type CharacterProps = {
  name: string
  status: string
  gender: string
  imageUrl: string
}

const sampleData: CharacterProps[] = Array(100).fill(null).map((_, i) => ({
  name: `Person ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  gender: i % 3 === 0 ? 'Male' : (i % 3 === 1 ? 'Female' : 'Other'),
  imageUrl: `/placeholder.svg?height=200&width=300&text=Person ${i + 1}`
}))

export function ResultLists(){

  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 20
  const totalPages = Math.ceil(100 / 20)

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = sampleData.slice(indexOfFirstCard, indexOfLastCard)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentCards.map((person, index) => (
          <CharacterCard key={index} {...person} />
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}