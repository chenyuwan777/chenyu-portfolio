// Local images, GIFs, videos, and caption tracks are relative to public/.
// Leave missing fields null or empty. The interface labels gaps without creating broken links.
const publicScene = 'https://huggingface.co/datasets/chenyuwan666/SCALEML/tree/125cd8d62f964a3c23a502fd00307d3f802da446/chenyu/codex/scenes/mujoco/41254906/20261109T183938Z'

export const projects = [
  {
    id: 'simreadybench',
    title: 'SimReadyBench',
    field: 'World reconstruction',
    group: 'Robotics',
    summary: 'Using coding agents to reconstruct indoor spaces that a robot can interact with.',
    thumbnail: 'media/scene-views.webp',
    imageAlt: 'Three rendered viewpoints from a publicly archived MuJoCo kitchen reconstruction.',
    problem: 'A visually plausible room can have incorrect geometry, scale, or contacts. We need ways to ask whether the generated world supports the interactions a robot would try.',
    approach: 'Coding agents produce scene assets from visual references. The generated environment, agent inputs, and validation records can then be inspected together. The example here shows three views from one archived generation run.',
    technologies: ['Python', 'MuJoCo', 'Coding agents', 'Docker'],
    contributions: [
      'Generated indoor simulation environments from RealEstate10K footage using Codex and prepared outputs for review.',
      'Collected and processed real-room videos, floor plans, object dimensions, and horizontal clearances to provide spatial references.',
      'Organized generation runs and preserved prompts, inputs, logs, contracts, and outputs for reproducible evaluation.',
    ],
    results: [
      { value: '1,000', label: 'indoor environments generated in the RealEstate10K reconstruction effort' },
      { value: '20', label: 'real-world environment datasets collected and processed for reference' },
    ],
    resources: { code: publicScene.replace('/tree/', '/resolve/') + '/output.tar.gz', codeLabel: 'Scene source (.tar.gz)', paper: null, extras: [
      { label: 'Public dataset', url: 'https://huggingface.co/datasets/chenyuwan666/SCALEML' },
      { label: 'Featured scene archive', url: publicScene },
    ] },
    media: {
      kind: 'video', src: 'media/scene-views.mp4', captions: 'media/scene-views.vtt', poster: 'media/scene-views.webp',
      title: 'Three views of a reconstructed kitchen',
      description: 'A silent sequence of rendered stills from archived scene 41254906 shows the kitchen entrance, the cabinet wall, and the dining table.',
    },
  },
  {
    id: 'mujoco-manipulation',
    title: 'MuJoCo robotic manipulation',
    field: 'Robot learning',
    group: 'Robotics',
    summary: 'Tracing grasp, contact, and release failures in tests for a simulated Franka Panda.',
    thumbnail: 'media/panda-card.webp',
    imageAlt: 'Surface points sampled from the articulated model of a seven-axis Franka Panda.',
    problem: 'A failed pickup can originate in the motion plan, the grasp, or the simulated object. A test becomes more informative when it records where the interaction broke down.',
    approach: 'An LLM turns task descriptions and scene observations into manipulation tests. The execution loop uses reachability and collision feedback during approach, checks gripper contact at pickup, and measures whether the object stays supported after release.',
    technologies: ['MuJoCo', 'Python', 'Franka Panda', 'Inverse kinematics'],
    contributions: [
      'Implemented a simulated Panda execution loop for grasp, lift, and placement actions.',
      'Built checks that distinguish an unreached target from a contact or stability failure after the robot reaches it.',
      'Designed simulation tasks and worked with teammates to review the resulting test cases.',
    ],
    results: [
      { value: '64', label: 'robotics tasks I designed across the broader project' },
      { value: '6 of 20', label: 'team-selected tasks that came from my set' },
    ],
    resources: { code: null, paper: null, extras: [
      { label: 'Reference robot model', url: 'https://github.com/google-deepmind/mujoco_menagerie/tree/main/franka_emika_panda' },
    ] },
    media: {
      kind: 'video', src: 'media/panda-model-orbit.mp4', captions: 'media/panda-model-orbit.vtt', poster: 'media/panda-surface.webp',
      title: 'Franka Panda model orbit',
      description: 'The camera moves around one fixed arm configuration to show the wrist, gripper, and joint geometry. This silent model study illustrates the robot used in the research.',
    },
  },
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
