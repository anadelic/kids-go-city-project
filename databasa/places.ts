import { cache } from 'react';
import { sql } from './connect';

export type Places = {
  placeName: string;
  placeAdress: string;
  imageUrl: string;
  placeDescription: string;
  userId: number;
  latCoord: number;
  longCoord: number;
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

export const createNewPlace = cache(
  async (
    placeName: string,
    placeAdress: string,
    imageUrl: string,
    placeDescription: string,
    userId: number,
    latcoord: number,
    longcoord: number,
  ) => {
    const [review] = await sql<Places[]>`
      INSERT INTO places
        (place_name, place_adress, image_url, place_description, user_id, latCoord, longCoord)
      VALUES
        (${placeName}, ${placeAdress}, ${imageUrl}, ${placeDescription}, ${userId}, ${latcoord}, ${longcoord})
      RETURNING *
    `;
    return review;
  },
);
