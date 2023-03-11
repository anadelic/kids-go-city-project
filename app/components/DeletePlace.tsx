'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  user: { id: number };
  places: {
    userId: number;
    id: number;
  };
};

export default function DeletePlace(props: Props) {
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <div>
      {props.user.id === props.places.userId && (
        <button
          className="btn btn-sm bg-orange-600"
          onClick={async () => {
            const response = await fetch(
              `/api/addNewPlace/${props.places.id}`,
              {
                method: 'DELETE',
              },
            );

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              return;
            }
            router.refresh();
            // setReviews(reviews.filter((review) => review.id !== data.review.id));
            await router.push('/deletedPlace');
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
