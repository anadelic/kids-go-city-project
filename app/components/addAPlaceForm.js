import React from 'react';

export default function Form() {
  return (
    <form action="/send-data-here" method="post">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" required />
      <label htmlFor="location">Location:</label>
      <input id="location" name="location" required />
      <button>Submit</button>
    </form>
  );
}
