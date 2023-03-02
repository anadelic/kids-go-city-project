import { Inter } from '@next/font/google';
import Link from 'next/link';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1>Vienna with little ones </h1>
        <br />
        <p>Welcome to Vienna with little ones </p>
        <br />
        <p>Feel free to share your favorite places</p>
      </section>
      <Link className={styles.link} href="/allPlaces">
        View places
      </Link>
    </main>
  );
}
