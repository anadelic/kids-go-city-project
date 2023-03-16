import Link from 'next/link';

export default function DeletedPlacePage() {
  return (
    <main className="h-screen">
      <div className="mt-16 text-xl font-poppins">
        <p className="text-center"> Place you added is now deleted</p>
      </div>
      <div className="text-center mt-16">
        <Link href="/"> Go back to home page</Link>
      </div>
    </main>
  );
}
