// helpers.ts
import projects from '../data/projects.json';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details?: {
    fullDescription?: string;
    difficulty?: string;
    duration?: string;
    learningObjectives?: string[];
  };
}

export function getAllProjects(): Project[] {
  try {
    const staticProjects = Object.values(projects.projects).flat() as Project[];

    if (typeof window !== 'undefined') {
      const generatedProjects = JSON.parse(
        localStorage.getItem('generatedProjects') || '[]'
      ) as Project[];
      return [...staticProjects, ...generatedProjects];
    }

    return staticProjects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}
