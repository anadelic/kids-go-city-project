import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createReview } from '../../../databasa/reviews';

const reviewType = z.object({
  title: z.string(),
  reviewText: z.string(),
  starRating: z.string(),
  placeId: z.number(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = reviewType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error: 'Please add title and review text',
      },
      { status: 400 },
    );
  }

  const newReview = await createReview(
    result.data.title,
    result.data.reviewText,
    result.data.starRating,
    result.data.placeId,
  );

  return NextResponse.json({ reviews: newReview });
}
