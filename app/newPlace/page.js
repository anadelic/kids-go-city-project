import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../../databasa/user';
import AddingNewPlace from '../components/AddAPlaceForm';

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
      <AddingNewPlace myKey={myKey} user={user} myCloud={myCloud} />
    </div>
  );
}
