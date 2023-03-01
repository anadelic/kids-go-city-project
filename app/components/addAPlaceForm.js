import React from 'react';

export default function Form() {
  return (
    <form
      action="/send-data-here"
      method="post"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '200px',
        flexDirection: 'column',
      }}
    >
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input id="location" name="location" required />
      </div>
      <div>
        <label>
          Image: <input type="file" name="image" />
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
}
