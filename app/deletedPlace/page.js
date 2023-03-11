import Link from 'next/link';

export default function DeletedPlacePage() {
  return (
    <div>
      <p> Place you added is now deleted</p>
      <Link href="/"> Go back to home page</Link>
    </div>
  );
}
