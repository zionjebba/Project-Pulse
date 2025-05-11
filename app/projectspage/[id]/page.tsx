// app/projectspage/[id]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import projects from '../../data/projects.json'
import styles from './projectspage.module.css'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectsData = projects as ProjectsData;
  const allProjects = Object.values(projectsData.projects).flat();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const project = allProjects.find(p => p.id === params.id);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(params.id));
  }, [params.id]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((id: string) => id !== params.id)
      : [...bookmarks, params.id];
    
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
    setShowToast(true);
    window.dispatchEvent(new Event('storage'));
  };

  if (!project) {
    return (
      <div className={styles.errorContainer}>
        <h2>Project Not Found</h2>
        <p>No project exists with ID: {params.id}</p>
        <Link href="/dashboard" className={styles.backLink}>
          ← Return to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.projectContainer}>
      {/* NEW BOOKMARK CONTROLS - ADD THIS SECTION */}
      <div className={styles.bookmarkControls}>
        <button
          onClick={toggleBookmark}
          className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`}
        >
          {isBookmarked ? '★ Bookmarked' : '☆ Bookmark This Project'}
        </button>
        <Link href="/bookmarks" className={styles.viewBookmarksLink}>
          View All Bookmarks →
        </Link>
        {showToast && (
          <div className={styles.toast}>
            {isBookmarked ? '✓ Added to bookmarks' : '✗ Removed from bookmarks'}
          </div>
        )}
      </div>

      {/* YOUR EXISTING PROJECT CONTENT */}
      <h1 className={styles.heading}>{project.title}</h1>
      <div className={styles.category}>{project.category}</div>
      <p className={styles.description}>{project.description}</p>
      
      {project.details && (
        <div className={styles.detailsSection}>
          <h2 className={styles.subHeading}>Project Details</h2>
          <div className={styles.detailGrid}>
            {/* ... rest of your existing details rendering ... */}
          </div>
        </div>
      )}
    </div>
  )
}