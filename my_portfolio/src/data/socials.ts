export interface SocialLink {
  name: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'mail' | 'shield' | 'terminal';
  label: string;
  isEmail?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Mr-Nobody-Anonymous',
    iconName: 'github',
    label: 'github.com/Mr-Nobody-Anonymous'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bam-sintu-a47b4b281/',
    iconName: 'linkedin',
    label: 'linkedin.com/in/bam-sintu'
  },
  {
    name: 'TryHackMe',
    url: 'https://tryhackme.com/p/Nobody001',
    iconName: 'shield',
    label: 'tryhackme.com/p/Nobody001'
  },
  {
    name: 'HackTheBox',
    url: 'https://app.hackthebox.com/users/2355243',
    iconName: 'shield',
    label: 'hackthebox.com/users/2355243'
  },
  {
    name: 'Primary Email',
    url: 'mailto:bmx310712@gmail.com',
    iconName: 'mail',
    label: 'bmx310712@gmail.com',
    isEmail: true
  },
  {
    name: 'Secondary Email',
    url: 'mailto:bam310712@gmail.com',
    iconName: 'mail',
    label: 'bam310712@gmail.com',
    isEmail: true
  }
];
