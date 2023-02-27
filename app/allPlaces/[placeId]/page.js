import Image from 'next/image';
import { getPlaceById } from '../../../databasa/places';
import StarRating from '../../components/starsRating';
import SinglePlaceMap from './singlePlaceMap';

export default async function SinglePlacePage(props) {
  const singlePlace = await getPlaceById(props.params.placeId);

  console.log(singlePlace);

  return (
    <main>
      <Image
        src={`/images/${singlePlace?.id}.jpg`}
        alt="Image of a toy"
        width="500"
        height="500"
      />
      <SinglePlaceMap places={singlePlace} />
      <h1>{singlePlace.placeName}</h1>
      <p>{singlePlace.placeDescription}</p>
      <StarRating />
      <p>Leave a review</p>
      <label>
        Review text: <input />
      </label>
      <button>Submit</button>
      <h2>All reviews</h2>
    </main>
  );
}
