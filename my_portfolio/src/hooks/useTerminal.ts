import { useState, useCallback } from 'react';
import { executeCommand, COMMAND_LIST, type CommandOutput } from '../data/terminal';

export interface TerminalEntry {
  id: string;
  command?: string;
  output: CommandOutput;
  timestamp: string;
}

export function useTerminal(setTheme?: (t: 'green' | 'cyan' | 'crimson') => void) {
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      output: {
        type: 'banner',
        content: [
          '╔══════════════════════════════════════════════════════════════╗',
          '║  MR. NOBODY // CYBERSECURITY INTELLIGENCE TERMINAL v2.4      ║',
          '║  Type "help" to display operational commands.                ║',
          '╚══════════════════════════════════════════════════════════════╝'
        ]
      },
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputVal, setInputVal] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');

  const handleInputChange = useCallback((val: string) => {
    setInputVal(val);
    const trimmed = val.trim().toLowerCase();
    if (trimmed.length > 0) {
      const match = COMMAND_LIST.find(cmd => cmd.startsWith(trimmed) && cmd !== trimmed);
      setSuggestion(match ? match.slice(trimmed.length) : '');
    } else {
      setSuggestion('');
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = inputVal.trim().toLowerCase();
      if (trimmed.length > 0) {
        const match = COMMAND_LIST.find(cmd => cmd.startsWith(trimmed));
        if (match) {
          setInputVal(match);
          setSuggestion('');
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
      setSuggestion('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
      setSuggestion('');
    }
  }, [inputVal, commandHistory, historyIndex]);

  const submitCommand = useCallback((cmdToRun?: string) => {
    const raw = cmdToRun !== undefined ? cmdToRun : inputVal;
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      setSuggestion('');
      setHistoryIndex(-1);
      return;
    }

    const output = executeCommand(trimmed, setTheme);
    const newEntry: TerminalEntry = {
      id: `${Date.now()}-${Math.random()}`,
      command: trimmed,
      output,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newEntry]);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInputVal('');
    setSuggestion('');
  }, [inputVal, setTheme]);

  return {
    history,
    inputVal,
    suggestion,
    handleInputChange,
    handleKeyDown,
    submitCommand,
    clearHistory: () => setHistory([])
  };
}
