import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteReviewById,
  getreviewById,
  updateReviewById,
} from '../../../../databasa/reviews';

const reviewType = z.object({
  content: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const reviewId = Number(params.reviewId);

  if (!reviewId) {
    return NextResponse.json(
      {
        error: 'Review id is not valid',
      },
      { status: 400 },
    );
  }

  const singleReview = await getreviewById(reviewId);

  return NextResponse.json({ review: singleReview });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const reviewId = Number(params.reviewId);

  if (!reviewId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const singleReview = await deleteReviewById(reviewId);

  return NextResponse.json({ review: singleReview });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const reviewId = Number(params.reviewId);

  if (!reviewId) {
    return NextResponse.json(
      {
        error: 'review id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = reviewType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing the needed property content',
      },
      { status: 400 },
    );
  }

  const newReview = await updateReviewById(reviewId, result.data.content);

  return NextResponse.json({ review: newReview });
}
