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
      <body className="bg-white text-black">
        <header>
          <nav className="bg-gray-800 py-4 mr-6 ml-6 mb-0">
            <div className="flex justify-between items-center container mx-auto">
              <div className="flex space-x-4">
                <Link href="/">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out">
                    Home
                  </p>
                </Link>
                <Link href="/newPlace">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out">
                    Add a new place
                  </p>
                </Link>
                <Link href="/crafts">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out">
                    Crafts
                  </p>
                </Link>
                <Link href="/weather">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out">
                    Weather
                  </p>
                </Link>
              </div>
              <div className="flex space-x-4">
                {user ? (
                  <>
                    <p className="text-gray-300">{user.username}</p>
                    <Link href="/logout" prefetch={false}>
                      <p className="btn bg-brick border-white">Logout</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/signUp">
                      <p className="btn bg-brick border-white">Sign up</p>
                    </Link>
                    <Link href="/login">
                      <p className="btn bg-brick border-white">Login</p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main>{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}
