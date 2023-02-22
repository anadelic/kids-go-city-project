import './globals.css';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />

      <body>
        <header>
          <button>Log in</button>
          <button>Add a new place</button>
        </header>
        {children}
      </body>
    </html>
  );
}
