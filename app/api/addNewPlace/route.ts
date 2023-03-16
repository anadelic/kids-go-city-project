import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNewPlace, getPlaces, Places } from '../../../databasa/places';
import { getUserBySessionToken } from '../../../databasa/user';

const placeType = z.object({
  placeName: z.string(),
  placeAdress: z.string(),
  imageUrl: z.string(),
  placeDescription: z.string(),
  userId: z.number(),
  latCoord: z.number(),
  longCoord: z.number(),
  placeType: z.string(),
});

export type PlaceResponseBodyPost =
  | {
      error: string;
    }
  | {
      places: Places;
    };

export type PlaceResponseBodyGet =
  | {
      error: string;
    }
  | {
      places: Places[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PlaceResponseBodyPost>> {
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
    result.data.placeType,
  );
  if (!newPlace) {
    return NextResponse.json(
      {
        error: 'Place not created!',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ places: newPlace });
}

// getting places with limit and offset

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<PlaceResponseBodyGet>> {
//   // this should be a public api method (unprotected)
//   const { searchParams } = new URL(request.url);

//   const limit = Number(searchParams.get('limit'));
//   const offset = Number(searchParams.get('offset'));

//   if (!limit || !offset) {
//     return NextResponse.json(
//       {
//         error: 'Limit and Offset need to be passed as params',
//       },
//       { status: 400 },
//     );
//   }

//   const indoorPlaces = await getPlaces(limit, offset);

//   return NextResponse.json({ places: indoorPlaces });
// }
