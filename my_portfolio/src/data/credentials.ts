/**
 * Credentials shown in the "Certifications" section of the portfolio and
 * mirrored in the README.
 *
 * ── How to add a certificate ────────────────────────────────────────────────
 * Each entry renders as a card. Keep the list ordered newest → oldest.
 *
 *   {
 *     id: 'unique-slug',
 *     title: 'Google Cybersecurity Professional Certificate',
 *     issuer: 'Google',
 *     year: '2025',
 *     credentialUrl: 'https://www.coursera.org/verify/XXXXXXXX',
 *     skills: ['SIEM', 'Linux', 'Incident response']
 *   }
 *
 * `credentialUrl` should be the public verification page, never a private
 * dashboard link. The full, continuously updated list lives on LinkedIn and is
 * linked from the section automatically.
 * ───────────────────────────────────────────────────────────────────────────
 */

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface LabProfile {
  id: string;
  name: string;
  handle: string;
  description: string;
  url: string;
  tag: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ibm-ai-for-everyone',
    title: 'AI for Everyone: Master the Basics',
    issuer: 'IBM · edX',
    year: '2026',
    credentialUrl: 'https://courses.edx.org/certificates/6b8b1db8d70b42738296a7ebf0658e58',
    skills: ['Artificial intelligence', 'Machine learning', 'Neural networks']
  },
  {
    id: 'claude-code-101',
    title: 'Claude Code 101 — Course Completion Badge',
    issuer: 'Claude Academy · Anthropic',
    year: '2026',
    credentialUrl: 'https://academy.claude.com/verify/1bee622df7ba6b1c62c37efc304ab429',
    skills: ['Claude Code', 'Agentic workflows', 'Developer tooling']
  }
];

export const LINKEDIN_CREDENTIALS_URL =
  'https://www.linkedin.com/in/beamlak-sintayehu-a47b4b281/details/certifications/';

export const LAB_PROFILES: LabProfile[] = [
  {
    id: 'tryhackme',
    name: 'TryHackMe',
    handle: 'Mr.nobody.',
    description: 'Guided offensive-security rooms, CTF challenges and write-ups across web, recon and crypto.',
    url: 'https://tryhackme.com/p/Mr.nobody.',
    tag: 'Active practitioner'
  },
  {
    id: 'hackthebox',
    name: 'HackTheBox',
    handle: '2355243',
    description: 'Retired and active machines, privilege-escalation paths and red-team style lab work.',
    url: 'https://app.hackthebox.com/users/2355243',
    tag: 'Labs & machines'
  }
];

export const FOCUS_AREAS = [
  'Offensive security',
  'Penetration testing',
  'Web application exploitation',
  'Threat modeling',
  'Threat intelligence',
  'Secure engineering'
];
