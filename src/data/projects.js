// Local images, GIFs, videos, and caption tracks are relative to public/.
// Leave missing fields null or empty. The interface labels gaps without creating broken links.

export const projects = [
  {
    id: 'simreadybench',
    title: 'SimReadyBench',
    field: 'Embodied AI',
    group: 'Robotics',
    summary: 'Reconstructing indoor rooms from video with coding agents and testing whether their surfaces and objects support robot manipulation.',
    detailIntro: 'I used Codex to generate 1,000 indoor simulations from RealEstate10K videos. To probe the resulting scenes, I built an evaluator that uses video frames and object lists to generate manipulation tests, then checks what happens during pickup and after release in MuJoCo.',
    thumbnail: 'media/scene-views.webp',
    imageAlt: 'Three rendered views of one reconstructed kitchen, showing cabinets, counters, and a dining table.',
    figure: {
      layout: 'strip',
      title: 'SimReadyBench',
      caption: 'One kitchen reconstructed from video in MuJoCo.',
      controls: 'Kitchen viewpoint',
      views: [
        { label: 'Entrance', file: 'media/kitchen-entrance.jpg', alt: 'View into the reconstructed kitchen from the entrance, facing the window and cabinets.' },
        { label: 'Cabinets', file: 'media/kitchen-cabinets.jpg', alt: 'A second viewpoint along the cabinets and patterned backsplash.' },
        { label: 'Dining area', file: 'media/kitchen-dining.jpg', alt: 'A view toward the dining table and chairs in the same reconstructed room.' },
      ],
    },
    problem: 'A kitchen can look convincing even if its counter cannot support a cup. We wanted to tell where a manipulation failed and what that failure revealed about the scene.',
    steps: [
      { title: 'Reconstruct the room', text: 'A coding agent uses video frames as visual references and writes a MuJoCo scene that describes the room geometry and furniture placement.' },
      { title: 'Generate a manipulation test', text: 'Given video frames and an object list, the evaluator produces a task that exercises the scene, such as picking up a cup and placing it on a counter.' },
      { title: 'Evaluate the interaction', text: 'The simulation records whether the gripper reached and held the object and whether it stayed in place after release. Checking each stage helps distinguish a failed grasp from a placement that needs investigation.' },
    ],
    technologies: ['Codex', 'MuJoCo', 'Python', 'Docker'],
    contributions: [
      'Ran the Codex reconstructions and archived each run’s prompts, inputs, logs, and generated scene so teammates could examine individual results.',
      'Designed 64 robotics tasks. Six of my tasks were among the 20 the team selected for further development.',
      'Collected room videos, floor plans, object dimensions, and clearances to give the team real measurements for checking reconstructed layouts.',
    ],
    results: [
      { value: '1,000', label: 'indoor environments generated in the RealEstate10K reconstruction effort' },
      { value: '20', label: 'real rooms documented with dimensions and floor plans' },
    ],
    resources: { code: null, paper: null, extras: [
      { label: 'MuJoCo manipulation tests', url: '#project/mujoco-manipulation' },
    ] },
    media: {
      kind: 'video', src: 'media/scene-views.mp4', captions: 'media/scene-views.vtt', poster: 'media/scene-views.webp',
      title: 'Three views of a reconstructed kitchen',
      description: 'Three rendered stills from one Codex-generated scene show the kitchen entrance, cabinet wall, and dining table.',
    },
  },
  {
    id: 'mujoco-manipulation',
    title: 'MuJoCo robotic manipulation',
    field: 'Robot learning',
    group: 'Robotics',
    summary: 'Executing language-guided pick-and-place plans with a Franka Panda and using collision and reachability feedback to revise its motions.',
    detailIntro: 'I implemented the execution loop for a simulated Franka Panda. A language model translates a task description and scene geometry into grasp, lift, and placement actions. The arm’s behavior in MuJoCo provides feedback for the next attempt.',
    thumbnail: 'media/panda-card.webp',
    imageAlt: 'Surface points sampled from the articulated model of a seven-axis Franka Panda.',
    figure: {
      showOnDetail: true,
      title: 'Franka Panda',
      caption: 'Two representations of the arm in the same pose.',
      controls: 'Robot model representation',
      views: [
        { label: 'Surface', file: 'media/panda-surface.webp', alt: 'Shaded surface of the seven-axis Franka Panda with its two-finger gripper open.' },
        { label: 'Points', file: 'media/panda-points.webp', alt: 'Sampled surface points tracing the same robot geometry and pose.' },
      ],
    },
    problem: 'A failed pickup can originate in the motion plan, the grasp, or the simulated object. A test becomes more informative when it records where the interaction broke down.',
    approach: 'During approach, the execution loop checks whether the target is reachable and whether the planned motion collides with scene geometry. Our revision prototype uses that feedback to adjust the grasp point or gripper orientation before trying again.',
    technologies: ['MuJoCo', 'Python', 'Franka Panda', 'Inverse kinematics'],
    contributions: [
      'Connected language-generated actions to the simulated Panda and implemented feedback for retrying blocked motions.',
      'Built checks that distinguish an unreached target from a contact or stability failure after the robot reaches it.',
      'Investigated object slippage, gripper contact, collisions, and inverse-kinematics failures in local simulation runs.',
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
]
