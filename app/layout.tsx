import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../databasa/user';
import Footer from './components/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'Vienna with little ones',
    template: '%s | Vienaa with little ones',
  },
  manifest: '/manifest.json',
};

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
        <header className="">
          <nav className="bg-gray-800 py-4 mr-6 ml-6 mb-0">
            <div className="flex flex-inline justify-between">
              <div className="flex flex-shrink-0 mr-6 flex-col md:flex-row ">
                <Link tabIndex={0} href="/">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out px-2">
                    Home
                  </p>
                </Link>
                <Link tabIndex={0} href="/newPlace">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out px-2">
                    Add a new location
                  </p>
                </Link>
                <Link tabIndex={0} href="/crafts">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out px-2">
                    Crafts
                  </p>
                </Link>
                <Link tabIndex={0} href="/weather">
                  <p className="text-gray-300 hover:text-second text-large font-poppins transition duration-700 ease-in-out px-2">
                    Weather
                  </p>
                </Link>
              </div>
              <div className="flex space-x-4 ">
                {user ? (
                  <>
                    <p className="text-gray-300">{user.username}</p>
                    <Link tabIndex={0} href="/logout" prefetch={false}>
                      <p className="btn bg-brick border-white text-white">
                        Logout
                      </p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link tabIndex={0} href="/signUp">
                      <p className="btn bg-brick border-white text-white">
                        Sign up
                      </p>
                    </Link>
                    <Link tabIndex={0} href="/login">
                      <p className="btn bg-brick border-white text-white">
                        Login
                      </p>
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
