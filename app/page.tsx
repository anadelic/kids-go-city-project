import { Inter } from '@next/font/google';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Vienna with little ones: A Guide for Parents and Kids',
  description:
    "Discover the best family-friendly places in Vienna with our comprehensive guide. From parks and museums to kid-friendly restaurants and activities, we've got you covered.",
};

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
