'use client'

import { useFetchCharacterById } from "@/useCases/fetchCharacterById";
import { CharacterContext } from '@/context/CharacterContext'
import Image from "next/image";
import { useContext } from "react";

export default function Page({ params }: { params: { id: number } }) {

  const { data, isLoading, error } = useFetchCharacterById(params?.id)
  const { addRecentlyViewed } = useContext(CharacterContext)!;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading characters</div>;
  
  if (data) {
    addRecentlyViewed(data); // Add to recently viewed when a user visits this page
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background rounded-lg overflow-hidden">
          <Image
            src={data?.image ? data.image : '/images/placeholder.svg'}
            alt="Character Image"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{data?.name}</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Status</h3>
              <p className="text-muted-foreground">{data?.status}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Species</h3>
              <p className="text-muted-foreground">{data?.species}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Gender</h3>
              <p className="text-muted-foreground">{data?.gender}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Origin</h3>
              <p className="text-muted-foreground">{data?.origin?.name}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-muted-foreground">{data?.location?.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Episode Appearances</h3>
            <ul className="space-y-2 text-muted-foreground">
              { data?.episode?.map( (episode: string, index: number) => {
                return (
                  <li key={index}>{`Episode ${index}: ${episode}`}</li>
                )
              }) }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}