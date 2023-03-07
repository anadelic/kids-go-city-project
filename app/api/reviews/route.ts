import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createReview } from '../../../databasa/reviews';
import { getUserBySessionToken } from '../../../databasa/user';

const reviewType = z.object({
  title: z.string(),
  reviewText: z.string(),
  starRating: z.string(),
  userId: z.number(),
  placeId: z.number(),
  userName:z.string()
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = reviewType.safeParse(body);
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

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
    result.data.userId,
    result.data.placeId,
    result.data.userName,
  );

  return NextResponse.json({ reviews: newReview });
}
