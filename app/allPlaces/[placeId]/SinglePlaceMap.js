'use client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
// import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { Marker, Popup } from 'react-leaflet';
// import { useMap } from 'react-leaflet/hooks';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function SinglePlaceMap(props) {
  const position = [48.2042154830387, 16.368015018501982];

  return (
    <div>
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: 200, width: 500 }}
        // whenCreated={setMap}
        animate={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright"'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={{
            lat: props.places.latcoord,
            lng: props.places.longcoord,
          }}
        >
          <Popup>{props.places.placeName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
