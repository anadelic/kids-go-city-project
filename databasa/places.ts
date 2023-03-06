import { cache } from 'react';
import { sql } from './connect';

type Places = {
  id: number;
  placeName: string;
  placeAdress: string;
  imageUrl: string;
  placeDescription: string;
  userId: number;
  latCoord: string;
  longCoord: string;
};

// get all places
export const getPlaces = cache(async () => {
  const places = await sql<Places[]>`
    SELECT * FROM places
  `;

  return places;
});

// get a single place
export const getPlaceById = cache(async (id: number) => {
  const [place] = await sql<Places[]>`
    SELECT
      *
    FROM
      places
    WHERE
      id = ${id}
      `;

  return place;
});
