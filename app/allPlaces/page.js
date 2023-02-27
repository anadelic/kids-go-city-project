import { getPlaces } from '../../databasa/places';
import Map from './map';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'KidsGoCity|Places',
  description: 'Here you can find your fun for today',
};

export default async function AllPlacesPage() {
  const places = await getPlaces();
  return (
    <div>
      <Map places={places} />;
      <div>
        {places.map((place) => {
          return (
            <div key={`product-${place.id}`}>
              <h2>{place.placeName}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
