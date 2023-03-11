import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deletePlaceById, Places } from '../../../../databasa/places';
import { getUserBySessionToken } from '../../../../databasa/user';

export type ReviewResponseBodyDelete =
  | {
      error: string;
    }
  | {
      place: Places;
    };

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
  const newPlaceId = Number(params.addNewPlaceId);

  if (!newPlaceId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const singlePlace = await deletePlaceById(newPlaceId);

  if (!singlePlace) {
    return NextResponse.json(
      {
        error: 'Place not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ place: singlePlace });
}
