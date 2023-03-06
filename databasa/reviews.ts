import { cache } from 'react';
import { sql } from './connect';

type Review = {
  id: number;
  title: string;
  reviewText: string;
  starRating: string;
  userId: number;
  placeId: number;
  createdAt: Date;
};

export const getReviews = cache(async () => {
  const reviews = await sql<Review[]>`
    SELECT * FROM reviews
  `;

  return reviews;
});

export const getReviewsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const reviews = await sql<Review[]>`
    SELECT * FROM reviews
    Limit ${limit}
    offset ${offset}
  `;

    return reviews;
  },
);

export const getreviewById = cache(async (placeId: number) => {
  const [review] = await sql<Review[]>`
    SELECT
      *
    FROM
      reviews
    WHERE
      id = ${placeId}
  `;
  return review;
});

export const createReview = cache(
  async (
    title: string,
    reviewText: string,
    starRating: string,
    placeId: number,
  ) => {
    const [review] = await sql<Review[]>`
      INSERT INTO reviews
        (title, review_text, star_rating, place_id)
      VALUES
        (${title}, ${reviewText}, ${starRating}, ${placeId})
      RETURNING *
    `;
    return review;
  },
);

export const updateReviewById = cache(async (id: number, body: string) => {
  const [review] = await sql<Review[]>`
      UPDATE
        reviews
      SET
        body = ${body}
      WHERE
        id = ${id}
      RETURNING *
    `;
  return review;
});

export const deleteReviewById = cache(async (id: number) => {
  const [review] = await sql<Review[]>`
    DELETE FROM
      reviews
    WHERE
      id = ${id}
    RETURNING *
  `;
  return review;
});
