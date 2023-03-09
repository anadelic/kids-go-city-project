import Image from 'next/image';
import Link from 'next/link';
import { getPlaces } from '../../databasa/places';
import Map from './Map';
import styles from './places.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vienna with little ones: A Guide for Parents and Kids',
  description:
    "Discover the best family-friendly places in Vienna with our comprehensive guide. From parks and museums to kid-friendly restaurants and activities, we've got you covered.",
};

export default async function AllPlacesPage() {
  // getting all places from the database
  const places = await getPlaces();
  return (
    <main className={styles.main}>
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
                  src={place.imageUrl}
                  alt="image for the place you can visti"
                  width="250"
                  height="250"
                />
                <p>{place.placeName}</p>
                <p>{place.placeAdress}</p>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
