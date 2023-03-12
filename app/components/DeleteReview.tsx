'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  user: { id: number };
  reviews: {
    userId: number;
    id: number;
  };
};

export default function DeleteReview(props: Props) {
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <div>
      {props.user.id === props.reviews.userId && (
        <button
          className="btn btn-sm bg-orange-600"
          onClick={async () => {
            const response = await fetch(`/api/reviews/${props.reviews.id}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              console.log(error);
              return;
            }
            router.refresh();
            // setReviews(reviews.filter((review) => review.id !== data.review.id));
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
