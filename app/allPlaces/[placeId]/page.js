// import SinglePlaceMap from './singlePlaceMap';
// import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { getPlaceById } from '../../../databasa/places';
import { getReviews } from '../../../databasa/reviews';
import { getUserBySessionToken } from '../../../databasa/user';
import Filter from '../../../utils/filterReviews';
import DeletePlace from '../../components/DeletePlace';
import DeleteReview from '../../components/DeleteReview';
import AddingPost from '../../components/ReviewForm';
import SinglePlaceMap from './SinglePlaceMap';

// export const dynamic = 'force-dynamic';

// const singlePlaceMap = dynamic(() => import('./SinglePlaceMap'), {
//  ssr: false,
// });

export const metadata = {
  title: 'Vienna with little ones: A Guide for Parents and Kids',
  description:
    "Discover the best family-friendly places in Vienna with our comprehensive guide. From parks and museums to kid-friendly restaurants and activities, we've got you covered.",
};

export default async function SinglePlacePage(props) {
  // getting single place from database
  const singlePlace = await getPlaceById(props.params.placeId);

  // getting all reviews and filter them to a reviews for a single place
  const reviews = await getReviews();

  const filteredReviews = Filter(reviews, singlePlace);
  // const filteredReviews = reviews.filter(
  //   (review) => review.placeId === singlePlace?.id,
  // );

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="h-auto">
      <h1 className="text-center font-poppins font-bold text-4xl mt-16">
        {singlePlace?.placeName}
      </h1>
      <div className="flex justify-center items-center mt-8">
        <Image
          className="rounded"
          src={singlePlace?.imageUrl}
          alt="Image of a place"
          width="500"
          height="500"
        />
      </div>
      <div className="flex justify-center items-center mt-8">
        <SinglePlaceMap places={singlePlace} className="rounded" />
      </div>
      <div className="flex justify-center items-center mt-8">
        <p className="text-center font-poppins text-lg">
          {singlePlace?.placeDescription}! <br />
          {singlePlace?.placeAdress}
        </p>
      </div>
      <div>{user && <DeletePlace places={singlePlace} user={user} />}</div>
      <div className="flex justify-center items-center mt-8">
        {user && <AddingPost singlePlace={singlePlace} user={user} />}
      </div>
      <h2 className="text-center font-poppins mt-8 text-lg">All reviews:</h2>
      <div className="flex flex-col justify-center items-center mt-8 mb-16">
        {filteredReviews.map((review) => {
          return (
            <div key={`review-${review.id}`}>
              <div className="leading-relaxed">
                <h2 className="text-center">{review.title}</h2>
                <p className="text-center">{review.reviewText}</p>
                <p className="text-center">created by: {review.userName}</p>
                <div className="flex justify-center items-center mt-4 mb-4">
                  {user && <DeleteReview reviews={review} user={user} />}
                  <br />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
