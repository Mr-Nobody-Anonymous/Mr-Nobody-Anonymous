export interface TimelineItemData {
  year: string;
  tag: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'CURRENT' | 'COMPLETED';
}

export const EXPERIENCE_TIMELINE: TimelineItemData[] = [
  {
    year: '2026',
    tag: 'OPERATIONAL FOCUS',
    title: 'Autonomous AI Architecture & Threat Modeling',
    description: 'Engineering the ultrone autonomous agent execution engine with sandbox safety protocols and building the Orion institutional architecture security framework.',
    technologies: ['Python', 'Agent State Machines', 'Threat Modeling', 'Risk Assessment'],
    status: 'CURRENT'
  },
  {
    year: '2025',
    tag: 'TELEMETRY & VISION',
    title: 'Computer Vision & Real-time Video Telemetry',
    description: 'Architected Argus (SentinelSight), a high-speed video analytics platform with asynchronous frame queues and anomaly event triggers.',
    technologies: ['Python', 'OpenCV', 'Deep Learning', 'Real-time Telemetry'],
    status: 'COMPLETED'
  },
  {
    year: '2024',
    tag: 'OFFENSIVE SECURITY',
    title: 'Security Auditing Suites & Linux Hardening',
    description: 'Created Cerberus multi-vector vulnerability auditing tool and built Kali Linux automation playbooks (fkali) for rapid penetration testing environment provisioning.',
    technologies: ['Python', 'Bash', 'Kali Linux', 'Vulnerability Auditing'],
    status: 'COMPLETED'
  },
  {
    year: '2023',
    tag: 'FOUNDATIONS',
    title: 'Cryptography Research & System Fundamentals',
    description: 'Explored stream cipher implementations and statistical bias analysis in RC4; compiled hands-on offensive playbooks and cheat sheets across All-skills.',
    technologies: ['C/C++', 'Python', 'Cryptography', 'Network Protocols'],
    status: 'COMPLETED'
  }
];
