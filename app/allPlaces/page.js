import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const mapBoxToken = process.env.MAP_BOX_TOKEN;
const geoCoder = mbxGeocoding({
  accessToken: mapBoxToken,
});

export default function PlacesPage() {
  geoCoder
    .forwardGeocode({
      query: 'Dschungel, Wien',
      limit: 1,
    })
    .send()
    .then((response) => {
      const match = response.body;

      console.log(match);
    });

  return (
    <>
      <h1>here is a page with all places</h1>;
      <br />
      <br />
      <h2> here is a map with place's pins</h2>
      <br />
      <br />
      <h3> here is a list of places sorted in categories </h3>
    </>
  );
}
