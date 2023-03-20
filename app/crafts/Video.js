'use client';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Video() {
  const [video, setVideo] = useState(null);
  const [videoTwo, setVideoTwo] = useState(null);

  useEffect(() => {
    setVideo(
      <ReactPlayer
        url="https://dycg50jsua02q.cloudfront.net/craftsvideo.mp4"
        controls={true}
        width="auto"
      />,
      setVideoTwo(
        <ReactPlayer
          url="https://dycg50jsua02q.cloudfront.net/craftsvideosecond.mp4"
          controls={true}
          width="auto"
        />,
      ),
    );
  }, []);

  return (
    <div>
      <section>
        <h2 className="mb-8 text-lg font-medium text-gray-800 font-poppins">
          Draw a funny penguin
        </h2>
        <div>{video} </div>
      </section>
      <section className="mt-16 mb-16">
        <h2 className="mb-8 text-lg font-medium text-gray-800 font-poppins">
          Draw a flower bouquet
        </h2>
        <div>{videoTwo}</div>
      </section>
    </div>
  );
}
