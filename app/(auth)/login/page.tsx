import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function RegisterPage(props: Props) {
  return (
    <main>
      <h1> Log in</h1>
      <LoginForm returnTo={props.searchParams.returnTo} />;
    </main>
  );
}
