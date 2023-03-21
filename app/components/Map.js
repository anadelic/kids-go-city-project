'use client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import Image from 'next/image';
import Link from 'next/link';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import styles from './map.module.scss';

export default function Map(props) {
  // centering the map
  const position = [48.2042154830387, 16.368015018501982];

  return (
    <div id="map" className="max-w-screen-lg rounded-lg shadow-2xl ">
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        className={styles.map}
        // whenCreated={setMap}
        animate={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright"'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.places.map((place) => (
          <Marker
            key={`place-${place.id}`}
            position={{ lat: place.latcoord, lng: place.longcoord }}
          >
            <Popup>
              {place.placeName}

              <br />
              {place.placeAdress}
              <br />
              <Link href={`/allPlaces/${place.id}`}>See the place</Link>
              <br />
              <Image
                src={place.imageUrl}
                alt="image for the place you can vistit"
                width="250"
                height="250"
                className="mask mask-circle"
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
