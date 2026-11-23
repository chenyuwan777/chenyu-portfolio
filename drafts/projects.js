// Paused portfolio entries. Media paths are ready to use when restored to public/.
export const draftProjects = [
  {
    id: 'network-trace-ranking',
    title: 'Ranking network traces',
    field: 'ML systems',
    group: 'Systems',
    summary: 'Using a learned ranking to choose which network conditions to evaluate.',
    thumbnail: 'media/trace-ranking.webp',
    imageAlt: '95th-percentile trace score of 0.639 for model-guided search. Scores for five random baselines ranged from 0.391 to 0.454.',
    problem: 'Running every candidate network trace is expensive. Can a model prioritize conditions that put more stress on a system?',
    approach: 'I used bandwidth, latency, duration, and queue length to train a random forest regressor. I ranked 10,000 candidate traces, evaluated the top 1,000 with AdvNet, and compared their observed scores with five random-search baselines.',
    technologies: ['Python', 'scikit-learn', 'NumPy', 'Mahimahi'],
    contributions: [
      'Implemented the trace generation, model training, ranking, and evaluation workflow.',
      'Compared predicted scores against held-out traces and checked the selected candidates in AdvNet.',
    ],
    results: [
      { value: '0.922', label: 'R² on 1,000 held-out traces' },
      { value: '0.639', label: 'observed 95th-percentile score for model-guided selection, versus 0.391–0.454 across five random baselines' },
    ],
    resources: { code: null, paper: null, extras: [] },
    media: { kind: 'image', src: 'media/trace-ranking.webp', title: 'Trace selection results', description: 'The markers show the range across five random-search baselines and the result from model-guided selection.' },
  },
  {
    id: 'reinforcement-learning-ppo',
    title: 'Reinforcement learning & PPO',
    field: 'Reinforcement learning',
    group: 'Learning',
    placeholder: true,
    summary: 'A project space for policy learning and Proximal Policy Optimization.',
    thumbnail: 'media/ppo-objective.webp',
    imageAlt: 'Conceptual graph of the positive-advantage clipped PPO objective. The solid line levels off at the upper clip boundary.',
    problem: null,
    approach: null,
    technologies: [],
    contributions: [],
    results: [],
    resources: { code: null, paper: null, extras: [
      { label: 'Background reading · PPO', url: 'https://arxiv.org/abs/1707.06347' },
    ] },
    media: null,
  },
]
