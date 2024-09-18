'use client';

import { useFetchCharacterById } from "@/useCases/fetchCharacterById";
import { CharacterContext } from '@/context/CharacterContext';
import Image from "next/image";
import { useContext } from "react";

import '../../styles/character.css'

export default function Page({ params }: { params: { id: number } }) {

  const { data, isLoading, error } = useFetchCharacterById(params?.id);
  const { addRecentlyViewed } = useContext(CharacterContext)!;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading character information</div>;
  
  if (data) {
    addRecentlyViewed(data); // Add to recently viewed when a user visits this page
  }

  return (
    <div className="character-page">
      <div className="character-page__container">
        <div className="character-page__image-wrapper">
          <Image
            src={data?.image ? data.image : '/images/placeholder.svg'}
            alt="Character Image"
            width={600}
            height={600}
            className="character-page__image"
          />
        </div>
        <div className="character-page__details">
          <div className="character-page__name">
            <h1 className="character-page__title">{data?.name}</h1>
          </div>
          <div className="character-page__info-grid">
            <div className="character-page__info-item">
              <h3 className="character-page__info-title">Status</h3>
              <p className="character-page__info-text">{data?.status}</p>
            </div>
            <div className="character-page__info-item">
              <h3 className="character-page__info-title">Species</h3>
              <p className="character-page__info-text">{data?.species}</p>
            </div>
            <div className="character-page__info-item">
              <h3 className="character-page__info-title">Gender</h3>
              <p className="character-page__info-text">{data?.gender}</p>
            </div>
            <div className="character-page__info-item">
              <h3 className="character-page__info-title">Origin</h3>
              <p className="character-page__info-text">{data?.origin?.name}</p>
            </div>
          </div>
          <div className="character-page__location">
            <h3 className="character-page__info-title">Location</h3>
            <p className="character-page__info-text">{data?.location?.name}</p>
          </div>
          <div className="character-page__episodes">
            <h3 className="character-page__info-title">Episode Appearances</h3>
            <ul className="character-page__episode-list">
              {data?.episode?.map((episode: string, index: number) => (
                <li key={index} className="character-page__episode-item">{`Episode ${index + 1}: ${episode}`}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
