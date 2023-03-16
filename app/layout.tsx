import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../databasa/user';
import Footer from './components/Footer';

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
        <header>
          <nav>
            <div>
              <Link href="/">Home</Link>
              <Link href="/newPlace">Add a new place</Link>
              <Link href="/crafts">Crafts</Link>
              <Link href="/weather">Weather</Link>
            </div>
            <div>
              {user ? (
                <>
                  <p>{user.username}</p>
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
            </div>
          </nav>
        </header>
        <main>{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}
