import { cache } from 'react';
import { sql } from './connect';

// get all places
export const getPlaces = cache(async () => {
  const places = await sql`
    SELECT * FROM places
  `;

  return places;
});

// get a single place
export const getPlaceById = cache(async (id) => {
  const [place] = await sql`
    SELECT
      *
    FROM
      places
    WHERE
      id = ${id}
      `;

  return place;
});
