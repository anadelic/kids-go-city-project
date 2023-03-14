import { getIndoorPlaces, getOutdoorPlaces } from '../../databasa/places';
import WeatherCard from './Weather';

export default async function WeatherPage() {
  const indoorPlaces = await getIndoorPlaces();
  const outdoorPlaces = await getOutdoorPlaces();
  const apiKey = process.env.REACT_APP_API_KEY;

  // array shuffle function from stackoverflow

  return (
    <main className="min-h-screen">
      <div
        className=" hero h-screen"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/df7205fx8/image/upload/v1678739076/myproject/annadelik_weather_page_family_city_guide_modern_fun_clean_desig_4ab8fd82-9898-413c-b1a6-9e53c5d2a039_nzllew.png")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Weather in Vienna</h1>
            <p className="mb-5 text-3xl">
              The weather in Vienna is typical continental - there are
              characteristic, clearly defined seasons. Hot summers with an
              occasional day of rain and the cold winters mean that the "right"
              clothing is essential. The temperature is pleasant in the spring
              and autumn, but there can be a cool wind to chill the air.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mt-8">
        Check the weather for today
      </h2>
      <section className="text-center items-center mt-8">
        <WeatherCard
          indoorPlaces={indoorPlaces}
          outdoorPlaces={outdoorPlaces}
          apiKey={apiKey}
        />
      </section>
    </main>
  );
}
