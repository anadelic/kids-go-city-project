import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../../databasa/user';
import AddingNewPlace from '../components/AddAPlaceForm';

export const dynamic = 'force-dynamic';

export default async function NewPlacd() {
  const myKey = process.env.MAPBOX_API_KEY;
  const myCloud = process.env.PUBLIC_CLOUDNAME;
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <div>
      <h1>New Place</h1>
      <AddingNewPlace myKey={myKey} user={user} myCloud={myCloud} />
      <Link href="/Home" className="link">
        Go to all Places
      </Link>
    </div>
  );
}
