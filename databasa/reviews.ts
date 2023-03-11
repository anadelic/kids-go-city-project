import { cache } from 'react';
import { sql } from './connect';

export type Review = {
  title: string;
  reviewText: string;
  userId: number;
  placeId: number;
  userName: string;
};

export const getReviews = cache(async () => {
  const reviews = await sql<Review[]>`
    SELECT
    id,
    title,
    review_text,
    user_id,
    place_id,
    user_name

     FROM reviews
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
    userId: number,
    placeId: number,
    userName: string,
  ) => {
    const [review] = await sql<Review[]>`
      INSERT INTO reviews
        (title, review_text, star_rating, user_id, place_id, user_name)
      VALUES
        (${title}, ${reviewText}, ${starRating}, ${userId}, ${placeId}, ${userName})
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
