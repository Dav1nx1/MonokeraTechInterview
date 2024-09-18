import Image from "next/image";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { AtomIcon, GlobeIcon } from "lucide-react";
import { Character } from "@/types/Entities";
import { useRouter } from 'next/navigation';

type CharacterCardProps = {
  key: number;
  character: Character
}

export function CharacterCard({ key, character }: CharacterCardProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-2xl" key={key} onClick={() => handleRedirect()}>
      <Image
        src={character?.image}
        alt="Rick Sanchez"
        className="rounded-t-lg object-cover w-full aspect-[4/3]"
        width="400"
        height="300"
      />
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{character?.name}</CardTitle>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>{character?.status}</span>
          </div>
        </div>
        <div className="grid gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <AtomIcon className="w-4 h-4" />
            <span>{character?.species}</span>
          </div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4" />
            <span>{character?.location?.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}