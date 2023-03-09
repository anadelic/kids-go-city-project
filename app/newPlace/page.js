import AddingNewPlace from '../components/AddAPlaceForm';

export default function NewPlacd() {
  const myKey = process.env.MAPBOX_API_KEY;

  return <AddingNewPlace myKey={myKey} />;
}
