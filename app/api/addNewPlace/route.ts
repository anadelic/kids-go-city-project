import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNewPlace } from '../../../databasa/places';
import { getUserBySessionToken } from '../../../databasa/user';

const placeType = z.object({
  placeName: z.string(),
  placeAdress: z.string(),
  imageUrl: z.string(),
  placeDescription: z.string(),
  userId: z.number(),
  latCoord: z.string(),
  longCoord: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = placeType.safeParse(body);
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

  const newPlace = await createNewPlace(
    result.data.placeName,
    result.data.placeAdress,
    result.data.imageUrl,
    result.data.placeDescription,
    result.data.userId,
    result.data.latCoord,
    result.data.longCoord,
  );

  return NextResponse.json({ places: newPlace });
}
