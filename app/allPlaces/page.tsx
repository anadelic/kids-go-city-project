import Image from 'next/image';
import Link from 'next/link';
import { getPlaces } from '../../databasa/places';
import Map from './Map';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'KidsGoCity|Places',
  description: 'Here you can find your fun for today',
};

export default async function AllPlacesPage() {
  const places = await getPlaces();
  return (
    <main>
      <h1>Search and view our places</h1>
      <label>
        Search: <input placeholder="search places" />
      </label>
      <section>
        <Map places={places} />;
        {places.map((place) => {
          return (
            <div key={`product-${place.id}`}>
              <Link href={`/allPlaces/${place.id}`}>
                <Image
                  src={`/images/${place.id}.jpg`}
                  alt="image for the place you can visti"
                  width="250"
                  height="250"
                />
                <p>{place.placeName}</p>

                <button>Add to favorite</button>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
