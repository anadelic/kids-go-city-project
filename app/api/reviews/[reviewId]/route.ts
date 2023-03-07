import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteReviewById, getreviewById } from '../../../../databasa/reviews';

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