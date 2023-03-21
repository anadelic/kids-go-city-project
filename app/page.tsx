// import Map from './components/Map';
import dynamic from 'next/dynamic';
import {
  getIndoorPlacesWithoutOffsetAndLimit,
  getOutdoorPlacesWithoutOffsetAndLimit,
  getPlaces,
} from '../databasa/places';
import SelectForm from './components/FilteredPlaces';

// export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vienna with little ones: A Guide for Parents and Kids',
  description:
    "Discover the best family-friendly places in Vienna with our comprehensive guide. From parks and museums to kid-friendly restaurants and activities, we've got you covered.",
};

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default async function Home() {
  const places = await getPlaces();
  const indoorPlaces = await getIndoorPlacesWithoutOffsetAndLimit();
  const outdoorPlaces = await getOutdoorPlacesWithoutOffsetAndLimit();
  return (
    <main className="container mx-auto py-4  w-full">
      <header
        className="hero h-large"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/df7205fx8/image/upload/v1679061478/annadelik_a_city_guide_for_families_and_kids_fun_clean_design_m_ca7022e3-c9a0-426f-936b-c8322bbfb22f_zx4gpd.png")',
        }}
      >
        <div className="hero-overlay bg-opacity-40 " />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-5xl font-bold font-amatic">
              Welcome to Vienna with little ones
            </h1>
            <p className="mb-5 font-amatic text-3xl font-bold">
              Feel free to share your favorite places <br /> and comment on
              others!
            </p>
          </div>
        </div>
      </header>
      <div className=" mt-8 flex justify-center items-center ">
        <h2 className="m-8 text-5xl font-bold font-amatic text-6xl">
          Discover Vienna
        </h2>
      </div>

      <div className="flex justify-center items-center">
        <Map places={places} />
      </div>
      <div className="mt-16 font-poppins">
        <SelectForm outdoor={outdoorPlaces} indoor={indoorPlaces} />
      </div>
    </main>
  );
}
