import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  deleteReviewById,
  getreviewById,
  Review,
} from '../../../../databasa/reviews';
import { getUserBySessionToken } from '../../../../databasa/user';

export type ReviewResponseBodyGet =
  | {
      error: string;
    }
  | {
      review: Review;
    };

export type ReviewResponseBodyDelete =
  | {
      error: string;
    }
  | {
      review: Review;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ReviewResponseBodyGet>> {
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
): Promise<NextResponse<ReviewResponseBodyDelete>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }
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
