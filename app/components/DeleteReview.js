'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteReview(props) {
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const response = await fetch(`/api/reviews/${props.reviews.id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }
        router.refresh();
        // setReviews(reviews.filter((review) => review.id !== data.review.id));
      }}
    >
      Delete
    </button>
  );
}
