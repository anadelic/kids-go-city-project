import { cache } from 'react';
import { sql } from './connect';

export type Places = {
  id: number;
  placeName: string;
  placeAdress: string;
  imageUrl: string;
  placeDescription: string;
  userId: number;
  latCoord: number;
  longCoord: number;
  placeType: string;
};

// get all places from database
export const getPlaces = cache(async () => {
  const places = await sql<Places[]>`
    SELECT * FROM places
  `;

  return places;
});

// get a place by ID from database

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

// query for creating a new Place. I need this for being able to let user too add a new place

export const createNewPlace = cache(
  async (
    placeName: string,
    placeAdress: string,
    imageUrl: string,
    placeDescription: string,
    userId: number,
    latcoord: number,
    longcoord: number,
    placeType: string,
  ) => {
    const [review] = await sql<Places[]>`
      INSERT INTO places
        (place_name, place_adress, image_url, place_description, user_id, latCoord, longCoord, place_type)
      VALUES
        (${placeName}, ${placeAdress}, ${imageUrl}, ${placeDescription}, ${userId}, ${latcoord}, ${longcoord}, ${placeType})
      RETURNING *
    `;
    return review;
  },
);

// query for deleting a place by Id

export const deletePlaceById = cache(async (id: number) => {
  const [place] = await sql<Places[]>`
    DELETE FROM
      places
    WHERE
      id = ${id}
    RETURNING *
  `;
  return place;
});

// getting indoor places with WHERE filtering

export const getIndoorPlaces = cache(async (limit: number, offset: number) => {
  const places = await sql<Places[]>`
    SELECT
    *
    FROM
    places
    WHERE
    place_type = 'indoor'
    Limit ${limit}
    offset ${offset}
  `;

  return places;
});

// getting outdoor places with WHERE filtering

export const getOutdoorPlaces = cache(async () => {
  const places = await sql<Places[]>`
    SELECT
    *
    FROM

    places

    WHERE

    place_type = 'outdoor'
  `;

  return places;
});
