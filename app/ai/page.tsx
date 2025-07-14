'use client'
import { useState } from 'react'
import styles from './ai.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AIGenerator() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    field: '',
    skills: '',
    interests: '',
    complexity: 'medium',
    technologies: ''
  })
  const [generatedProjects, setGeneratedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [searchHistory, setSearchHistory] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/gemini/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
      
        throw new Error(errorData.error || 'Failed to generate projects');
      }      
      
      const data = await response.json()
      let parsedProjects
      try {
        parsedProjects = JSON.parse(data.text)
        if (!Array.isArray(parsedProjects)) {
          throw new Error("Parsed data is not an array")
        }
      } catch (err) {
        console.error("Error parsing data.text:", err)
        setError("Failed to parse generated projects")
        return
      }
      setGeneratedProjects(parsedProjects)
      // console.log(data, '1')
      console.log(data.text, '2')
      console.log("Raw data.text:", data.text)
console.log("Type of data.text:", typeof data.text)
console.log("Is Array:", Array.isArray(data.text))

      // console.log(data.text)
      localStorage.setItem('generatedProjects', JSON.stringify(parsedProjects))
     
      router.push('/results')
  
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className={styles["dashboard-container"]}>
      <div className="menu">
        <h1>
          <Link href={`/dashboard`}>Browse Projects</Link> | 
          <Link href={`/ai`}>Generate Your Own Project</Link>
        </h1>   
      </div>

      <div className={styles["ai-generator"]}>
        <form onSubmit={handleSubmit} className={styles["ai-form"]}>
          <h2>Project Criteria</h2>
          
          <div className={styles["form-group"]}>
            <label>Field of Study</label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
              placeholder="e.g., Computer Science, Biology"
              required
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label>Your Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Python, Data Analysis"
              required
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label>Your Interests</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g., AI, Renewable Energy"
              required
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label>Project Complexity</label>
            <select
              name="complexity"
              value={formData.complexity}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className={styles["form-group"]}>
            <label>Preferred Technologies</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="e.g., React, TensorFlow"
            />
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Projects'}
          </button>
          
          {error && <p className={styles["error"]}>{error}</p>}
        </form>

    
   {/* Generated Projects */}
   {/* {generatedProjects?.length > 0 && (
          <div className={styles["generated-projects"]}>
            <h2>Generated Projects</h2>
            <div className={styles["recommendations"]}>
              {generatedProjects.map((project, index) => (
                <div key={index} className={styles["recommendation-tab"]}>
                  <div className={styles["recommendation-tab-title"]}>{project.title}</div>
                  <div className={styles["recommendation-tab-category"]}>{project.field || 'General'}</div>
                  <div className={styles["recommendation-tab-description"]}>{project.description}</div>
                  {project.technologies && (
                    <div className={styles["technologies"]}>
                      <strong>Technologies:</strong> {project.technologies}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}
     
      </div>
    </div>
  )
}