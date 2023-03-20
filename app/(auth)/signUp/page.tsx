import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../databasa/session';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Sign Up for Free',
  description:
    "Sign up for Vienna with little ones today and gain access to our community of users, resources, and tools. Best of all, it's completely free!",
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
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
      <div className="mt-16 text-xl font-poppins">
        <h1 className="text-center">Welcome aboard!</h1>
      </div>
      <div className="flex justify-center items-center mt-16">
        <RegisterForm returnTo={props.searchParams.returnTo} />
      </div>
    </main>
  );
}
