import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TerminalLine {
  text: string;
  type: 'cmd' | 'output' | 'success' | 'highlight';
}

export const StoryTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [hasTriggered, setHasTriggered] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const runScriptedSequence = () => {
    if (hasTriggered) return;
    setHasTriggered(true);

    const script: { delay: number; line: TerminalLine }[] = [
      { delay: 300, line: { text: '$ whoami', type: 'cmd' } },
      { delay: 600, line: { text: 'mr-nobody', type: 'output' } },
      { delay: 1100, line: { text: '$ cat /mindset.txt', type: 'cmd' } },
      { delay: 1400, line: { text: 'Curiosity.\nDiscipline.\nExperimentation.\nPersistence.', type: 'highlight' } },
      { delay: 2000, line: { text: '$ ./explore.sh', type: 'cmd' } },
      { delay: 2300, line: { text: '[+] VERIFYING SECURITY PERIMETER... OK\n[+] DECRYPTING ARCHITECTURAL BLUEPRINTS...\n[+] ACCESS GRANTED', type: 'success' } }
    ];

    script.forEach(({ delay, line }) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, delay);
    });
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { text: `$ ${cmd}`, type: 'cmd' }]);
    setInputVal('');

    setTimeout(() => {
      if (cmd === 'help') {
        setLines((prev) => [
          ...prev,
          { text: 'AVAILABLE COMMANDS: whoami, mindset, projects, skills, contact, clear', type: 'output' }
        ]);
      } else if (cmd === 'whoami') {
        setLines((prev) => [...prev, { text: 'mr-nobody // Cybersecurity Practitioner & AI Systems Explorer', type: 'output' }]);
      } else if (cmd === 'mindset') {
        setLines((prev) => [...prev, { text: 'Curiosity. Discipline. Experimentation. Persistence.', type: 'highlight' }]);
      } else if (cmd === 'projects') {
        setLines((prev) => [...prev, { text: 'Verified Artifacts: Argus, Orion, Cerberus, ultrone, civiclens, fkali, rc4', type: 'output' }]);
      } else if (cmd === 'clear') {
        setLines([]);
      } else {
        setLines((prev) => [...prev, { text: `bash: ${cmd}: command not found. Type 'help' for options.`, type: 'output' }]);
      }
    }, 150);
  };

  return (
    <section
      id="terminal-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#05070A',
        padding: '6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: '850px', width: '100%', margin: '0 auto' }}>
        {/* Chapter Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00F5FF', letterSpacing: '0.2em' }}>
            03.5 // TERMINAL REVEAL
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(0, 245, 255, 0.2)' }} />
        </div>

        {/* Story Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          onViewportEnter={runScriptedSequence}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          ref={terminalRef}
          style={{
            background: 'rgba(5, 7, 10, 0.95)',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 245, 255, 0.1)',
            overflow: 'hidden',
            fontFamily: 'var(--font-mono)'
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1.25rem',
              background: 'rgba(10, 15, 23, 0.9)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: '#7D8795', letterSpacing: '0.08em' }}>
              mrnobody@mindset:~ (bash)
            </span>
            <span style={{ fontSize: '0.65rem', color: '#A3FF12' }}>SESSION ACTIVE</span>
          </div>

          {/* Terminal Console Output */}
          <div
            style={{
              padding: '1.75rem',
              minHeight: '260px',
              fontSize: '0.85rem',
              lineHeight: '1.8',
              color: '#F5F7FA'
            }}
          >
            {lines.map((item, idx) => {
              if (item.type === 'cmd') {
                return (
                  <div key={idx} style={{ color: '#00F5FF', fontWeight: 600 }}>
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'highlight') {
                return (
                  <div
                    key={idx}
                    style={{
                      color: '#F5F7FA',
                      paddingLeft: '1rem',
                      borderLeft: '2px solid #8B5CF6',
                      margin: '0.35rem 0',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'success') {
                return (
                  <div key={idx} style={{ color: '#A3FF12', whiteSpace: 'pre-line', margin: '0.35rem 0' }}>
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} style={{ color: '#7D8795', whiteSpace: 'pre-line' }}>
                  {item.text}
                </div>
              );
            })}

            {/* Interactive Prompt Input */}
            <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', marginTop: '0.75rem' }}>
              <span style={{ color: '#00F5FF', marginRight: '0.5rem' }}>$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help' or command..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
