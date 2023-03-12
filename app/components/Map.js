'use client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function Map(props) {
  // centering the map
  const position = [48.2042154830387, 16.368015018501982];

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: 500, width: 900 }}
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
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
