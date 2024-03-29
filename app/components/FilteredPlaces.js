'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SelectForm(props) {
  const [placeType, setPlaceType] = useState('indoor');

  return (
    <div>
      <div className="flex justify-center items-center">
        <select
          tabIndex={0}
          value={placeType}
          onChange={(e) => {
            setPlaceType(e.target.value);
          }}
          className="select select-bordered w-full max-w-xs bg-white"
        >
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>
      <div className="flex justify-center items-center">
        {placeType === 'outdoor' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {props.outdoor.map((place) => {
              return (
                <div
                  key={`product-${place.id}`}
                  className="bg-white rounded-lg shadow-lg p-3 m-10 w-auto"
                >
                  <Link tabIndex={0} href={`/allPlaces/${place.id}`}>
                    <Image
                      src={place.imageUrl}
                      alt="image for the place you can vistit"
                      width="250"
                      height="250"
                      className="rounded-lg"
                    />
                    <div>
                      <p className="mt-2 text-lg font-medium text-gray-800 font-poppins">
                        {place.placeName}
                      </p>
                      <p className="text-sm text-gray-600 font-poppins">
                        {place.placeAdress}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {props.indoor.map((place) => {
              return (
                <div
                  key={`product-${place.id}`}
                  className="bg-white rounded-lg shadow-lg p-4 mt-16 w-auto flex justify-center items-center"
                >
                  <Link tabIndex={0} href={`/allPlaces/${place.id}`}>
                    <Image
                      src={place.imageUrl}
                      alt="image for the place you can vistit"
                      width="250"
                      height="250"
                      className="rounded-lg"
                    />
                    <p className="mt-2 text-lg font-medium text-gray-800 font-poppins">
                      {place.placeName}
                    </p>
                    <p className="text-sm text-gray-600 font-poppins">
                      {place.placeAdress}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
