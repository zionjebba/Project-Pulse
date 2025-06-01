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
{project.details?.steps && (
  <div className={styles.stepsSection}>
    <h3 className={styles.sectionTitle}>Implementation Steps</h3>
    <div className={styles.stepsContainer}>
      {project.details.steps.map((step, index) => (
        <div key={index} className={styles.stepCard}>
          <h4 className={styles.stepTitle}>
            <span className={styles.stepNumber}>Step {index + 1}:</span> {step.title}
          </h4>
          <ul className={styles.stepItems}>
            {step.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.stepItem}>
                <span className={styles.itemBullet}>•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)}

{project.details?.resources && (
  <div className={styles.resourcesSection}>
    <h3 className={styles.sectionTitle}>Resources</h3>
    <div className={styles.resourcesGrid}>
      {project.details.resources.tools && (
        <div className={styles.resourceCategory}>
          <h4 className={styles.resourceHeader}>Tools & Technologies</h4>
          <ul className={styles.resourceList}>
            {project.details.resources.tools.map((tool, index) => (
              <li key={index} className={styles.resourceItem}>
                <a href={tool.link} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  {tool.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {project.details.resources.guides && (
        <div className={styles.resourceCategory}>
          <h4 className={styles.resourceHeader}>Learning Guides</h4>
          <ul className={styles.resourceList}>
            {project.details.resources.guides.map((guide, index) => (
              <li key={index} className={styles.resourceItem}>
                <a href={guide.link} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  {guide.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)}          </div>
        </div>
      )}
    </div>
  )
}