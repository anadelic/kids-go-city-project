'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WeatherCard(props) {
  // seting state for api data
  const [apiData, setApiData] = useState([]);

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
      <section className="flex justify-center items-center my-12">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body bg-second text-white text-xl rounded-lg">
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
        {currentTemp > 10 ? (
          <div className="text-xl py-1">
            Hey! It seems like the weather is nice today! Check out these
            places:
            {props.outdoorPlaces.map((place) => {
              return (
                <div key={`place-${place.id}`} className="text-xl py-1">
                  <Link href={`/allPlaces/${place.id}`}>
                    <p>{place.placeName}</p>
                    <p>{place.placeAdress}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xl py-1">
            Hey! It seems like it might be cold today! Check out these places:
            {props.indoorPlaces.map((place) => {
              return (
                <div key={`product-${place.id}`} className="text-xl py-1">
                  <p>{place.placeName}</p>
                  <p>{place.placeAdress}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
