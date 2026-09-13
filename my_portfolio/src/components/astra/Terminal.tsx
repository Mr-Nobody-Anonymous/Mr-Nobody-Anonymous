import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import { EMAIL, projects, type Project } from '../../data/portfolio';

interface TerminalEntry {
  id: number;
  command: string | null;
  output: string;
  error?: boolean;
}

interface TerminalProps {
  onOpenProject: (project: Project) => void;
  onContact: () => void;
  onToggleMotion: () => void;
  motionEnabled: boolean;
  onExit?: () => void;
  autofocus?: boolean;
}

const welcome: TerminalEntry = {
  id: 0,
  command: 'whoami',
  output: 'Mr. Nobody.\nSecurity practitioner. AI explorer. Perpetually curious.\n\nNo black magic. Just a different way to explore.\nType "help" to see what you can do.',
};

export default function Terminal({ onOpenProject, onContact, onToggleMotion, motionEnabled, onExit, autofocus = false }: TerminalProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>([welcome]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const inputId = useId();

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries]);

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;
    const normalized = command.toLowerCase();
    setHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);
    setInput('');
    let output = '';
    let error = false;

    if (normalized === 'clear') {
      setEntries([]);
      inputRef.current?.focus();
      return;
    }

    switch (normalized) {
      case 'help':
        output = 'AVAILABLE COMMANDS\n\nwhoami          The person behind the handle\nskills          Explore the toolkit\nprojects        List selected projects\nopen <project>  Inspect argus, cerberus, or ultrone\ncontact         Start a conversation\ncat mission.txt Read the philosophy\nmotion          Toggle ambient animation\ndate            Your current local date\nclear           Clear this terminal\nexit            Leave or reset the session\n\nTip: use the up/down arrows for command history.\nThis is a portfolio sandbox, not a real system shell.';
        break;
      case 'whoami':
        output = "Bam Sintu, a.k.a. Mr. Nobody.\n\nA cybersecurity-focused technologist exploring\noffensive security, autonomous AI, and secure systems.\n\nThe name is anonymous. The curiosity isn't.";
        break;
      case 'skills':
        output = 'SECURITY  Kali Linux / Burp Suite / Nmap / Wireshark\nAI        Python / PyTorch / OpenCV / Agent runtimes\nBUILD     React / TypeScript / Node.js / Flask\nSYSTEMS   Linux / Bash / Docker / Git\n\nTools change. The mindset keeps evolving.';
        break;
      case 'projects':
      case 'ls':
        output = '01  argus      Computer vision & video analytics\n02  cerberus   Security auditing & threat intelligence\n03  ultrone    Autonomous agent architecture\n\nType "open argus" to read a case file.';
        break;
      case 'contact':
        output = `Opening a channel.\nDirect contact: ${EMAIL}`;
        onContact();
        break;
      case 'cat mission.txt':
        output = 'STAY CURIOUS. BUILD RESPONSIBLY.\n\nUnderstand before you automate.\nQuestion assumptions, not ethical boundaries.\nTest only with permission. Share what you learn.\nLeave systems stronger than you found them.';
        break;
      case 'motion':
        output = motionEnabled ? 'Ambient motion paused. Preference saved locally.' : 'Ambient motion enabled. Preference saved locally.';
        onToggleMotion();
        break;
      case 'date':
        output = new Date().toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' });
        break;
      case 'pwd':
        output = '/home/visitor/nobody-portfolio';
        break;
      case 'exit':
        if (onExit) onExit();
        else setEntries([welcome]);
        inputRef.current?.focus();
        return;
      default:
        if (normalized.startsWith('open ')) {
          const project = projects.find((item: Project) => item.id === normalized.slice(5).trim());
          if (project) {
            output = `Opening case file ${project.number}: ${project.name}.`;
            onOpenProject(project);
          } else {
            output = 'Project not found. Try: open argus, open cerberus, or open ultrone.';
            error = true;
          }
        } else if (normalized.startsWith('sudo')) {
          output = 'Nice try. Curiosity needs no elevated privileges here.\nType "help" to explore safely.';
        } else {
          output = `Command not found: ${command}\nType "help" for the available commands.`;
          error = true;
        }
    }

    const entry = { id: nextId.current++, command, output, error };
    setEntries((previous) => [...previous.slice(-39), entry]);
    inputRef.current?.focus();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIndex(next);
        setInput(history[history.length - 1 - next]);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next < 0 ? '' : history[history.length - 1 - next]);
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-window-title"><TerminalIcon size={14} /> nobody@portfolio: ~</span>
        <span className="terminal-sandbox"><span /> LOCAL SANDBOX</span>
      </div>
      <div className="terminal-output" ref={outputRef} role="log" aria-live="polite" aria-label="Terminal output">
        {entries.map((entry) => (
          <div className="terminal-entry" key={entry.id}>
            {entry.command && <p className="terminal-command"><span>visitor@nobody:~$</span> {entry.command}</p>}
            <p className={entry.error ? 'terminal-error' : 'terminal-response'}>{entry.output}</p>
          </div>
        ))}
      </div>
      <form className="terminal-input-row" onSubmit={submit}>
        <label htmlFor={inputId}>visitor@nobody:~$</label>
        <input id={inputId} ref={inputRef} data-autofocus={autofocus ? '' : undefined} aria-label="Terminal command" value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); }} onKeyDown={handleKey} placeholder="type help..." autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={120} />
        <button type="submit" aria-label="Run command"><ArrowRight size={17} /></button>
      </form>
      <div className="terminal-suggestions"><span>TRY</span>{['help', 'whoami', 'projects'].map((command) => <button key={command} onClick={() => runCommand(command)}>{command}<ArrowRight size={10} /></button>)}</div>
    </div>
  );
}