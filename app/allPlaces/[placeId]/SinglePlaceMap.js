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
  const position = [props.places.latcoord, props.places.longcoord];

  return (
    <div>
      <MapContainer
        className="rounded-md shadow-x "
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: 350, width: 350 }}
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
