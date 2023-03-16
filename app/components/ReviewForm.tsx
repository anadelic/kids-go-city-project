'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  user: {
    id: number;
    username: string;
  };
  singlePlace: {
    id: number;
  };
};

export default function AddingPost(props: Props) {
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
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
            starRating: '',
            userId: props.user.id,
            placeId: props.singlePlace.id,
            userName: props.user.username,
          }),
        });

        const data = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          console.log(errors);
          return;
        }
        router.refresh();
      }}
    >
      {/* Input for review Title*/}
      <label>
        Title: <br />
        <input
          className="input input-bordered input-sm w-full max-w-xs"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </label>
      <br />
      {/* Input for review text*/}
      <label>
        Review text: <br />
        <textarea
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          value={reviewText}
          onChange={(event) => setReviewText(event.currentTarget.value)}
        />
      </label>
      <br />
      <div className="flex justify-center items-center">
        <button className="btn btn-sm bg-green-500 mt-4">Post</button>
      </div>
    </form>
  );
}
