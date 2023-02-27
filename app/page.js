import { Inter } from '@next/font/google';
import Link from 'next/link';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href="/allPlaces" tabindex="0" role="link">
        KidsGoVienna
      </Link>
    </main>
  );
}
