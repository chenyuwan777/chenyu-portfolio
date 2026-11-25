export const sections = {
  home: { path: '' },
  projects: { path: 'projects/', title: 'Projects', description: 'Explore selected AI and robotics projects, technical approaches, demonstrations, and individual contributions.' },
  experience: { path: 'experience/', title: 'Experience', description: 'Research, industry experience, and education at the University of Illinois Urbana-Champaign.' },
  research: { path: 'research/', title: 'Research', description: 'Research interests in robot learning, simulation, and machine learning systems.' },
  contact: { path: 'contact/', title: 'Contact', description: 'Contact Chenyu Wan or download a current CV.' },
}

export function projectPath(id) {
  return sections.projects.path + encodeURIComponent(id) + '/'
}
