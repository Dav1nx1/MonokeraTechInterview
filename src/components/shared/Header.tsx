'use client'
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react"

export function Header() {
  
  return (
    <header className="px-2 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => console.log('is Open')}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="text-2xl font-bold">Monokera</div>
      </div>
      <div className="text-sm">Public Technical Interview</div>
    </header>
  )
}