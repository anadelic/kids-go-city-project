import { NextRequest, NextResponse } from 'next/server';
import { getOutdoorPlaces, Places } from '../../../databasa/places';

export type PlaceResponseBodyGet =
  | {
      error: string;
    }
  | {
      places: Places[];
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PlaceResponseBodyGet>> {
  // this should be a public api method (unprotected)
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  const outdoorPlaces = await getOutdoorPlaces(limit, offset);

  return NextResponse.json({ places: outdoorPlaces });
}
