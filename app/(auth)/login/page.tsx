import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../databasa/session';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login to Your Vienna with little ones Account ',
  description:
    'Log in now to access member-only content and features, and stay connected with our vibrant community of users.',
  icons: {
    shortcut: '/icon.svg',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }
  return (
    <main className="h-screen">
      <section className="mt-16 text-xl font-poppins">
        <h1 className="text-center">
          Welcome to Vienna with little ones! <br /> Please sign in to access
          your account and enjoy our site's full features and benefits.
          <br /> We're happy to have you here!
        </h1>
      </section>
      <section className="flex justify-center items-center mt-16">
        <LoginForm returnTo={props.searchParams.returnTo} />
      </section>
    </main>
  );
}
