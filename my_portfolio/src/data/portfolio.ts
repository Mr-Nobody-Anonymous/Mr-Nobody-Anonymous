export const GITHUB_URL = 'https://github.com/Mr-Nobody-Anonymous';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/bam-sintu-a47b4b281/';
export const EMAIL = 'bmx310712@gmail.com';

export type ProjectCategory = 'security' | 'ai';

export interface Project {
  id: string;
  number: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  description: string;
  overview: string;
  challenge: string;
  architecture: string[];
  technologies: string[];
  repository: string;
}

export const projects: Project[] = [
  {
    id: 'argus',
    number: '01',
    name: 'Argus',
    category: 'ai',
    categoryLabel: 'Computer vision / AI',
    image: `${import.meta.env.BASE_URL}images/argus.jpg`,
    imageAlt: 'Concept artwork of a precision optical lens with cool cyan reflections',
    description: 'Giving video streams a second set of eyes. Intelligent analytics, in real time.',
    overview: 'Argus is the SentinelSight AI video analytics platform: a computer vision and telemetry project built around real-time stream ingestion, automated event detection, and asynchronous frame processing.',
    challenge: 'A continuous video feed produces more information than a person can meaningfully monitor. The challenge is to turn that stream into useful events without coupling the camera connection to every inference task.',
    architecture: [
      'Separate stream ingestion from inference with asynchronous frame queues.',
      'Use OpenCV and YOLO-based pipelines to interpret incoming frames.',
      'Connect anomaly scoring to event telemetry and webhook alerts.',
    ],
    technologies: ['Python', 'OpenCV', 'YOLO', 'PyTorch', 'Video telemetry'],
    repository: `${GITHUB_URL}/Argus`,
  },
  {
    id: 'cerberus',
    number: '02',
    name: 'Cerberus',
    category: 'security',
    categoryLabel: 'Offensive security / Research',
    image: `${import.meta.env.BASE_URL}images/cerberus.jpg`,
    imageAlt: 'Concept artwork of a faceted obsidian shield with signal-orange seams',
    description: 'Know the attack surface. A multi-vector security auditing and intelligence framework.',
    overview: 'Cerberus brings asset discovery, service fingerprinting, and threat intelligence into an extensible security auditing workflow. The aim is to make findings easier to correlate and act on.',
    challenge: 'Reconnaissance tools often answer isolated questions. Connecting exposed services, relevant advisories, and understandable reports creates a more useful picture of an authorized assessment.',
    architecture: [
      'Discover network assets with multi-threaded port and service enumeration.',
      'Correlate service information with CVE advisories and threat intelligence.',
      'Produce structured JSON and SARIF reports for repeatable review.',
    ],
    technologies: ['Python', 'Networking', 'Threat intelligence', 'JSON / SARIF'],
    repository: `${GITHUB_URL}/Cerberus`,
  },
  {
    id: 'ultrone',
    number: '03',
    name: 'Ultrone',
    category: 'ai',
    categoryLabel: 'Autonomous agents / Python',
    image: `${import.meta.env.BASE_URL}images/ultrone.jpg`,
    imageAlt: 'Concept artwork of a metallic neural sphere with subtle violet connections',
    description: 'Beyond one-shot prompts. An autonomous agent architecture that plans, acts, and reflects.',
    overview: 'Ultrone explores a lightweight autonomous agent runtime for multi-step work. State machines, tool calling, and memory management turn a goal into a structured execution loop.',
    challenge: 'A useful agent needs more than a model response. It needs a way to manage state, choose tools, remember context, and recover when the next step does not go as planned.',
    architecture: [
      'Represent the execution lifecycle with context-aware state transitions.',
      'Route tool calls through a controlled, sandbox-oriented execution layer.',
      'Use planning and reflection loops to revisit multi-step decisions.',
    ],
    technologies: ['Python', 'AI agents', 'State machines', 'Tool calling', 'Memory'],
    repository: `${GITHUB_URL}/ultrone`,
  },
];

export const disciplines = [
  {
    title: 'Offensive Security',
    description: 'Think like an attacker. Work like a defender. I explore attack surfaces, test assumptions, and turn weaknesses into a clearer path to stronger systems.',
    tools: ['Kali Linux', 'Burp Suite', 'Nmap', 'Wireshark', 'OWASP'],
    nodes: ['SCOPE', 'RECON', 'VERIFY', 'REPORT'],
    principle: 'AUTHORIZED. ALWAYS.',
  },
  {
    title: 'AI & Autonomous Systems',
    description: 'From computer vision to agents that reason through multi-step tasks, I build practical experiments where intelligence meets useful, controlled automation.',
    tools: ['Python', 'PyTorch', 'OpenCV', 'YOLO', 'Agent runtimes'],
    nodes: ['OBSERVE', 'REASON', 'ACT', 'REFLECT'],
    principle: 'INTELLIGENCE WITH INTENT.',
  },
  {
    title: 'Secure Development',
    description: 'Security is part of the architecture, not a patch at the end. I build web experiences and APIs with least privilege, clear boundaries, and maintainable code.',
    tools: ['TypeScript', 'React', 'Node.js', 'Flask', 'PostgreSQL'],
    nodes: ['DESIGN', 'BUILD', 'TEST', 'HARDEN'],
    principle: 'SECURE BY DESIGN.',
  },
  {
    title: 'Systems & Infrastructure',
    description: 'Understand what runs underneath. Reproducible environments, thoughtful automation, and Linux fundamentals make good ideas dependable in practice.',
    tools: ['Linux', 'Bash', 'Docker', 'Git', 'GitHub Actions'],
    nodes: ['PROVISION', 'ISOLATE', 'MONITOR', 'ITERATE'],
    principle: 'BUILD. OBSERVE. IMPROVE.',
  },
];