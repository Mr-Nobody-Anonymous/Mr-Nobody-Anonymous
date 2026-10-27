export type ProjectCategory = 'all' | 'security' | 'ai' | 'tools' | 'web';

export type ProjectStatus = 'ACTIVE' | 'EXPERIMENTAL' | 'FRAMEWORK' | 'RESEARCH';

export interface Project {
  id: string;
  name: string;
  codename: string;
  description: string;
  longDescription: string;
  language: string;
  category: ProjectCategory;
  githubUrl: string;
  tags: string[];
  status: ProjectStatus;
  stars: number;
  forks: number;
  architectureNotes?: string[];
  telemetryLogs?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'argus',
    name: 'Argus',
    codename: 'OP_SENTINELSIGHT',
    description: 'SentinelSight AI Video Analytics Platform with intelligent stream processing and anomaly detection.',
    longDescription: 'High-throughput computer vision and telemetry analytics platform designed for real-time video stream ingestion, automated event detection, and multi-threaded frame processing pipelines.',
    language: 'Python',
    category: 'ai',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/Argus',
    tags: ['Computer Vision', 'Deep Learning', 'Telemetry', 'Video Processing', 'Python'],
    status: 'ACTIVE',
    stars: 1,
    forks: 0,
    architectureNotes: [
      'Asynchronous frame queue processing',
      'YOLO & OpenCV inference pipelines',
      'Real-time anomaly scoring & webhook alerts'
    ],
    telemetryLogs: [
      '[SYS] Initializing Argus video ingest daemon...',
      '[STREAM] Ingestion stream 01 connected @ 60fps',
      '[AI] Inference latency: 14.2ms | Anomaly threshold: 0.85'
    ]
  },
  {
    id: 'orion',
    name: 'Orion',
    codename: 'OP_INSTITUTIONAL_INTEL',
    description: 'Institutional intelligence and architectural security platform with modular risk assessment engines.',
    longDescription: 'Architectural security analysis system engineered to map structural dependencies, evaluate risk surfaces, and aggregate institutional telemetry across complex technical environments.',
    language: 'Python',
    category: 'security',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/Orion',
    tags: ['Security Architecture', 'Threat Modeling', 'Risk Assessment', 'Python'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Declarative threat surface modeling',
      'Automated configuration audit engine',
      'Modular policy rule evaluation'
    ],
    telemetryLogs: [
      '[INIT] Orion Architecture Engine v2.4 initialized',
      '[AUDIT] Surface vectors evaluated: 142 policies',
      '[STATUS] Baseline compliance posture: VERIFIED'
    ]
  },
  {
    id: 'cerberus',
    name: 'Cerberus',
    codename: 'OP_MULTI_AUDIT',
    description: 'Multi-vector security auditing and threat intelligence framework for automated vulnerability assessment.',
    longDescription: 'Extensible threat intelligence and automated security auditing suite providing network asset discovery, service fingerprinting, and security posture scanning.',
    language: 'Python',
    category: 'security',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/Cerberus',
    tags: ['Vulnerability Assessment', 'Threat Intelligence', 'Recon', 'Python'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Multi-threaded port & service enumeration',
      'CVE correlation and advisory mapping',
      'Structured JSON/SARIF vulnerability reports'
    ],
    telemetryLogs: [
      '[CERBERUS] Recon engine deployed across target perimeter',
      '[RECON] 18 ports enumerated | 0 unauthorized endpoints',
      '[REPORT] Audit payload generation completed'
    ]
  },
  {
    id: 'ultrone',
    name: 'ultrone',
    codename: 'OP_AUTONOMOUS_CORE',
    description: 'Autonomous AI agent architecture and task execution framework designed for complex operational pipelines.',
    longDescription: 'Lightweight autonomous agent runtime implementing state machines, dynamic tool calling, memory management, and deterministic loop execution for multi-step task resolution.',
    language: 'Python',
    category: 'ai',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/ultrone',
    tags: ['AI Agents', 'Autonomous Systems', 'Tool Calling', 'Python'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Context-aware state machine transitions',
      'Safe sandbox tool execution protocol',
      'Multi-hop planning & reflection loops'
    ],
    telemetryLogs: [
      '[ULTRONE] Agent orchestrator booted with 4 tool schemas',
      '[EXEC] Task plan generated: 6 sequential steps',
      '[DONE] Agent goal achieved in 3.4s'
    ]
  },
  {
    id: 'civiclens',
    name: 'civiclens',
    codename: 'OP_CIVIC_DATA',
    description: 'Civic monitoring and public data analysis platform with real-time aggregation and visualization.',
    longDescription: 'Open-data analysis platform built to scrape, normalize, and visualize civic records and public indicators to promote transparency and data accessibility.',
    language: 'Python',
    category: 'tools',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/civiclens',
    tags: ['Data Analytics', 'Civic Tech', 'ETL', 'Visualization', 'Python'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Resilient scraper pipeline with rate limiting',
      'Pandas/NumPy normalization workflows',
      'Automated reporting and charting exports'
    ],
    telemetryLogs: [
      '[DATA] Ingesting public dataset feeds...',
      '[ETL] Normalized 12,400 record entries',
      '[EXPORT] Analytics dashboard synced'
    ]
  },
  {
    id: 'all-skills',
    name: 'All-skills',
    codename: 'OP_ARSENAL_REF',
    description: 'Cybersecurity and technical skills reference repository with practical lab exercises and commands.',
    longDescription: 'Comprehensive knowledge base and practical cheat sheet repository covering penetration testing methodologies, Linux administration, network diagnostics, and scripting automation.',
    language: 'Python',
    category: 'security',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/All-skills',
    tags: ['Cybersecurity', 'Cheatsheets', 'Linux', 'Networking', 'Python'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Categorized penetration testing playbooks',
      'Privilege escalation checklists (Linux/Windows)',
      'Defensive hardening guidelines'
    ],
    telemetryLogs: [
      '[INDEX] Skills repository loaded: 50+ guides',
      '[VALIDATION] Command syntax verified for Kali Linux'
    ]
  },
  {
    id: 'fkali',
    name: 'fkali',
    codename: 'OP_KALI_AUTOMATION',
    description: 'Kali Linux environment optimization and automated security tooling configuration scripts.',
    longDescription: 'Bash automation framework that streamlines the configuration, package installation, and custom aliasing of penetration testing distributions.',
    language: 'Shell',
    category: 'tools',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/fkali',
    tags: ['Kali Linux', 'Bash', 'Automation', 'DevOps'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Modular shell script architecture',
      'Automated dependency resolution and symlinks',
      'Custom terminal theme & prompt injection'
    ],
    telemetryLogs: [
      '[SETUP] Checking OS kernel: Linux Kali 6.x',
      '[INSTALL] 34 offensive tools provisioned'
    ]
  },
  {
    id: 'rc4',
    name: 'rc4',
    codename: 'OP_STREAM_CIPHER',
    description: 'Cryptographic stream cipher implementation and statistical randomness security analysis.',
    longDescription: 'Educational implementation of the RC4 stream cipher featuring key-scheduling algorithm (KSA) and pseudo-random generation algorithm (PRGA) with bias analysis.',
    language: 'Python',
    category: 'security',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/rc4',
    tags: ['Cryptography', 'Ciphers', 'Python', 'Security'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Pure Python 256-byte S-box permutation',
      'Keystream generator test vectors (RFC 6229)',
      'Statistical bias analysis documentation'
    ],
    telemetryLogs: [
      '[CIPHER] Key scheduling initialized (KSA 256 bytes)',
      '[TEST] Known-answer test vectors: PASS'
    ]
  },
  {
    id: 'plaq-os',
    name: 'plaq-os',
    codename: 'OP_QUANTUM_OPTIMIZER',
    description: 'Fault-Tolerant Quantum Resource Optimizer & Cross-Layer Execution Planner.',
    longDescription: 'Advanced quantum computing scheduling and resource allocation engine engineered to optimize circuit compilation, gate fidelity routing, and fault-tolerant qubit mapping across heterogeneous quantum architectures.',
    language: 'Python',
    category: 'tools',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/plaq-os',
    tags: ['Quantum Computing', 'Resource Optimization', 'Compilers', 'Python', 'Scheduling'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Topological qubit routing and swap minimizer',
      'Dynamic noise-aware pulse scheduling',
      'Fault-tolerant syndrome measurement pipeline'
    ],
    telemetryLogs: [
      '[PLAQ] Quantum compiler initialized: 128 logical qubits',
      '[SCHEDULE] Cross-layer gate fidelity optimized: 99.84%',
      '[EXEC] Resource mapping converged in 4.2ms'
    ]
  },
  {
    id: 'arena-ai-android',
    name: 'arena-ai-android',
    codename: 'OP_ARENA_CLIENT',
    description: 'Unofficial standalone Android client for Arena (arena.ai) with native performance.',
    longDescription: 'High-performance native mobile client providing direct, low-latency access to multi-model LLM benchmarking arenas, leaderboard tracking, and side-by-side prompt evaluation.',
    language: 'Java',
    category: 'ai',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/arena-ai-android',
    tags: ['Android', 'Java', 'AI Benchmarking', 'Mobile Security', 'REST API'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Native Android runtime with MVVM architecture',
      'Encrypted client-side token storage',
      'Streaming token response renderer'
    ],
    telemetryLogs: [
      '[ARENA] Client handshake verified with arena.ai',
      '[STREAM] Receiving dual-model response tokens...',
      '[RENDER] UI frame rate steady @ 120fps'
    ]
  },
  {
    id: 'ethio-cyberguard',
    name: 'ETHIO-CYBERGUARD',
    codename: 'OP_NATIONAL_SOC',
    description: 'AI-assisted threat detection and automated incident response for national cyber defence.',
    longDescription: 'Co-engineered during the INSA 5th National Cyber Talent Camp on the Ethiopian National Cyber Range. Combines ML-assisted anomaly detection with an automated triage and response pipeline, verified continuously by GitHub Actions CI.',
    language: 'Python',
    category: 'security',
    githubUrl: 'https://github.com/AbeniYirgalem/ETHIO-CYBERGUARD',
    tags: ['AI SecOps', 'Threat Detection', 'Incident Response', 'STRIDE', 'CI/CD'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'STRIDE threat model driving detection coverage',
      'Automated triage with human-in-the-loop escalation',
      'CI verification on every commit'
    ],
    telemetryLogs: [
      '[SOC] Range link established: ncrp.et',
      '[DETECT] Anomaly classifier loaded: 12 signal families',
      '[RESPONSE] Playbook arm — awaiting operator confirmation'
    ]
  },
  {
    id: 'evolyx',
    name: 'EVOLYX',
    codename: 'OP_CONTINUAL_RESEARCH',
    description: 'Continual AI research platform with runtime memory and gated fine-tuning.',
    longDescription: 'Research harness for models that improve between runs: persistent runtime memory, evaluation gates, and LoRA/DPO fine-tuning that only promotes a checkpoint after benchmark thresholds are met.',
    language: 'Python',
    category: 'ai',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/EVOLYX',
    tags: ['LoRA', 'DPO', 'FastAPI', 'Evaluation Harnesses', 'Python'],
    status: 'EXPERIMENTAL',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Gated promotion: no checkpoint ships without passing evals',
      'LoRA / DPO adapters with versioned artefacts',
      'FastAPI control plane with Vite/React inspection UI'
    ],
    telemetryLogs: [
      '[EVOLYX] Memory store hydrated: 4,096 episodes',
      '[TRAIN] LoRA adapter r=16 attached',
      '[GATE] Candidate rejected — benchmark delta -0.4%'
    ]
  },
  {
    id: 'mirror',
    name: 'MIRROR',
    codename: 'OP_FAULT_INJECTION',
    description: 'Fault-injection and multi-armed bandit crash simulator for AI agents.',
    longDescription: 'Adversarial testbed that stresses agent runtimes: injects tool failures, malformed observations and timeouts, then uses a multi-armed bandit to concentrate on the failure modes that actually break a given agent.',
    language: 'Python',
    category: 'ai',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/mirror',
    tags: ['Fault Injection', 'Multi-Armed Bandits', 'Agent Testing', 'Reliability'],
    status: 'RESEARCH',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Pluggable fault catalogue: tool, network, schema, timeout',
      'Bandit policy allocates budget to the worst-performing arms',
      'Deterministic seeds for reproducible crash reports'
    ],
    telemetryLogs: [
      '[MIRROR] Seeding fault catalogue: 24 vectors',
      '[BANDIT] Exploit arm 7 — timeout cascade reproduced',
      '[REPORT] Minimal failing trace written'
    ]
  },
  {
    id: 'phantom',
    name: 'PHANTOM',
    codename: 'OP_CAUSAL_MINIMISATION',
    description: 'Causal failure-reconstruction engine for Raft microservices.',
    longDescription: 'Takes a distributed failure in a Raft-based service and works backwards: correlates logs and traces, then minimises the event set to the smallest causal chain that still reproduces the fault.',
    language: 'Python',
    category: 'tools',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/phantom',
    tags: ['Distributed Systems', 'Raft', 'Causal Inference', 'Observability'],
    status: 'RESEARCH',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Log and trace correlation across replicas',
      'Delta-debugging style minimisation of the causal chain',
      'Replay harness validates the reduced explanation'
    ],
    telemetryLogs: [
      '[PHANTOM] Ingesting 3 replicas × 180k events',
      '[CORRELATE] Candidate cause: leadership churn @ t+4.2s',
      '[REPLAY] Reduced chain reproduces 9/9 runs'
    ]
  },
  {
    id: 'daily-git-digest',
    name: 'daily-git-digest',
    codename: 'OP_COMMIT_AUDITOR',
    description: 'Autonomous daily commit auditor and release-notes pipeline.',
    longDescription: 'Runs every day: audits what actually landed in the repositories, summarises it, and drafts release notes — so the changelog reflects the commits rather than someone\'s memory of them.',
    language: 'Python',
    category: 'tools',
    githubUrl: 'https://github.com/Mr-Nobody-Anonymous/daily-git-digest',
    tags: ['Automation', 'GitHub Actions', 'Release Notes', 'Python'],
    status: 'ACTIVE',
    stars: 0,
    forks: 0,
    architectureNotes: [
      'Scheduled GitHub Actions run over the day\'s commits',
      'Commit classification into features, fixes and chores',
      'Draft release notes with links back to every change'
    ],
    telemetryLogs: [
      '[DIGEST] Scanning commits since 00:00 UTC',
      '[CLASSIFY] 7 commits → 2 features, 4 fixes, 1 chore',
      '[PUBLISH] Draft release notes generated'
    ]
  },
];
