'use client'

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Character } from "@/types/Entities";
import { useRouter } from 'next/navigation';
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Memoize the redirect function to avoid re-creating it on every render
  const handleRedirect = useCallback(() => {
    router.push(`/character/${character.id}`);
  }, [character.id, router]);

  // Memoize hover handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <Card
      className={`w-full max-w-sm transition-all duration-300 ${
        isHovered ? 'shadow-lg shadow-primary/50 scale-105' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article" // Adding role for accessibility
      aria-label={`Character card for ${character.name}`}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg ">
        <Image
          src={character?.image}
          alt={`Image of ${character?.name}`}
          className="w-full h-full object-cover"
          width="400"
          height="300"
          loading="lazy" // Lazy loading for performance
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <h2 className="text-xl font-bold text-white" aria-live="polite">{character?.name}</h2>
          <Badge
            variant="secondary"
            className={cn(
              `mt-1`,
              character?.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'
            )}
            aria-label={`Status: ${character?.status}`}
          >
            {character?.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 h-[100px]">
        <p className="text-sm text-muted-foreground">Species: {character?.species}</p>
        <p className="text-sm text-muted-foreground">Location: {character?.location?.name}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleRedirect} aria-label={`View details for ${character.name}`}>
          View Details
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
