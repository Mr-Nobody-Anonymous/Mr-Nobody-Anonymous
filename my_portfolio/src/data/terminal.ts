import { PROJECTS } from './projects';
import { SKILLS } from './skills';

export interface CommandOutput {
  type: 'info' | 'success' | 'warning' | 'error' | 'table' | 'banner';
  content: string | string[];
}

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: 'Display all available console commands',
  whoami: 'Print security identity and operational role',
  about: 'Overview of professional background and mission',
  skills: 'List core technical competencies across all sectors',
  projects: 'Print catalog of verified public security tools and repos',
  status: 'Display simulated system telemetry and HUD health',
  scan: 'Execute simulated vulnerability and port scan probe',
  matrix: 'Toggle digital rain canvas speed / effect',
  theme: 'Switch interface HUD palette [green | cyan | crimson]',
  github: 'Display verified GitHub repository and profile links',
  htb: 'Display Hack The Box profile telemetry',
  thm: 'Display TryHackMe profile telemetry',
  contact: 'Print verified communication endpoints and email',
  clear: 'Clear terminal screen buffer'
};

export const COMMAND_LIST = Object.keys(TERMINAL_COMMANDS).concat([
  'sudo',
  '1337',
  'exit'
]);

export function executeCommand(cmdStr: string, setTheme?: (t: 'green' | 'cyan' | 'crimson') => void): CommandOutput {
  const clean = cmdStr.trim().toLowerCase();
  const parts = clean.split(/\s+/);
  const root = parts[0];
  const arg = parts[1];

  switch (root) {
    case 'help':
      return {
        type: 'info',
        content: [
          'AVAILABLE SECURITY TERMINAL COMMANDS:',
          '--------------------------------------------------',
          ...Object.entries(TERMINAL_COMMANDS).map(([cmd, desc]) => `  ${cmd.padEnd(10)} - ${desc}`),
          '--------------------------------------------------',
          'Tip: Use [TAB] for autocompletion, [UP/DOWN] arrows for history.'
        ]
      };

    case 'whoami':
      return {
        type: 'success',
        content: [
          'OPERATOR: Bam Sintu (Mr. Nobody)',
          'ROLE:     Cybersecurity Practitioner & AI Systems Explorer',
          'FOCUS:    Offensive Security, Threat Modeling & Autonomous Tooling',
          'STATUS:   ONLINE & VERIFIED'
        ]
      };

    case 'about':
      return {
        type: 'info',
        content: [
          'MISSION BRIEF:',
          'Cybersecurity practitioner focused on ethical hacking, threat modeling,',
          'and developing intelligent automation tooling. Driven by building robust,',
          'defensible systems by thoroughly understanding real-world offensive vectors.'
        ]
      };

    case 'skills':
      return {
        type: 'table',
        content: [
          'CORE TECHNICAL CAPABILITIES:',
          '--------------------------------------------------',
          ...SKILLS.slice(0, 8).map(s => `  [${s.proficiency.padEnd(9)}] ${s.name.padEnd(30)} ${s.usageScore}% usage`)
        ]
      };

    case 'projects':
      return {
        type: 'table',
        content: [
          'VERIFIED REPOSITORIES & TOOLS:',
          '--------------------------------------------------',
          ...PROJECTS.map(p => `  • ${p.name.padEnd(14)} [${p.language}] - ${p.description}`)
        ]
      };

    case 'status':
      return {
        type: 'info',
        content: [
          '[SIMULATED TELEMETRY / PORTFOLIO HUD]',
          '--------------------------------------------------',
          'CORE RUNTIME:       Vite + React 19 + TypeScript',
          'ANIMATION ENGINE:   Motion for React',
          'NETWORK STATUS:     ENCRYPTED / SECURE',
          'THREAT LEVEL:       NOMINAL (SIMULATED)',
          'ACTIVE REPOSITORIES: 8 public frameworks indexed'
        ]
      };

    case 'scan':
      return {
        type: 'warning',
        content: [
          '[SIMULATION PROBE INITIALIZED]',
          'Target: localhost (127.0.0.1)',
          'Scanning top 1000 ports...',
          'Port 80/tcp    - HTTP (Vite Dev Server)   [OPEN]',
          'Port 443/tcp   - HTTPS (TLS 1.3 Strict)   [OPEN]',
          'Port 22/tcp    - SSH (Public-Key Only)    [FILTERED]',
          'Simulated probe complete: 0 critical vulnerabilities found.'
        ]
      };

    case 'theme':
      if (arg === 'green' || arg === 'cyan' || arg === 'crimson') {
        if (setTheme) setTheme(arg);
        return {
          type: 'success',
          content: `HUD palette updated to: ${arg.toUpperCase()}`
        };
      }
      return {
        type: 'warning',
        content: 'Usage: theme [green | cyan | crimson]'
      };

    case 'github':
      return {
        type: 'success',
        content: [
          'GitHub Profile: https://github.com/Mr-Nobody-Anonymous',
          'Top Repositories: Argus, Orion, Cerberus, ultrone, civiclens'
        ]
      };

    case 'htb':
      return {
        type: 'info',
        content: 'Hack The Box Profile: https://app.hackthebox.com/users/2355243'
      };

    case 'thm':
      return {
        type: 'info',
        content: 'TryHackMe Profile: https://tryhackme.com/p/Nobody001'
      };

    case 'contact':
      return {
        type: 'info',
        content: [
          'SECURE CHANNELS:',
          'Primary:   bmx310712@gmail.com',
          'Secondary: bam310712@gmail.com',
          'LinkedIn:  https://www.linkedin.com/in/bam-sintu-a47b4b281/'
        ]
      };

    case 'sudo':
      return {
        type: 'error',
        content: 'Permission denied: User is not in sudoers file. This incident has been logged.'
      };

    case '1337':
      return {
        type: 'success',
        content: 'h4ck_th3_pl4n3t // Elite status acknowledged. Welcome operator.'
      };

    case 'matrix':
      return {
        type: 'info',
        content: 'Matrix digital rain background active. Toggle theme to adjust color frequency.'
      };

    default:
      return {
        type: 'error',
        content: `Command not found: "${cmdStr}". Type "help" to view available commands.`
      };
  }
}
