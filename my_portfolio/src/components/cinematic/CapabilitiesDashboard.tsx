import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Capability {
  id: string;
  name: string;
  percentage: number;
  barBlocks: string;
  category: string;
  tools: string[];
  description: string;
  telemetry: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'cybersecurity',
    name: 'CYBERSECURITY',
    percentage: 92,
    barBlocks: '██████████████████░░',
    category: 'OFFENSIVE / DEFENSIVE RECON',
    tools: ['Wireshark', 'Nmap', 'Suricata', 'AppArmor', 'STRIDE', 'CVE Auditing'],
    description: 'Deconstructing protocol anomalies, perimeter vulnerability mapping, and structural zero-trust defenses.',
    telemetry: 'LATENCY: 1.2ms // KERNEL HOOKS: ACTIVE'
  },
  {
    id: 'ai-systems',
    name: 'AI SYSTEMS',
    percentage: 86,
    barBlocks: '███████████████░░░░░',
    category: 'AGENTIC ARCHITECTURES & CV',
    tools: ['YOLOv8', 'PyTorch', 'OpenCV', 'Autonomous Runtimes', 'TensorRT'],
    description: 'Constructing low-latency computer vision streaming inference and deterministic multi-step agent execution loops.',
    telemetry: 'INFERENCE BUFFER: 14.8ms // STATE MACHINE: NOMINAL'
  },
  {
    id: 'networking',
    name: 'NETWORKING',
    percentage: 90,
    barBlocks: '████████████████░░░░',
    category: 'PROTOCOLS & ENCRYPTED TRANSITS',
    tools: ['TCP/IP Stack', 'BGP Routing', 'WireGuard', 'Packet Dissectors', 'Raw Sockets'],
    description: 'Deep packet inspection, encrypted overlay networks, and low-level protocol debugging across untrusted links.',
    telemetry: 'THROUGHPUT: 10 Gbps // PACKET LOSS: 0.000%'
  },
  {
    id: 'python',
    name: 'PYTHON',
    percentage: 84,
    barBlocks: '██████████████░░░░░░',
    category: 'SYSTEM AUTOMATION & TOOLING',
    tools: ['AsyncIO', 'NumPy', 'Multiprocessing', 'Custom Scanners', 'REST/Sockets'],
    description: 'High-throughput asynchronous backends, real-time video telemetry processors, and deterministic task schedulers.',
    telemetry: 'EVENT LOOP: UVLOOP // GC OVERHEAD: < 1%'
  },
  {
    id: 'linux',
    name: 'LINUX',
    percentage: 91,
    barBlocks: '████████████████░░░░',
    category: 'KERNEL TUNING & ISOLATION',
    tools: ['Kernel Namespaces', 'cgroups v2', 'systemd units', 'Auditd', 'Bash Scripting'],
    description: 'Immutable system architectures, hardened kernel sysctl parameters, and containerized runtime isolation.',
    telemetry: 'ROOT PERIMETER: IMMUTABLE // SELINUX: ENFORCING'
  }
];

export const CapabilitiesDashboard: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<Capability>(CAPABILITIES[0]);
  const [isAnyHovered, setIsAnyHovered] = useState(false);

  return (
    <section
      id="capabilities"
      style={{
        position: 'relative',
        minHeight: '120vh',
        background: '#05070A', // Section 1: primary background #05070A
        padding: '8rem 2rem 6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
        {/* Chapter Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#00E5FF',
              letterSpacing: '0.2em',
              fontWeight: 600
            }}
          >
            02 // CAPABILITIES MATRIX
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(0, 229, 255, 0.2)' }} />
        </motion.div>

        {/* System Dashboard Container (Section 15 & 16) */}
        <div
          style={{
            background: 'rgba(10, 15, 20, 0.88)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            fontFamily: 'var(--font-mono)'
          }}
        >
          {/* Dashboard Header Bar */}
          <div
            style={{
              padding: '1.25rem 2rem',
              borderBottom: '1px solid rgba(0, 229, 255, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0, 229, 255, 0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A3FF12', boxShadow: '0 0 8px #A3FF12' }} />
              <span style={{ color: '#E8F7FF', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.82rem' }}>
                SYSTEM CAPABILITIES DASHBOARD
              </span>
            </div>
            <span style={{ color: '#7F8C9A', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              MODULE: TELEMETRY_v2.6
            </span>
          </div>

          {/* 2-Column Split: Interactive Capability Rows on Left, Dynamic Inspection Readout on Right */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              padding: '2.5rem'
            }}
          >
            {/* Left Column: Interactive Capability Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {CAPABILITIES.map((cap) => {
                const isSelected = hoveredSkill.id === cap.id;
                // If any is hovered and this isn't the selected one, dim it to 0.4 opacity (Section 16)
                const opacity = isAnyHovered && !isSelected ? 0.38 : 1;

                return (
                  <motion.div
                    key={cap.id}
                    onMouseEnter={() => {
                      setHoveredSkill(cap);
                      setIsAnyHovered(true);
                    }}
                    onMouseLeave={() => setIsAnyHovered(false)}
                    data-cursor="INSPECT"
                    style={{
                      padding: '1.2rem 1.5rem',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(0, 229, 255, 0.1)' : 'rgba(5, 7, 10, 0.6)',
                      border: `1px solid ${isSelected ? '#00E5FF' : 'rgba(255, 255, 255, 0.06)'}`,
                      boxShadow: isSelected ? '0 0 25px rgba(0, 229, 255, 0.25)' : 'none',
                      cursor: 'pointer',
                      opacity,
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.6rem'
                      }}
                    >
                      <span
                        style={{
                          color: isSelected ? '#00E5FF' : '#E8F7FF',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          letterSpacing: '0.08em'
                        }}
                      >
                        {cap.name}
                      </span>
                      <span
                        style={{
                          color: isSelected ? '#A3FF12' : '#7F8C9A',
                          fontWeight: 700,
                          fontSize: '0.82rem'
                        }}
                      >
                        {cap.percentage}%
                      </span>
                    </div>

                    {/* Terminal Style Animated Bar */}
                    <div
                      style={{
                        height: '6px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cap.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          height: '100%',
                          background: isSelected
                            ? 'linear-gradient(90deg, #00E5FF, #7C3AED)'
                            : '#00E5FF',
                          boxShadow: isSelected ? '0 0 10px #00E5FF' : 'none'
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Deep Inspection Readout (Section 16) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '2rem',
                  background: 'rgba(5, 7, 10, 0.85)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.05)'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '0.75rem',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: '#00E5FF', fontWeight: 700 }}>
                      INSPECTION // {hoveredSkill.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#A3FF12' }}>ONLINE</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#E8F7FF',
                      margin: '0 0 0.8rem 0'
                    }}
                  >
                    {hoveredSkill.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      lineHeight: '1.7',
                      color: '#7F8C9A',
                      marginBottom: '1.75rem'
                    }}
                  >
                    {hoveredSkill.description}
                  </p>

                  {/* Related Tools Array (Section 16) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: 'rgba(232, 247, 255, 0.5)',
                        letterSpacing: '0.12em',
                        marginBottom: '0.6rem'
                      }}
                    >
                      VERIFIED WEAPONS &amp; FRAMEWORKS
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {hoveredSkill.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.3rem 0.65rem',
                            background: 'rgba(0, 229, 255, 0.08)',
                            border: '1px solid rgba(0, 229, 255, 0.25)',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            color: '#E8F7FF',
                            fontWeight: 600
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subsystem Telemetry Barcode */}
                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.68rem',
                    color: '#7C3AED',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{hoveredSkill.telemetry}</span>
                  <span style={{ color: '#00E5FF' }}>CONFIDENTIAL</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
