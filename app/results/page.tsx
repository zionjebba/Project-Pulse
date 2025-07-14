'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './results.module.css';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies?: string;
}

export default function ResultsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedProjects = localStorage.getItem('generatedProjects');
    if (storedProjects) {
      try {
        const parsed = JSON.parse(storedProjects);
        setProjects(parsed);
      } catch (err) {
        console.error('Failed to parse stored projects:', err);
      }
    }

    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(savedBookmarks);
  }, []);

  const toggleBookmark = (projectId: string) => {
    const newBookmarks = bookmarks.includes(projectId)
      ? bookmarks.filter((id) => id !== projectId)
      : [...bookmarks, projectId];

    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <div className={styles['dashboard-container']}>
      <div className="menu">
        <h1>
          <Link href="/dashboard">Browse Projects</Link> |{' '}
          <Link href="/ai">Generate New Project</Link> |{' '}
          <Link href="/bookmarks">View Bookmarks</Link>
        </h1>
      </div>

      <div className={styles['ai-generator']}>
        <h2>Generated Project Ideas</h2>

        {projects.length === 0 ? (
          <p>
            No projects found. Please <Link href="/ai">generate some</Link>.
          </p>
        ) : (
          <div className={styles['recommendations']}>
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projectspage/${project.id}`}
                className={styles['recommendation-link']}
              >
                <div className={styles['recommendation-tab']}>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation
                      toggleBookmark(project.id);
                    }}
                    className={styles.bookmarkBtn}
                    aria-label={bookmarks.includes(project.id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {bookmarks.includes(project.id) ? '★' : '☆'}
                  </button>

                  <div className={styles['recommendation-tab-title']}>{project.title}</div>
                  <div className={styles['recommendation-tab-category']}>
                    {project.category || 'General'}
                  </div>
                  <div className={styles['recommendation-tab-description']}>
                    {project.description}
                  </div>
                  {project.technologies && (
                    <div className={styles['technologies']}>
                      <strong>Technologies:</strong> {project.technologies}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => router.push('/ai')}>← Back to Generator</button>
          {bookmarks.length > 0 && (
            <button onClick={() => router.push('/bookmarks')} style={{ marginLeft: '1rem' }}>
              View Your Bookmarks ({bookmarks.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
