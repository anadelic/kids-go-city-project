import Image from 'next/image';
import { getPlaceById } from '../../../databasa/places';
import { getReviews } from '../../../databasa/reviews';
import DeleteReview from '../../components/DeleteReview';
import AddingPost from '../../components/ReviewForm';
import StarRating from '../../components/StarsRating';
import SinglePlaceMap from './singlePlaceMap';

export default async function SinglePlacePage(props) {
  const singlePlace = await getPlaceById(props.params.placeId);
  const reviews = await getReviews();
  const filteredReviews = reviews.filter(
    (review) => review.placeId === singlePlace.id,
  );

  return (
    <main>
      <Image
        src={singlePlace.imageUrl}
        alt="Image of a place"
        width="500"
        height="500"
      />
      <SinglePlaceMap places={singlePlace} />
      <h1>{singlePlace.placeName}</h1>
      <p>{singlePlace.placeDescription}</p>
      <p>{singlePlace.placeAdress}</p>

      <p>Leave a review:</p>
      <StarRating />
      <AddingPost singlePlace={singlePlace} />
      <h2>All reviews:</h2>
      {filteredReviews.map((review) => {
        return (
          <div key={`review-${review.id}`}>
            <h2>{review.title}</h2>
            <p>{review.reviewText}</p>

            <DeleteReview reviews={review} />
          </div>
        );
      })}
    </main>
  );
}
