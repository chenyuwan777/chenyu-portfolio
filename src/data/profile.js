// Local asset paths are relative to public/. For an unknown profile, leave its URL null.
export const profile = {
  name: 'Chenyu Wan',
  initials: 'CW',
  seoTitle: 'Chenyu Wan | Robotics & Machine Learning',
  description: 'Research, projects, and experience in embodied AI, robotics simulation, and machine learning at the University of Illinois Urbana-Champaign.',
  role: 'Undergraduate researcher',
  university: 'University of Illinois Urbana-Champaign',
  universityShort: 'UIUC',
  major: 'Statistics & Computer Science',
  location: 'Urbana-Champaign, Illinois',
  intro: 'I build simulated worlds from video and test what robots can do in them.',
  about: 'I study Statistics and Computer Science at the University of Illinois Urbana-Champaign. My research connects embodied AI, robot learning, and machine learning systems.',
  email: 'chenyuw7@illinois.edu',
  portrait: null,
  cv: 'documents/chenyu-wan-cv.pdf',
  social: {
    github: 'https://github.com/chenyuwan777',
    linkedin: null,
    scholar: null,
  },
  interests: [
    'Embodied AI & robot learning',
    'Vision-language-action models',
    'Reinforcement learning',
    'Simulation & world models',
    'Machine learning systems',
  ],
  research: {
    title: 'When is a reconstructed world ready for a robot?',
    description: 'A room can look convincing in a video while a gripper passes through a drawer or a cup slips after release. At Illinois, I study how to turn those interactions into tests of a simulated scene.',
    current: 'I work on coding-agent reconstruction and manipulation evaluation in MuJoCo with Tong Zhang at UIUC.',
    projectId: 'simreadybench',
  },
  contact: 'For research collaborations, graduate study, or AI/ML engineering opportunities, the best way to reach me is by email.',
}

export const modelFigure = {
  label: 'MuJoCo model',
  title: 'Franka Panda',
  caption: 'Seven-axis manipulator · orthographic views of the same pose',
  views: {
    surface: { label: 'Surface', file: 'media/panda-surface.webp', alt: 'Shaded surface of the seven-axis Franka Panda with its two-finger gripper open.' },
    points: { label: 'Points', file: 'media/panda-points.webp', alt: 'Sampled surface points tracing the same robot geometry and pose.' },
  },
}
