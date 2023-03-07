import { cookies } from 'next/headers';
import Image from 'next/image';
import { getPlaceById } from '../../../databasa/places';
import { getReviews } from '../../../databasa/reviews';
import { getUserBySessionToken } from '../../../databasa/user';
import DeleteReview from '../../components/DeleteReview';
import AddingPost from '../../components/ReviewForm';
import StarRating from '../../components/StarsRating';
import SinglePlaceMap from './singlePlaceMap';

export default async function SinglePlacePage(props) {
  // getting single place from database
  const singlePlace = await getPlaceById(props.params.placeId);
  // getting all reviews and filter them to a reviews for a single place
  const reviews = await getReviews();

  const filteredReviews = reviews.filter(
    (review) => review.placeId === singlePlace.id,
  );

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

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

      {user && <p>Leave a review:</p>}
      {user && <StarRating />}
      {user && <AddingPost singlePlace={singlePlace} user={user} />}
      <h2>All reviews:</h2>
      {filteredReviews.map((review) => {
        return (
          <div key={`review-${review.id}`}>
            <h2>{review.title}</h2>
            <p>{review.reviewText}</p>
            <p>created by: {review.userName}</p>
            <DeleteReview reviews={review} user={user} />
          </div>
        );
      })}
    </main>
  );
}
