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
          <header className="bg-white shadow-lg">
            <nav className="container flex flex-col items-center justify-between py-4 mx-auto md:flex-row md:items-center md:justify-between">
              <div className="flex items-center ">
                <Link href="/">
                  <p className="text-xl font-bold text-gray-800 ">Home</p>
                </Link>
                <Link href="/">
                  <p className="ml-6 text-gray-500 hover:text-gray-800">
                    Places
                  </p>
                </Link>
                <Link href="/newPlace">
                  <p className="ml-6 text-gray-500 hover:text-gray-800">
                    Add a new place
                  </p>
                </Link>
                <Link href="/rainyDays">
                  <p className="ml-6 text-gray-500 hover:text-gray-800">
                    On rainy days
                  </p>
                </Link>
              </div>
              <div className="flex items-center">
                {user ? (
                  <>
                    <p className="mr-6 text-gray-800">{user.username}</p>
                    <Link href="/logout" prefetch={false}>
                      <p className="px-4 py-2 text-white bg-brick rounded-lg hover:bg-orange-600">
                        Logout
                      </p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/signUp">
                      <p className="mr-6 text-gray-500 hover:text-gray-800">
                        Sign up
                      </p>
                    </Link>
                    <Link href="/login">
                      <p className="px-4 py-2 text-white bg-brick rounded-lg hover:bg-blue-600">
                        Login
                      </p>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </header>
          {/* <Link href="/">Home</Link>
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
        </header> */}
        </header>
        <main>{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}
