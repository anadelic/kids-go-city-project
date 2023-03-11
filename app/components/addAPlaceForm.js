'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddingNewPlace(props) {
  const [placeName, setPlaceName] = useState('');
  const [placeAdress, setPlaceAdress] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [errors, setErrors] = useState('');
  const [apiData, setApiData] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const router = useRouter();

  // fetching coordinates from mapbox api
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeAdress}.json?access_token=${props.myKey}`,
      )
        .then((res) => res.json())
        .then((res) => res.features[1].geometry.coordinates)
        .then((res) => setApiData(res))
        .catch(() => console.log('Error'));
    }, 700);
    return () => clearTimeout(timer);
  }, [placeAdress, props.myKey]);

  // upload an imge to cloudinary

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'ml_default');

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${props.myCloud}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <div>
          <label>
            Choose an image:
            <input
              type="file"
              name="file"
              className="file-input file-input-bordered file-input-xs w-full max-w-xs"
            />
          </label>
        </div>
        <button className="btn btn-sm">Upload</button>
        <p>{uploadData && <p> Your image is uploaded</p>}</p>
      </form>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/addNewPlace/', {
            method: 'POST',
            body: JSON.stringify({
              placeName: placeName,
              placeAdress: placeAdress,
              imageUrl: imageSrc,
              placeDescription: placeDescription,
              userId: props.user.id,
              latCoord: apiData[1],
              longCoord: apiData[0],
            }),
          });

          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }
        }}
      >
        <div>
          <label>
            Name:
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              value={placeName}
              onChange={(event) => setPlaceName(event.currentTarget.value)}
            />
          </label>

          <label>
            Description:
            <textarea
              className="textarea textarea-bordered"
              value={placeDescription}
              onChange={(event) =>
                setPlaceDescription(event.currentTarget.value)
              }
            />
          </label>

          <label>
            Adress:
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              value={placeAdress}
              onChange={(event) => setPlaceAdress(event.currentTarget.value)}
            />
          </label>
        </div>

        <button
          onClick={() => {
            router.refresh();
          }}
          className="btn btn-sm"
        >
          Add a place
        </button>
      </form>
    </div>
  );
}
