'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddingPost(props) {
  const [placeName, setPlaceName] = useState('');
  const [placeAdress, setPlaceAdress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [latCoord, setLatCoord] = useState('');
  const [longCoord, setLongCoord] = useState('');
  const [errors, setErrors] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        // Making a post request on submit
        const response = await fetch('/api/reviews/', {
          method: 'POST',
          body: JSON.stringify({
            placeName: '',
            placeAdress: '',
            imageUrl: '',
            placeDescription: '',
            userId: '',
            latCoord: '',
            longCoord: '',
          }),
        });

        const data = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }
      }}
    >
      {/* Input for review Title*/}
      <label>
        Name:
        <input
          value={placeName}
          onChange={(event) => setPlaceName(event.currentTarget.value)}
        />
      </label>
      {/* Input for review text*/}
      <label>
        Description:
        <textarea
          cols={30}
          rows={3}
          value={placeDescription}
          onChange={(event) => setPlaceDescription(event.currentTarget.value)}
        />
      </label>

      <label>
        Adress:
        <input
          value={placeAdress}
          onChange={(event) => setPlaceAdress(event.currentTarget.value)}
        />
      </label>

      <label>
        Choose an image:
        <input
          type="file"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.currentTarget.value)}
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
