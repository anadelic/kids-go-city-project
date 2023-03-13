// import Map from './components/Map';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaces } from '../databasa/places';

export const metadata = {
  title: 'Vienna with little ones: A Guide for Parents and Kids',
  description:
    "Discover the best family-friendly places in Vienna with our comprehensive guide. From parks and museums to kid-friendly restaurants and activities, we've got you covered.",
};

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default async function Home() {
  const places = await getPlaces();
  return (
    <main className="container mx-auto py-4">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/df7205fx8/image/upload/v1678623976/annadelik_a_city_guide_for_families_and_kids_fun_clean_design_m_ca7022e3-c9a0-426f-936b-c8322bbfb22f_h8hnfj.png")',
        }}
      >
        <div className="hero-overlay bg-opacity-40" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Vienna with little ones</h1>
            <p className="mb-5">
              Welcome to Vienna with little ones <br />
              Feel free to share your favorite places and comment on others!
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-md mt-16 ">
        <h2 className="mb-5 text-5xl font-bold justify-self-center">
          Discover Vienna
        </h2>
      </div>
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
        <div className="rounded-lg shadow-lg p-4 sm:col-span-2 lg:col-span-3 grid-row span-full justify-self-center ">
          <Map places={places} />
        </div>
        {places.map((place) => {
          return (
            <div
              key={`product-${place.id}`}
              className="bg-white rounded-lg shadow-lg p-4 mt-16 w-auto"
            >
              <Link href={`/allPlaces/${place.id}`}>
                <Image
                  src={place.imageUrl}
                  alt="image for the place you can vistit"
                  width="250"
                  height="250"
                  className="rounded-lg"
                />
                <p className="mt-2 text-lg font-medium text-gray-800">
                  {place.placeName}
                </p>
                <p className="text-sm text-gray-600">{place.placeAdress}</p>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
