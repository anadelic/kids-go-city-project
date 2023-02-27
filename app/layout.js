import './globals.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />

      <body>
        <header>
          <Link href="/newPlace" tabindex="0" role="link">
            Add a new place
          </Link>
          <Link href="/" tabindex="0" role="link">
            Reviews
          </Link>
          <Link href="/" tabindex="0" role="link">
            For rainy days
          </Link>
          <Link href="/" tabindex="0" role="link">
            About us
          </Link>
          <Link href="/" tabindex="0" role="link">
            Contact us
          </Link>
          <Link href="/">Log in</Link>
          <Link href="/">Sign up</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
