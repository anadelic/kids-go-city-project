'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddingNewPlace(props) {
  const [placeName, setPlaceName] = useState('');
  const [placeAdress, setPlaceAdress] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [errors, setErrors] = useState('');
  const [apiData, setApiData] = useState([]);
  const router = useRouter();

  // fetching coordinates from mapbox api
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${props.myKey}`,
      )
        .then((res) => res.json())
        .then((res) => res.features[1].geometry.coordinates)
        .then((res) => setApiData(res))
        .catch(() => console.log('Error'));
    }, 700);
    return () => clearTimeout(timer);
  }, [placeName, props.myKey]);
  console.log(apiData);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const response = await fetch('/api/addNewPlace/', {
          method: 'POST',
          body: JSON.stringify({
            placeName: placeName,
            placeDescription: placeDescription,
            placeAdress: placeAdress,
            latCoord: apiData[1],
            longCoord: apiData[0],
            imageUrl: '',
            userId: props.user.id,
          }),
        });

        const data = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }
      }}
    >
      <label>
        Name:
        <input
          value={placeName}
          onChange={(event) => setPlaceName(event.currentTarget.value)}
        />
      </label>

      <label>
        Description:
        <textarea
          cols={30}
          rows={3}
          value={placeDescription}
          onChange={(event) => setPlaceDescription(event.currentTarget.value)}
        />
      </label>

      <button
        onClick={() => {
          router.refresh();
        }}
      >
        Add a place
      </button>
    </form>
  );
}
