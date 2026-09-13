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
  }
];
