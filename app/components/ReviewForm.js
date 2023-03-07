'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddingPost(props) {
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState('');
  const [errors, setErrors] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        // Making a post request on submit
        const response = await fetch('/api/reviews/', {
          method: 'POST',
          body: JSON.stringify({
            title: title,
            reviewText: reviewText,
            starRating: starRating,
            userId: props.user.id,
            placeId: props.singlePlace.id,
          }),
        });

        const data = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }
      }}
    >
      {/* Input for review Title*/}
      <label>
        Title:
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </label>
      {/* Input for review text*/}
      <label>
        Review text:
        <textarea
          cols={30}
          rows={3}
          value={reviewText}
          onChange={(event) => setReviewText(event.currentTarget.value)}
        />
      </label>

      {/* Input for review rating, still have to add*/}

      <button
        onClick={() => {
          router.refresh();
        }}
      >
        Post
      </button>
    </form>
  );
}
