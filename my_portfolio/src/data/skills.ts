export type ProficiencyLevel = 'CORE' | 'ADVANCED' | 'EXPLORING';

export interface Skill {
  name: string;
  category: 'offensive' | 'defensive' | 'programming' | 'ai' | 'web' | 'tools';
  proficiency: ProficiencyLevel;
  usageScore: number; // 0 - 100 for visual bar, clearly labeled as workflow frequency
  description: string;
}

export const SKILL_CATEGORIES = [
  { id: 'offensive', label: 'Offensive Security', codename: 'SECTOR_01' },
  { id: 'defensive', label: 'Defensive & Hardening', codename: 'SECTOR_02' },
  { id: 'programming', label: 'Languages & Scripting', codename: 'SECTOR_03' },
  { id: 'ai', label: 'AI & Data Science', codename: 'SECTOR_04' },
  { id: 'web', label: 'Web Technologies', codename: 'SECTOR_05' },
  { id: 'tools', label: 'Tools & Environments', codename: 'SECTOR_06' }
] as const;

export const SKILLS: Skill[] = [
  // Offensive
  {
    name: 'Penetration Testing & CTF',
    category: 'offensive',
    proficiency: 'CORE',
    usageScore: 92,
    description: 'Practical offensive security methodology, CTF challenge solving (TryHackMe & HTB), and reconnaissance workflows.'
  },
  {
    name: 'Web Application Security',
    category: 'offensive',
    proficiency: 'CORE',
    usageScore: 88,
    description: 'OWASP Top 10 auditing, authentication bypass testing, SQLi, XSS, and CSRF vulnerability assessment.'
  },
  {
    name: 'Network Enumeration',
    category: 'offensive',
    proficiency: 'ADVANCED',
    usageScore: 85,
    description: 'Port scanning with Nmap, service fingerprinting, packet inspection with Wireshark, and subnet mapping.'
  },

  // Defensive
  {
    name: 'Threat Modeling',
    category: 'defensive',
    proficiency: 'ADVANCED',
    usageScore: 82,
    description: 'STRIDE framework analysis, attack surface mapping, and baseline system security review.'
  },
  {
    name: 'Log Analysis & SIEM Basics',
    category: 'defensive',
    proficiency: 'ADVANCED',
    usageScore: 78,
    description: 'Auditing authentication logs, anomaly detection, and event correlation pipelines.'
  },
  {
    name: 'Cryptographic Protocols',
    category: 'defensive',
    proficiency: 'ADVANCED',
    usageScore: 80,
    description: 'Symmetric/asymmetric encryption, hashing fundamentals, and stream cipher analysis (RC4).'
  },

  // Programming
  {
    name: 'Python',
    category: 'programming',
    proficiency: 'CORE',
    usageScore: 95,
    description: 'Primary language for security tooling, automated exploitation scripts, data processing, and AI engines.'
  },
  {
    name: 'Bash & Shell Scripting',
    category: 'programming',
    proficiency: 'CORE',
    usageScore: 90,
    description: 'Linux systems automation, tool orchestration, piped data parsing, and cron job workflows.'
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'programming',
    proficiency: 'ADVANCED',
    usageScore: 84,
    description: 'Modern full-stack interfaces, React UI state machines, asynchronous event loops, and web app security.'
  },
  {
    name: 'C / C++',
    category: 'programming',
    proficiency: 'ADVANCED',
    usageScore: 72,
    description: 'Low-level systems fundamentals, memory management, binary analysis, and pointer mechanics.'
  },
  {
    name: 'Dart',
    category: 'programming',
    proficiency: 'ADVANCED',
    usageScore: 80,
    description: 'Strongly typed client-optimized language powering cross-platform Flutter applications.'
  },

  // AI & Data Science
  {
    name: 'Autonomous AI Agents',
    category: 'ai',
    proficiency: 'CORE',
    usageScore: 90,
    description: 'Designing stateful reasoning loops, dynamic tool calling schemas, and context caching architectures (ultrone).'
  },
  {
    name: 'NumPy & Pandas',
    category: 'ai',
    proficiency: 'CORE',
    usageScore: 88,
    description: 'High-performance array computation, vector math, statistical feature extraction, and dataset telemetry transformation.'
  },
  {
    name: 'Scikit-Learn & ML',
    category: 'ai',
    proficiency: 'ADVANCED',
    usageScore: 84,
    description: 'Predictive modeling, regression, clustering algorithms, classification pipelines, and feature selection.'
  },
  {
    name: 'Matplotlib & Data Viz',
    category: 'ai',
    proficiency: 'ADVANCED',
    usageScore: 82,
    description: 'Scientific telemetry plotting, loss curve monitoring, feature distribution graphs, and anomaly heatmaps.'
  },
  {
    name: 'Computer Vision & Analytics',
    category: 'ai',
    proficiency: 'ADVANCED',
    usageScore: 82,
    description: 'OpenCV image processing, video stream inference, and object detection analytics (Argus).'
  },

  // Web
  {
    name: 'React & Vite',
    category: 'web',
    proficiency: 'CORE',
    usageScore: 88,
    description: 'Component architecture, responsive glassmorphic interfaces, and motion physics rendering.'
  },
  {
    name: 'Tailwind CSS',
    category: 'web',
    proficiency: 'CORE',
    usageScore: 86,
    description: 'Utility-first modern CSS workflows, responsive fluid layouts, and cyber dark HUD component styling.'
  },
  {
    name: 'Express.js & NestJS',
    category: 'web',
    proficiency: 'ADVANCED',
    usageScore: 84,
    description: 'Scalable Node.js microservices, TypeScript architectural patterns, dependency injection, and REST controllers.'
  },
  {
    name: 'REST APIs & Security',
    category: 'web',
    proficiency: 'ADVANCED',
    usageScore: 85,
    description: 'Token authentication (JWT/OAuth), CORS configuration, rate limiting, and input sanitization.'
  },

  // Tools
  {
    name: 'Kali Linux & Arch/Debian',
    category: 'tools',
    proficiency: 'CORE',
    usageScore: 94,
    description: 'Daily operational OS, security repositories, package configuration, and system hardening.'
  },
  {
    name: 'Flutter',
    category: 'tools',
    proficiency: 'ADVANCED',
    usageScore: 82,
    description: 'Multi-platform reactive UI framework for natively compiled mobile and desktop applications.'
  },
  {
    name: 'Jupyter Notebooks',
    category: 'tools',
    proficiency: 'CORE',
    usageScore: 88,
    description: 'Interactive computational notebooks for data science experiments, rapid prototyping, and model validation.'
  },
  {
    name: 'Git & GitHub Actions',
    category: 'tools',
    proficiency: 'CORE',
    usageScore: 90,
    description: 'Version control, automated CI/CD deployment pipelines, and workflow automation.'
  },
  {
    name: 'Burp Suite & Proxy Tools',
    category: 'tools',
    proficiency: 'ADVANCED',
    usageScore: 86,
    description: 'HTTP request interception, parameter tampering, and active vulnerability verification.'
  }
];