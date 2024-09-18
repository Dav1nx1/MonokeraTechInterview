'use client'
import { ArrowLeft, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname()
  return (
    <aside className="fixed md:flex items-center py-4 border-gray-800 inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <Button variant="ghost" size="icon" className="mb-4">
        {
          pathname.includes('character') ? <ArrowLeft className="h-6 w-6" onClick={() => router.back()}/> : <h1 className="font-bold text-2xl">M</h1>
        }
      </Button>
    </aside>
  )
}