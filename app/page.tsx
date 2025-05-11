'use client' // Required for Clerk hooks
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import styles from './home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.home_container}>
        <div className={styles["main-text"]}>
          <div className={styles["heading"]}>
            <h1>PROJECT<br />PULSE</h1> 
          </div>
          <div className={styles["description"]}>
            <p>Discover topics, get tailored AI recommendations,<br />
              and access helpful resources - all in one place</p>
          </div>
          <div className={styles["explore-btn"]}>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className={styles["explore-button"]}>Explore</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className={styles["explore-button"]}>
                Explore
              </Link>
            </SignedIn>
          </div>
        </div>

        <div className={styles["tabs"]}>
          <div className={styles["tab"]}>
            <div className={styles["tab-title"]}>
              <p>Search and Explore</p>
            </div>
            <div className={styles["tab-text"]}>
              <p>Find trending project ideas by browsing</p>
            </div>
          </div>

          <div className={styles["tab"]}>
            <div className={styles["tab-title"]}>
              <p>Get AI Suggestions</p>
            </div>
            <div className={styles["tab-text"]}>
              <p>Get Tailored AI recommendations</p>
            </div>
          </div>

          <div className={styles["tab"]}>
            <div className={styles["tab-title"]}>
              <p>Save Your Favorites</p>
            </div>
            <div className={styles["tab-text"]}>
              <p>Save the best ideas for later</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}