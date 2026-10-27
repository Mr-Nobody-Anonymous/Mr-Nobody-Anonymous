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
    tag: 'AI SECURITY & AUTONOMOUS SYSTEMS LEAD · 01/2026 — PRESENT',
    title: 'Agent skills OS & autonomous AI research',
    description:
      'Architected All-skills, a Universal Agent Skills OS indexing 14,855+ skills across 251 domains and 15 super-domains for Claude, Cursor, Codex, Copilot and Gemini — cross-OS SHA lockfiles, SkillHub CLI, rootless Docker images and 202 pytest/CodeQL/Gitleaks CI gates. Engineered Ultrone and EVOLYX (deterministic state machines, sandboxed tool-calling, runtime memory, gated LoRA/DPO fine-tuning) plus Orion, MIRROR and PHANTOM.',
    technologies: ['Python', 'FastAPI', 'Docker', 'LoRA / DPO', 'GitHub Actions'],
    status: 'CURRENT'
  },
  {
    year: '2026',
    tag: 'CYBERSECURITY ENGINEER · INSA 5TH CYBER TALENT CAMP · CTC-912-26 · 08/2026 — PRESENT',
    title: 'National cyber range & automated incident response',
    description:
      'Selected for the Information Network Security Administration 5th National Cyber Talent Challenge on the Ethiopian National Cyber Range (ncrp.et), collaborating on national cyber defense systems. Co-engineered ETHIO-CYBERGUARD: AI-assisted threat detection and automated incident response with continuous CI verification, STRIDE threat modeling and automated triage.',
    technologies: ['Threat Detection', 'STRIDE', 'Incident Response', 'AI SecOps'],
    status: 'CURRENT'
  },
  {
    year: '2025',
    tag: 'COMPUTER VISION & FULL-STACK DEVELOPER · INDEPENDENT · 01/2025 — 12/2025',
    title: 'Computer vision & real-time video telemetry',
    description:
      'Built Argus (SentinelSight AI), decoupling stream ingestion from inference through Python AsyncIO queues, OpenCV, PyTorch and YOLO pipelines with webhook anomaly alerts. Also shipped CivicLens (municipal issue reporting with fully local AI triage), Plaq OS and Arena AI Android.',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'YOLO', 'React'],
    status: 'COMPLETED'
  },
  {
    year: '2023',
    tag: 'OFFENSIVE SECURITY RESEARCHER & TOOLING · THM & HTB LABS · 01/2023 — 12/2024',
    title: 'Security auditing suites & Linux hardening',
    description:
      'Designed Cerberus, an autonomous multi-agent cyber orchestrator and multi-vector auditing suite uniting multi-threaded enumeration, CVE correlation, local wargames and JSON/SARIF reporting. Authored fkali Kali provisioning playbooks, implemented C/Python RC4 stream-cipher cryptanalysis, and published CTF walkthroughs.',
    technologies: ['Python', 'Bash', 'C', 'Kali Linux', 'SARIF'],
    status: 'COMPLETED'
  },
  {
    year: '2022',
    tag: 'IT LAB SYSTEMS TECHNICIAN & PEER MENTOR · ADAMA HIGH SCHOOL · 09/2022 — 06/2024',
    title: 'Lab hardware repair & peer tutoring',
    description:
      'Voluntarily diagnosed and repaired school computer lab workstation hardware and OS failures ahead of national practical examinations, and led peer-tutoring sessions on programming logic and algorithmic debugging.',
    technologies: ['Hardware Diagnostics', 'OS Recovery', 'Teaching'],
    status: 'COMPLETED'
  }
];

export interface EducationItemData {
  institution: string;
  programme: string;
  detail: string;
  period: string;
}

export const EDUCATION: EducationItemData[] = [
  {
    institution: 'Addis Ababa University — EiABC',
    programme: 'B.Sc. Undergraduate Studies',
    detail: 'College of Technology and Built Environment · Student ID UGR/5194/17',
    period: '2024 — Present'
  },
  {
    institution: 'Adama High School',
    programme: 'Ethiopian Secondary School Leaving Certificate',
    detail: 'ESSLCE 492/600 — Chemistry 92 · Mathematics 91 · Biology 88 · Physics 77',
    period: 'Graduated 2024'
  }
];
