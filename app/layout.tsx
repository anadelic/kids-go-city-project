import './globals.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
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
          <Link href="/">About us</Link>
          <Link href="/login">Log in</Link>
          <Link href="/signUp">Sign up</Link>
        </header>
        {props.children}
        <footer>
          Copyright Vienna with little ones
          <Link href="/">Contact us</Link>
        </footer>
      </body>
    </html>
  );
}
