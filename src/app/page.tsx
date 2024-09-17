import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/SearchInput";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Rick and Morty</h1>
        <p className="text-gray-400 mb-8 text-sm md:text-base">Monokera Technical Interview.</p>

        {/* Subscription notice */}
        <div className="w-full max-w-2xl mb-4 flex flex-col md:flex-row justify-between items-center bg-gray-800 rounded-lg p-2">
          <span className="text-sm text-gray-300 mb-2 md:mb-0">Created by Oscar Corcho.</span>
          <Button variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-400/10">
            Contact Me
          </Button>
        </div>

        {/* Input field */}
        <div className="w-full max-w-2xl relative">
          <SearchInput />
        </div>
    </div>
  );
}
