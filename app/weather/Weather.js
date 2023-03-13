'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WeatherCard(props) {
  // seting state for api data
  const [apiData, setApiData] = useState([]);
  const [randomArray, setRandomArray] = useState([]);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Vienna&appid=${props.apiKey}`;

  // parsing json so I can use it as a js object and render data on a page
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch(() => alert('error'));
  }, [url]);

  const currentTemp = apiData.main?.temp - 273;

  return (
    <main>
      <h1> {apiData.name}</h1>
      <h2>{Math.round(apiData.main?.temp - 273)}°C</h2>
      <p>Humidity: {apiData.main?.humidity}%</p>
      <section>
        <div className="tempMaxMin">
          <p>High: {Math.round(apiData.main?.temp_max - 273)}°C</p>
        </div>
        <div className="tempMaxMin">
          <p>Low: {Math.round(apiData.main?.temp_min - 273)}°C</p>
        </div>
      </section>
      <section>
        {currentTemp < 10 && (
          <div>
            {props.indoorPlaces.map((place) => {
              return (
                <div key={`product-${place.id}`}>
                  <p>{place.placeName}</p>
                  <p>{place.placeAdress}</p>
                </div>
              );
            })}
          </div>
        )}
        {currentTemp > 10 && (
          <div>
            It seems like the weather is nice. Check out these places:
            {props.outdoorPlaces.map((place) => {
              return (
                <div key={`place-${place.id}`}>
                  <Link href={`/allPlaces/${place.id}`}>
                    <p>{place.placeName}</p>
                    <p>{place.placeAdress}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
