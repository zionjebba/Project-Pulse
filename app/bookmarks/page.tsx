'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import projects from '../data/projects.json'
import styles from './bookmarks.module.css'

interface Project {
  id: string
  title: string
  category: string
  description: string
  details?: {
    difficulty?: string
    duration?: string
  }
}

export default function Bookmarks() {
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBookmarks = () => {
      try {
        const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarks') || '[]')
        const staticProjects = Object.values(projects.projects).flat() as Project[]
        const generated = JSON.parse(localStorage.getItem('generatedProjects') || '[]') as Project[]
        const allProjects = [...staticProjects, ...generated]
        console.log(bookmarkedIds)
        console.log(staticProjects)
        console.log(allProjects)


        const bookmarked = allProjects.filter(project => 
          bookmarkedIds.includes(project.id)
        )
        setBookmarkedProjects(bookmarked)
      } catch (error) {
        console.error('Failed to load bookmarks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // console.log(bookmarkedIds)
    // console.log(staticProjects)


    loadBookmarks()
    window.addEventListener('storage', loadBookmarks)
    return () => window.removeEventListener('storage', loadBookmarks)
  }, [])

  const handleRemoveBookmark = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = bookmarkedProjects.filter(p => p.id !== projectId)
    setBookmarkedProjects(updated)
    localStorage.setItem('bookmarks', JSON.stringify(updated.map(p => p.id)))
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading your bookmarks...</div>
  }

  return (
    <div className={styles.bookmarks_container}>
      <h1 className={styles.title}>Your Bookmarked Projects</h1>
      
      {bookmarkedProjects.length > 0 ? (
        <div className={styles.projects_grid}>
          {bookmarkedProjects.map(project => (
            <div key={project.id} className={styles.project_card}>
              <button
                onClick={(e) => handleRemoveBookmark(project.id, e)}
                className={styles.remove_btn}
                aria-label="Remove bookmark"
              >
                &times;
              </button>

              <Link href={`/projectspage/${project.id}`} className={styles.link_wrapper}>
                <div className={styles.card_content}>
                  <h3 className={styles.project_title}>{project.title}</h3>
                  <p className={styles.project_category}>{project.category}</p>
                  <p className={styles.project_desc}>{project.description}</p>

                  {project.details && (
                    <div className={styles.project_meta}>
                      {project.details.difficulty && (
                        <span className={styles.meta_item}>
                          Difficulty: {project.details.difficulty}
                        </span>
                      )}
                      {project.details.duration && (
                        <span className={styles.meta_item}>
                          Duration: {project.details.duration}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty_state}>
          <p>No bookmarks yet!</p>
          <Link href="/dashboard" className={styles.browse_btn}>
            Browse Projects
          </Link>
        </div>
      )}
    </div>
  )
}
