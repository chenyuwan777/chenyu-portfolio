export const experience = [
  {
    period: 'Sep 2026 – present',
    category: 'Research',
    role: 'Undergraduate Research Assistant, Robot Learning',
    organization: 'University of Illinois Urbana-Champaign',
    location: 'Urbana, IL',
    description: 'In Prof. Tong Zhang’s group, I study how to tell whether a room reconstructed from video works for robot manipulation.',
    highlights: [
      'Used Codex to reconstruct 1,000 indoor environments from RealEstate10K videos. Designed 64 robotics tasks, including six of the 20 the team selected for further development.',
      'Implemented the grasp, lift, and placement loop for a simulated Franka Panda. Used collision and reachability feedback to revise a failed motion.',
      'Built an evaluator that generates manipulation tests from video frames and object lists. Checked gripper contact at pickup and object stability after release to locate failures.',
    ],
  },
  {
    period: 'May – Aug 2026',
    category: 'Research',
    role: 'Undergraduate Research Assistant, AdvNet',
    organization: 'University of Illinois Urbana-Champaign',
    location: 'Urbana, IL · Remote',
    description: 'With Prof. Philip B. Godfrey, I investigated whether a model could identify network conditions that would stress a system before running the full evaluation.',
    highlights: [
      'Trained a random forest on 1,000 network traces using bandwidth, latency, duration, and queue length. It achieved an R² of 0.922 on 1,000 held-out traces.',
      'Ranked 10,000 candidate traces and ran the top 1,000 through AdvNet. The 95th-percentile observed score was 0.639, compared with 0.391–0.454 across five random-search baselines.',
    ],
  },
  {
    period: 'May – Aug 2026',
    category: 'Industry',
    role: 'Market Analyst Intern, Product Analytics',
    organization: 'BOSMA',
    location: 'California, USA',
    description: 'I used device telemetry to estimate failure risk across approximately 13,400 smart-home security devices and cameras.',
    highlights: [
      'Built a LightGBM model using product test scores, failure logs, and device attributes. It achieved a ROC-AUC of 0.79 on held-out data.',
      'Used SHAP to explain which features influenced individual risk predictions and shared recommendations for product reliability.',
    ],
  },
  {
    period: 'Jun – Jul 2025',
    category: 'Industry',
    role: 'Quantitative Risk Control Intern',
    organization: 'Beijing Zhongguancun Bank',
    location: 'Beijing, China',
    description: 'I used SQL to bring borrower, loan, and repayment records together for a credit-risk study covering 145,000 anonymized borrower records.',
    highlights: [
      'Compared XGBoost, LightGBM, and decision trees for predicting loan default. On held-out data, the best model achieved a ROC-AUC of 0.77 and a Kolmogorov–Smirnov statistic of 0.28.',
      'Presented feature importance and model trade-offs to the risk-control team.',
    ],
  },
]
