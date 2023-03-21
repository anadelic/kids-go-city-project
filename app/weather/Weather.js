'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WeatherCard(props) {
  // seting state for api data
  const [apiData, setApiData] = useState([]);
  const [indoorPlaces, setIndoorPlaces] = useState(props.indoorPlaces);
  const [outdoorPlaces, setOutdoorPlaces] = useState(props.outdoorPlaces);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Vienna&appid=${props.apiKey}`;

  // parsing json so I can use it as a js object and render data on a page
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch(() => alert('error'));
  }, [url]);

  const currentTemp = apiData.main?.feels_like - 273;

  return (
    <main>
      {/* Getting information about the weather from api response */}
      <section className="flex justify-center items-center my-12">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body bg-three text-white text-xl rounded-lg font-poppins hover:scale-125 transition duration-700 ease-in-out">
            <h2 className="card-title text-3xl">{apiData.name}</h2>
            <p>{Math.round(apiData.main?.temp - 273)}°C</p>
            <p>Feels like: {Math.round(apiData.main?.feels_like - 273)}°C</p>
            <p>Humidity: {apiData.main?.humidity}%</p>
            <p>Wind: {apiData.wind?.speed}km/h</p>
            <p>Clouds: {apiData.clouds?.all}%</p>
            <div className="card-actions justify-end">
              <p>High: {Math.round(apiData.main?.temp_max - 273)}°C</p>
              <p>Low: {Math.round(apiData.main?.temp_min - 273)}°C</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* Using conditional operatorIf  to display just outdoor places if temp is more than 10 degrees, otherwise display indoor places */}
        {currentTemp > 10 ? (
          <div className="text-xl py-1 font-poppins mt-16 font-medium">
            Hey {!props.user ? 'stranger' : props.user.username}! It seems like
            the weather is nice today! Check out these places:
            {outdoorPlaces.map((place) => {
              return (
                <div key={`place-${place.id}`} className="text-xl py-1">
                  <Link
                    href={`/allPlaces/${place.id}`}
                    className="link link-hover"
                  >
                    <p>{place.placeName}</p>
                    <p>{place.placeAdress}</p>
                  </Link>
                </div>
              );
            })}
            <button
              className="btn bg-brick font-poppins my-12 border-white "
              onClick={async () => {
                const placeCount = outdoorPlaces.length;
                console.log(placeCount);
                const response = await fetch(
                  `/api/outdoorPlaces?limit=2&offset=${placeCount}`,
                );

                const data = await response.json();
                console.log(outdoorPlaces);

                setOutdoorPlaces([...outdoorPlaces, ...data.places]);
              }}
            >
              Show more outdoor places
            </button>
          </div>
        ) : (
          <div className="text-xl py-1 font-poppins mt-16 font-medium">
            Hey {!props.user ? 'stranger' : props.user.username}! It seems like
            it might be cold today! Check out these places:
            {indoorPlaces.map((place) => {
              return (
                <div key={`place-${place.id}`} className="text-xl py-1">
                  <Link
                    href={`/allPlaces/${place.id}`}
                    className="link link-hover"
                  >
                    <p>{place.placeName}</p>
                    <p>{place.placeAdress}</p>
                  </Link>
                </div>
              );
            })}
            <button
              className="btn bg-brick font-poppins my-12 border-white text-white"
              onClick={async () => {
                const placeCount = indoorPlaces.length;

                const response = await fetch(
                  `/api/indoorPlaces?limit=2&offset=${placeCount}`,
                );

                const data = await response.json();

                setIndoorPlaces([...indoorPlaces, ...data.places]);
              }}
            >
              Show more indoor places
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
