import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../databasa/user';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out
  return (
    <html lang="en">
      <head />

      <body>
        <header
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/allPlaces">Places</Link>
          <Link href="/newPlace">Add a new place</Link>
          <Link href="/rainyDays">On rainy days</Link>
          {user ? (
            <>
              {user.username}
              <Link href="/logout" prefetch={false}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/signUp">Sign up</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </header>
        <main>{props.children}</main>
        <footer>
          Copyright Vienna with little ones
          <Link href="/">Contact us</Link>
        </footer>
      </body>
    </html>
  );
}
