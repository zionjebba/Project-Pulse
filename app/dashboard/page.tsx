// app/dashboard/page.js
'use client' // Add this at the top
import { useState } from 'react'
import styles from './dashboard.module.css'
import Link from 'next/link'
import projects  from '../data/projects.json'

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  // Flatten all projects for searching
  const projectsData = projects?.projects || {}

  const allProjects = Object.values(projectsData).flat()

  // Filter projects based on search term
  const filteredProjects = allProjects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles["dashboard-container"]}>
      {/* Search Input */}
      <div className={styles["search"]}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles["search-input"]}
          placeholder='Search projects...'
        />
      </div>

      {/* Search Results */}
      {searchTerm ? (
        <div className={styles["search-results"]}>
          <h3>Search Results</h3>
          <div className={styles["recommendations"]}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        /* Original categorized view when no search */
        Object.entries(projectsData).map(([field, items]) => (
          <div key={field} className={styles["recommendation-section"]}>
            <h2 className={styles["field-title"]}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </h2>
            <div className={styles["recommendations"]}>
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// Separate card component for reusability
function ProjectCard({ project }) {
  return (
    <Link 
      href={`/projectspage/${project.id}`}
      className={styles["recommendation-tab"]}
    >
      <div className={styles["recommendation-tab-title"]}>{project.title}</div>
      <div className={styles["recommendation-tab-category"]}>{project.category}</div>
      <div className={styles["recommendation-tab-description"]}>{project.description}</div>
    </Link>
  )
}