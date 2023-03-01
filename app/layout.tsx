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
          <Link href="/newPlace">Add a new place</Link>
          <Link href="/">Reviews</Link>
          <Link href="/rainyDays">For rainy days</Link>
          <Link href="/">About us</Link>
          <Link href="/">Contact us</Link>
          <Link href="/">Log in</Link>
          <Link href="/">Sign up</Link>
        </header>
        {props.children}
      </body>
    </html>
  );
}
