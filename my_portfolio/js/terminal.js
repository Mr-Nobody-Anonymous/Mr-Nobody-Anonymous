/* ==========================================================================
   INTERACTIVE CYBER TERMINAL CLI ENGINE (SECURE & SANITIZED)
   ========================================================================== */

class CyberTerminal {
  constructor(containerId, inputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.cmdHelp(),
      whoami: () => this.cmdWhoami(),
      skills: () => this.cmdSkills(),
      projects: () => this.cmdProjects(),
      scan: () => this.cmdScan(),
      thm: () => this.cmdTHM(),
      htb: () => this.cmdHTB(),
      contact: () => this.cmdContact(),
      status: () => this.cmdStatus(),
      matrix: () => this.cmdMatrix(),
      audio: () => this.cmdAudio(),
      theme: (args) => this.cmdTheme(args),
      clear: () => this.cmdClear()
    };

    this.init();
  }

  // Security Helper: Strictly escape any dynamic user input to prevent DOM XSS
  static escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  init() {
    if (!this.input || !this.container) return;

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const fullCmd = this.input.value.trim();
        if (fullCmd) {
          this.executeCommand(fullCmd);
          this.history.push(fullCmd);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete();
      }
    });

    // Auto-focus terminal on click inside container
    this.container.parentElement.addEventListener('click', () => {
      this.input.focus();
    });
  }

  autocomplete() {
    const val = this.input.value.trim().toLowerCase();
    if (!val) return;
    const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(val));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.printLine(`Available commands: ${matches.join(', ')}`, 'term-output');
    }
  }

  executeCommand(commandLine) {
    if (window.AudioEngine) window.AudioEngine.playBeep(980, 0.04);

    // Securely print prompt using textContent
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line term-cmd';
    promptLine.textContent = `guest@mr-nobody:~$ ${commandLine}`;
    this.container.appendChild(promptLine);

    const parts = commandLine.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      const sanitized = CyberTerminal.escapeHTML(cmd);
      this.printLine(`Command not found: '${sanitized}'. Type <span style="color:var(--accent-primary)">help</span> for available directives.`, 'term-output error');
    }

    this.container.scrollTop = this.container.scrollHeight;
  }

  // Print trusted system HTML lines
  printLine(htmlContent, className = 'term-output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = htmlContent;
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  cmdHelp() {
    const list = [
      '<b>SYSTEM DIRECTIVES:</b>',
      '  <span class="text-highlight">whoami</span>    - Display operator background & verified profile',
      '  <span class="text-highlight">skills</span>    - Inspect technical competencies and tools',
      '  <span class="text-highlight">projects</span>  - Browse real public GitHub repositories',
      '  <span class="text-highlight">scan</span>      - Run simulated port reconnaissance sweep',
      '  <span class="text-highlight">thm</span>       - Inspect TryHackMe verification profile',
      '  <span class="text-highlight">htb</span>       - Inspect HackTheBox laboratory profile',
      '  <span class="text-highlight">contact</span>   - Retrieve verified contact endpoints',
      '  <span class="text-highlight">matrix</span>    - Toggle digital rain background animation',
      '  <span class="text-highlight">audio</span>     - Toggle cyber sound synthesis effects',
      '  <span class="text-highlight">theme</span>     - Switch theme: <i>green</i>, <i>cyan</i>, <i>crimson</i>',
      '  <span class="text-highlight">clear</span>     - Purge terminal display'
    ];
    list.forEach(item => this.printLine(item));
  }

  cmdWhoami() {
    const info = [
      '<b>[OPERATOR PROFILE]</b>',
      '  Operator:    <b>Bam Sintu (Mr. Nobody)</b>',
      '  GitHub:      <a href="https://github.com/Mr-Nobody-Anonymous" target="_blank" rel="noopener noreferrer">github.com/Mr-Nobody-Anonymous</a>',
      '  Focus:       Cybersecurity • Red Teaming • AI Systems • Tool Development',
      '  Core Stack:  Python, C/C++, Bash, TypeScript, Linux, Docker',
      '  Labs:        TryHackMe & HackTheBox Active Practitioner',
      '  Status:      Open for Security Research, Auditing & Collaboration'
    ];
    info.forEach(item => this.printLine(item));
  }

  cmdSkills() {
    const skills = [
      '<b>[TECHNICAL CAPABILITIES]</b>',
      '  <b>Offensive:</b> Kali Linux, Metasploit, Burp Suite, Nmap, Wireshark, SQL Injection, XSS, Recon',
      '  <b>Defensive:</b> Threat Modeling, Linux Hardening, Least Privilege, Zero Trust, Log Auditing',
      '  <b>Languages:</b> Python, C, C++, Bash, TypeScript, JavaScript, SQL',
      '  <b>AI & Agents:</b> Multi-Agent Architectures, Automation Pipelines, Computer Vision',
      '  <b>Infra:</b> Docker, Linux System Administration, Git, Node.js, Express'
    ];
    skills.forEach(item => this.printLine(item));
  }

  cmdProjects() {
    const projects = [
      '<b>[VERIFIED PUBLIC REPOSITORIES]</b>',
      '  1. <a href="https://github.com/Mr-Nobody-Anonymous/Argus" target="_blank" rel="noopener noreferrer"><b>Argus</b></a>: SentinelSight AI Video Analytics Platform (Python)',
      '  2. <a href="https://github.com/Mr-Nobody-Anonymous/Cerberus" target="_blank" rel="noopener noreferrer"><b>Cerberus</b></a>: Security Auditing & Intelligence System (Python)',
      '  3. <a href="https://github.com/Mr-Nobody-Anonymous/Orion" target="_blank" rel="noopener noreferrer"><b>Orion</b></a>: Institutional Security & Threat Modeling Platform (Python)',
      '  4. <a href="https://github.com/Mr-Nobody-Anonymous/ultrone" target="_blank" rel="noopener noreferrer"><b>ultrone</b></a>: Autonomous AI Agent Architecture & Task Engine (Python)',
      '  5. <a href="https://github.com/Mr-Nobody-Anonymous/civiclens" target="_blank" rel="noopener noreferrer"><b>civiclens</b></a>: Civic Monitoring & Data Intelligence Platform (Python/Docker)',
      '  6. <a href="https://github.com/Mr-Nobody-Anonymous/fkali" target="_blank" rel="noopener noreferrer"><b>fkali</b></a>: Automated Kali Linux Penetration Testing & Recon Toolkit (Bash)',
      '  7. <a href="https://github.com/Mr-Nobody-Anonymous/rc4" target="_blank" rel="noopener noreferrer"><b>rc4</b></a>: Stream Cipher Implementation in C & Python (Cryptography)',
      '  8. <a href="https://github.com/Mr-Nobody-Anonymous/Capture-Writeup" target="_blank" rel="noopener noreferrer"><b>Capture-Writeup</b></a>: Security CTF Challenge Writeups & Scripts (Python)'
    ];
    projects.forEach(item => this.printLine(item));
  }

  cmdScan() {
    this.printLine('Initializing network recon probe...', 'term-prompt');
    const steps = [
      '[*] Resolving perimeter target [127.0.0.1]... OK',
      '[*] Enumerating ports via SYN sweep...',
      '[*] Port 22/tcp  OPEN  (OpenSSH / Key-based auth required)',
      '[*] Port 80/tcp  OPEN  (HTTP -> 301 Moved Permanently)',
      '[*] Port 443/tcp OPEN  (HTTPS / TLS 1.3 Strict Transport Security)',
      '[+] Recon completed: Strict baseline hardening confirmed.'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        this.printLine(step);
        if (window.AudioEngine) window.AudioEngine.playClick();
      }, (idx + 1) * 320);
    });
  }

  cmdTHM() {
    this.printLine('<b>[TRYHACKME PROFILE]</b>');
    this.printLine('  Handle:      Mr.nobody.');
    this.printLine('  Profile:     <a href="https://tryhackme.com/p/Mr.nobody." target="_blank" rel="noopener noreferrer">tryhackme.com/p/Mr.nobody.</a>');
    this.printLine('  Focus Areas: Web Exploitation, Linux Privilege Escalation, Active Directory, Network Forensics');
  }

  cmdHTB() {
    this.printLine('<b>[HACKTHEBOX PROFILE]</b>');
    this.printLine('  Member ID:   2355243');
    this.printLine('  Profile:     <a href="https://app.hackthebox.com/users/2355243" target="_blank" rel="noopener noreferrer">app.hackthebox.com/users/2355243</a>');
    this.printLine('  Focus Areas: Vulnerability Chaining, Box Rooting, Offensive Labs');
  }

  cmdContact() {
    const comms = [
      '<b>[CONTACT DIRECTORY]</b>',
      '  Email (Primary):   <a href="mailto:bmx310712@gmail.com">bmx310712@gmail.com</a>',
      '  Email (Secondary): <a href="mailto:bam310712@gmail.com">bam310712@gmail.com</a>',
      '  LinkedIn:          <a href="https://www.linkedin.com/in/bam-sintu-a47b4b281/" target="_blank" rel="noopener noreferrer">Bam Sintu</a>',
      '  GitHub:            <a href="https://github.com/Mr-Nobody-Anonymous" target="_blank" rel="noopener noreferrer">github.com/Mr-Nobody-Anonymous</a>',
      '  Discord:           mr.nobody.137'
    ];
    comms.forEach(c => this.printLine(c));
  }

  cmdStatus() {
    this.printLine('<b>[SYSTEM TELEMETRY]</b>');
    this.printLine('  Host Environment: Linux / Kali Tooling');
    this.printLine('  Security Posture: Threat Modeling & Least Privilege');
    this.printLine('  Web Delivery:     HTTPS GitHub Pages Static Bundle');
    this.printLine('  Codebases:        11 Active Repositories on GitHub');
  }

  cmdMatrix() {
    if (window.matrixInstance) {
      const active = window.matrixInstance.toggle();
      this.printLine(`Matrix Rain Canvas: <b>${active ? 'ENABLED' : 'PAUSED'}</b>`);
    } else {
      this.printLine('Matrix engine not found.');
    }
  }

  cmdAudio() {
    if (window.AudioEngine) {
      const isMuted = window.AudioEngine.toggleMute();
      this.printLine(`Cyber Audio Effects: <b>${isMuted ? 'MUTED' : 'ACTIVE'}</b>`);
    }
  }

  cmdTheme(args) {
    const raw = args[0] ? args[0].toLowerCase() : '';
    const themeName = CyberTerminal.escapeHTML(raw);
    if (['green', 'cyan', 'crimson'].includes(themeName)) {
      if (window.setTheme) {
        window.setTheme(themeName);
        this.printLine(`Theme palette switched to: <b>${themeName.toUpperCase()}</b>`);
      }
    } else {
      this.printLine('Usage: theme &lt;green|cyan|crimson&gt;');
    }
  }

  cmdClear() {
    this.container.innerHTML = '';
    this.printLine('Terminal display cleared. Type <span style="color:var(--accent-primary)">help</span> for directives.');
  }
}

window.CyberTerminal = CyberTerminal;
