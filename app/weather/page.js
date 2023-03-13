import { getIndoorPlaces, getOutdoorPlaces } from '../../databasa/places';
import WeatherCard from './Weather';

export default async function WeatherPage() {
  const indoorPlaces = await getIndoorPlaces();
  const outdoorPlaces = await getOutdoorPlaces();
  const apiKey = process.env.REACT_APP_API_KEY;

  // array shuffle function from stackoverflow

  return (
    <div>
      <WeatherCard
        indoorPlaces={indoorPlaces}
        outdoorPlaces={outdoorPlaces}
        apiKey={apiKey}
      />
    </div>
  );
}
