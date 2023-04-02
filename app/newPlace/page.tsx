import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../databasa/session';
import { getUserBySessionToken } from '../../databasa/user';
import { createTokenFromSecret } from '../../utils/csrf';
import AddingNewPlace from '../components/AddPlaceForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Be a Part of Vienna with little ones',
  description:
    'Add your favorite place in Vienna to our city guide and be a part of our vibrant community. Share your love for your city and help others discover its hidden treasures!',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default async function NewPlacd() {
  const myKey = process.env.MAPBOX_API_KEY;
  const myCloud = process.env.PUBLIC_CLOUDNAME;
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  console.log('session', session);

  // for example you may also check if session user is an admin role

  if (!session) {
    redirect('/login?returnTo=/newPlace');
  }

  const csrfToken = createTokenFromSecret(session.csrfSecret);
  console.log('csrf', csrfToken);

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className="h-screen">
      <section className="mt-16 text-xl font-poppins">
        <h1 className="text-center">Add your favorite place in Vienna</h1>
      </section>
      <section className="flex justify-center items-center mt-16 flex-col">
        <AddingNewPlace
          myKey={myKey}
          user={user}
          myCloud={myCloud}
          csrfToken={csrfToken}
        />
      </section>
      <section className="text-center m-16">
        <Link
          href="/"
          className="btn btn-sm bg-second border-white mt-4 text-white"
        >
          See all locations
        </Link>
      </section>
    </main>
  );
}
