#!/usr/bin/env python3
"""Rebuild the CV PDF so it matches the site.

The source CV (Google Drive) was authored with three values that are wrong
everywhere else in this project:
  * LinkedIn  in/bam-sintu-a47b4b281          -> in/beamlak-sintayehu-a47b4b281
  * GitLab    https://www.gitlab.com/...      -> https://gitlab.com/...
  * TryHackMe Nobody001                       -> Mr.nobody.

Everything else is reproduced verbatim from the original.

    pip install reportlab
    python3 make_cv.py ../public/cv.pdf
"""
import sys

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

OUT = sys.argv[1] if len(sys.argv) > 1 else "../public/cv.pdf"

NAVY = HexColor("#1f3864")
NAVY_DEEP = HexColor("#16274a")
LINK = HexColor("#1155cc")
BODY = HexColor("#1a1a1a")
GREY = HexColor("#6b7280")
RULE = HexColor("#c9ced8")

M = 14 * mm
FRAME_W = A4[0] - 2 * M

doc = BaseDocTemplate(
    OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=12 * mm, bottomMargin=12 * mm,
    title="Beamlak Sintayehu — Curriculum Vitae",
    author="Beamlak Sintayehu",
    subject="Cybersecurity · Autonomous AI & Full-Stack Developer",
)


def L(url, text, bold=False, color=LINK):
    """Inline link with the original's underline-blue treatment."""
    weight = "font-weight:bold;" if bold else ""
    return (f'<a href="{url}" color="#{color.hexval()[2:]}"><u>{text}</u></a>')


body = ParagraphStyle("body", fontName="Helvetica", fontSize=8.6, leading=11.6, textColor=BODY)
bullet = ParagraphStyle("bullet", parent=body, leftIndent=10, bulletIndent=1, spaceAfter=1.6)
role = ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.2, leading=11.6, textColor=NAVY,
                      spaceBefore=3.4, spaceAfter=2)
contact = ParagraphStyle("contact", fontName="Helvetica", fontSize=8.4, leading=12, textColor=BODY,
                         alignment=1)
name = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=19, leading=21, textColor=NAVY,
                      alignment=1, spaceAfter=1.5)
tagline = ParagraphStyle("tagline", fontName="Helvetica", fontSize=10.2, leading=13, textColor=BODY,
                         alignment=1, spaceAfter=3.5)
cellp = ParagraphStyle("cell", fontName="Helvetica", fontSize=7.7, leading=9.9, textColor=BODY)
cellb = ParagraphStyle("cellb", parent=cellp, fontName="Helvetica-Bold", textColor=NAVY)

story = []


def bar(text):
    t = Table([[Paragraph(f'<font color="#ffffff"><b>{text}</b></font>',
                          ParagraphStyle("bar", fontName="Helvetica-Bold", fontSize=9.2,
                                         leading=11, textColor=HexColor("#ffffff")))]],
              colWidths=[FRAME_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 3.4), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.4),
    ]))
    return [Spacer(1, 7), t, Spacer(1, 5)]


def bullets(items):
    return [Paragraph(i, bullet, bulletText="•") for i in items]


# ── Header ──────────────────────────────────────────────────────────────────
story.append(Paragraph("Beamlak Sintayehu", name))
story.append(Paragraph("Cybersecurity Engineer&nbsp; | &nbsp;Autonomous AI &amp; Full-Stack Developer",
                       tagline))
story.append(Paragraph(
    f"✉ {L('mailto:bmx310712@gmail.com', 'bmx310712@gmail.com')} &nbsp;•&nbsp; "
    f"☎ {L('tel:+251924097575', '+251924097575')} &nbsp;•&nbsp; "
    f"{L('https://mr-nobody-anonymous.github.io/Mr-Nobody-Anonymous/', 'mr-nobody-anonymous.github.io')}",
    contact))
story.append(Paragraph(
    f"<b>in</b> {L('https://www.linkedin.com/in/beamlak-sintayehu-a47b4b281/', 'in/beamlak-sintayehu-a47b4b281')}"
    f" &nbsp;•&nbsp; <b>GitHub</b> {L('https://github.com/Mr-Nobody-Anonymous', 'github.com/Mr-Nobody-Anonymous')}"
    f" &nbsp;•&nbsp; <b>GitLab</b> {L('https://gitlab.com/bmx310712', 'gitlab.com/bmx310712')}",
    contact))
story.append(Paragraph(
    f"<b>THM</b> {L('https://tryhackme.com/p/Mr.nobody.', 'Mr.nobody.')}"
    f" &nbsp;•&nbsp; <b>HTB</b> {L('https://app.hackthebox.com/users/2355243', '#2355243')}",
    contact))

# ── Summary ─────────────────────────────────────────────────────────────────
story += bar("SUMMARY")
story.append(Paragraph(
    "Cybersecurity-focused software engineer and applied AI systems architect (<b>backend &amp; systems "
    "heavy</b>) with over 4 years of hands-on experience building offensive/defensive security frameworks, "
    "autonomous multi-agent orchestration, computer vision telemetry, and full-stack web applications. Proven "
    "ability to deliver 17+ production-grade open-source platforms and security tools—including "
    f"{L('https://github.com/Mr-Nobody-Anonymous/All-skills', 'All-skills')} (14,855+ modular agent skills "
    "across 251 domains), "
    f"{L('https://github.com/Mr-Nobody-Anonymous/Argus', 'Argus')} (real-time YOLO/OpenCV video analytics), "
    f"{L('https://github.com/Mr-Nobody-Anonymous/Cerberus', 'Cerberus')} (multi-vector vulnerability "
    "auditing), and "
    f"{L('https://github.com/Mr-Nobody-Anonymous/ultrone', 'Ultrone')} (autonomous agent runtime). Selected "
    f"participant in the {L('https://ctc.insa.gov.et/', 'INSA 5th National Cyber Talent Challenge')} "
    "(CTC-912-26). Skilled in Python, TypeScript/React 19, C/C++, Go, Rust, Docker, Linux kernel hardening, "
    "and CI/CD security automation.", body))

# ── Experience ──────────────────────────────────────────────────────────────
story += bar("EXPERIENCE &amp; TECHNICAL LEADERSHIP")

ROLES = [
    ("AI Security &amp; Autonomous Systems Lead, <i>Open-Source AI Ecosystem (GitHub)</i>",
     "01/2026 – Present",
     ["Architected "
      f"{L('https://github.com/Mr-Nobody-Anonymous/All-skills', 'All-skills')}, a Universal Agent Skills OS "
      "indexing <b>14,855+ skills across 251 domains and 15 super-domains</b> for Claude, Cursor, Codex, "
      "Copilot, and Gemini, with cross-OS SHA lockfiles, SkillHub CLI, rootless Docker images, and 202 "
      "pytest/CodeQL/Gitleaks CI gates.",
      "Engineered "
      f"{L('https://github.com/Mr-Nobody-Anonymous/ultrone', 'Ultrone')} and "
      f"{L('https://github.com/Mr-Nobody-Anonymous/EVOLYX', 'EVOLYX')}, autonomous AI research platforms "
      "combining deterministic state-machine execution, sandboxed tool-calling, runtime memory, and gated "
      "LoRA/DPO fine-tuning with FastAPI and Vite/React.",
      "Built "
      f"{L('https://github.com/Mr-Nobody-Anonymous/Orion', 'Orion')} (quantitative financial intelligence "
      f"&amp; institutional security framework), {L('https://github.com/Mr-Nobody-Anonymous/mirror', 'Project MIRROR')} "
      "(fault-injection &amp; multi-armed bandit crash simulator for AI agents), and "
      f"{L('https://github.com/Mr-Nobody-Anonymous/phantom', 'Project PHANTOM')} (causal failure "
      "minimization for Raft microservices)."]),

    ("Cybersecurity Engineer (Cohort CTC-912-26), <i>INSA 5th Cyber Talent Summer Camp</i>",
     "08/2026 – Present",
     ["Selected for the Information Network Security Administration (INSA) 5th National Cyber Talent "
      f"Challenge on the Ethiopian National Cyber Range ({L('https://ncrp.et/player/invitations', 'ncrp.et')}), "
      "collaborating on national cyber defense systems.",
      "Co-engineered "
      f"{L('https://github.com/AbeniYirgalem/ETHIO-CYBERGUARD', 'ETHIO-CYBERGUARD')}, an AI-assisted "
      "cybersecurity threat detection and automated incident response platform with continuous GitHub "
      "Actions CI verification, STRIDE threat modeling, and automated triage."]),

    ("Computer Vision &amp; Full-Stack Developer, <i>Independent AI &amp; Civic Tech Projects</i>",
     "01/2025 – 12/2025",
     ["Developed "
      f"{L('https://github.com/Mr-Nobody-Anonymous/Argus', 'Argus')} (SentinelSight AI), a real-time video "
      "analytics platform decoupling stream ingestion from inference via Python AsyncIO queues, OpenCV, "
      "PyTorch, and YOLO pipelines with webhook anomaly alerts.",
      "Built "
      f"{L('https://github.com/Mr-Nobody-Anonymous/civiclens', 'CivicLens')} (civic issue reporting with "
      f"100% local AI triage), {L('https://github.com/Mr-Nobody-Anonymous/plaq-os', 'Plaq OS')} "
      "(fault-tolerant quantum resource optimizer), and "
      f"{L('https://github.com/Mr-Nobody-Anonymous/arena-ai-android', 'Arena AI Android')} (standalone "
      "Java/Android client with hardened WebView architecture)."]),

    ("Offensive Security Researcher &amp; Tooling Developer, <i>TryHackMe &amp; HackTheBox Labs</i>",
     "01/2023 – 12/2024",
     ["Designed "
      f"{L('https://github.com/Mr-Nobody-Anonymous/Cerberus', 'Cerberus')}, an autonomous multi-agent cyber "
      "orchestrator and multi-vector vulnerability auditing suite uniting multi-threaded port/service "
      "enumeration, CVE correlation, local lab wargames, and JSON/SARIF reporting.",
      "Authored "
      f"{L('https://github.com/Mr-Nobody-Anonymous/fkali', 'fkali')} Bash playbooks for Kali Linux "
      "provisioning and systemd/kernel hardening, implemented C/Python "
      f"{L('https://github.com/Mr-Nobody-Anonymous/rc4', 'RC4')} stream cipher cryptanalysis, and published "
      f"CTF walkthroughs ({L('https://github.com/Mr-Nobody-Anonymous/tryhackme-write-ups', 'tryhackme-write-ups')}, "
      f"{L('https://github.com/Mr-Nobody-Anonymous/Capture-Writeup', 'Capture-Writeup')})."]),

    ("IT Lab Systems Technician &amp; Peer Mentor, <i>Adama High School (Adama, Ethiopia)</i>",
     "09/2022 – 06/2024",
     ["Voluntarily diagnosed and repaired critical school computer lab workstation hardware and OS failures "
      "ahead of national practical examinations, and led peer-tutoring sessions on programming logic and "
      "algorithmic debugging."]),
]

for head, dates, items in ROLES:
    t = Table([[Paragraph(head, role),
                Paragraph(f'<font color="#1f3864">{dates}</font>',
                          ParagraphStyle("d", fontName="Helvetica", fontSize=8.2, leading=11.6,
                                         alignment=2, textColor=NAVY))]],
              colWidths=[FRAME_W * 0.74, FRAME_W * 0.26])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 3.2), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.4),
    ]))
    story.append(t)
    story += bullets(items)

# ── Page 2: skills table ────────────────────────────────────────────────────
from reportlab.platypus import PageBreak
story.append(PageBreak())

story += bar("TECHNICAL SKILLS")

SKILLS = [
    ("Cybersecurity &amp; SecOps",
     "Kali Linux, Burp Suite, Nmap, Wireshark, Metasploit, OWASP Top 10, STRIDE Threat Modeling, Packet "
     "Dissection, SARIF/CVE Correlation, CodeQL, Gitleaks, Prompt Injection Defense"),
    ("Programming Languages",
     "Python (AsyncIO, FastAPI, PyTorch, OpenCV), TypeScript, JavaScript, C, C++, C#, Go, Rust, Java (Android), "
     "x86 Assembly, Bash / Shell, PowerShell, SQL, PHP, HTML5 / CSS3"),
    ("AI &amp; Autonomous Agents",
     "Agentic State Machines, Swarm Intelligence, Multi-Agent Orchestration, YOLO Computer Vision, LoRA &amp; "
     "DPO Fine-Tuning, Multi-Armed Bandits, MCP &amp; Universal Skill Registries"),
    ("Web, DevOps &amp; Systems",
     "React 19, Next.js, Vite, Node.js, Express, Flask, Docker (Rootless Images, Compose, Hadolint), Linux "
     "Kernel Namespaces &amp; Systemd, Git, GitHub Actions CI/CD, Ruff, Mypy, Pytest"),
]
rows = [[Paragraph("Domain", cellb), Paragraph("Technologies, Frameworks &amp; Security Tooling", cellb)]]
rows += [[Paragraph(d, cellb), Paragraph(t, cellp)] for d, t in SKILLS]
t = Table(rows, colWidths=[FRAME_W * 0.235, FRAME_W * 0.765])
t.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
    ("LINEBELOW", (0, 0), (-1, 0), 0.9, NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
]))
story.append(t)

# ── Page 2: projects table ──────────────────────────────────────────────────
story += bar("COMPLETE PROJECT &amp; REPOSITORY PORTFOLIO")

GH = "https://github.com/Mr-Nobody-Anonymous"
PROJECTS = [
    (L(f"{GH}/All-skills", "All-skills"), "Python, JS, Docker",
     "Universal Agent Skills OS with 14,855+ skills across 251 domains &amp; 15 super-domains, SHA lockfile "
     "integrity, SkillHub CLI, and 202-test CI suite."),
    (L("https://github.com/AbeniYirgalem/ETHIO-CYBERGUARD", "ETHIO-CYBERGUARD"), "Python, AI SecOps",
     "AI-assisted cybersecurity threat detection and automated incident response platform built during the "
     "INSA 5th Cyber Talent Camp (CTC-912-26)."),
    (L(f"{GH}/Argus", "Argus (SentinelSight)"), "Python, OpenCV, YOLO",
     "Real-time video analytics platform separating stream ingestion from PyTorch/YOLO inference via async "
     "queues with webhook telemetry alerts."),
    (L(f"{GH}/Cerberus", "Cerberus"), "Python, Threat Intel",
     "Autonomous self-evolving multi-agent cyber orchestrator and multi-vector security auditing suite for "
     "port/service enumeration and SARIF/CVE output."),
    (L(f"{GH}/ultrone", "Ultrone") + " &amp; " + L(f"{GH}/EVOLYX", "EVOLYX"), "Python, FastAPI, LoRA",
     "Self-evolving swarm intelligence runtime (Ultrone) and continual AI research platform with runtime "
     "memory and gated LoRA/DPO fine-tuning (EVOLYX)."),
    (L(f"{GH}/Orion", "Orion") + " &amp; " + L(f"{GH}/plaq-os", "Plaq OS"), "Python, Quant &amp; Quantum",
     "Autonomous financial intelligence and institutional security brain (Orion); fault-tolerant quantum "
     "resource optimizer and execution planner (Plaq OS)."),
    (L(f"{GH}/mirror", "MIRROR") + " &amp; " + L(f"{GH}/phantom", "PHANTOM"), "Python, Distributed Sys",
     "Multi-armed bandit fault-injection simulator for AI agents (MIRROR) and causal failure-reconstruction "
     "engine for Raft microservices (PHANTOM)."),
    (L(f"{GH}/civiclens", "CivicLens"), "Python, Local AI",
     "Civic intelligence platform for Ethiopian municipal issue reporting with 100% local AI triage and "
     "transparent resolution tracking."),
    (L(f"{GH}/arena-ai-android", "arena-ai-android"), "Java, Android, Express",
     f"Standalone Android client for {L('https://arena.ai', 'Arena (arena.ai)')} featuring hardened WebView "
     "controls and automated CI dependency auditing."),
    (L(f"{GH}/daily-git-digest", "daily-git-digest") + " &amp; "
     + L("https://mr-nobody-anonymous.github.io/Mr-Nobody-Anonymous/", "Portfolio"), "Python, React 19, TS",
     "Autonomous daily Git commit auditor and release-notes pipeline (daily-git-digest); dark-mode React "
     "19/TypeScript interactive portfolio."),
    (L(f"{GH}/fkali", "fkali") + ", " + L(f"{GH}/rc4", "rc4") + " &amp; " + L(f"{GH}/Capture-Writeup", "CTF Write-ups"),
     "Bash, C, Python, Crypto",
     f"Kali Linux automation playbooks (fkali), C/Python RC4 stream cipher CLI (rc4), and offensive CTF "
     f"walkthroughs ({L('https://tryhackme.com/p/Mr.nobody.', 'THM')} &amp; Capture-Writeup)."),
]
rows = [[Paragraph("Project / Repository", cellb), Paragraph("Stack &amp; Focus", cellb),
         Paragraph("Architecture &amp; Key Contributions", cellb)]]
rows += [[Paragraph(p, cellb), Paragraph(s, cellp), Paragraph(d, cellp)] for p, s, d in PROJECTS]
t = Table(rows, colWidths=[FRAME_W * 0.19, FRAME_W * 0.185, FRAME_W * 0.625])
t.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -1), 0.5, RULE),
    ("LINEBELOW", (0, 0), (-1, 0), 0.9, NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ("TOPPADDING", (0, 0), (-1, -1), 2.8), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
]))
story.append(t)

# ── Page 2: education ───────────────────────────────────────────────────────
story += bar("EDUCATION, CERTIFICATIONS &amp; CYBER RANGES")
story += bullets([
    "<b>Addis Ababa University (EiABC — College of Technology and Built Environment)</b>: B.Sc. Undergraduate "
    "Studies (ID: UGR/5194/17), Addis Ababa, Ethiopia (2024 – Present).",
    "<b>Adama High School</b>: Ethiopian Secondary School Leaving Certificate (ESSLCE: <b>492/600</b> — "
    "Chemistry 92, Mathematics 91, Biology 88, Physics 77, SAT 77), Adama, Ethiopia (Graduated 2024).",
    "<b>INSA 5th National Cyber Talent Summer Camp &amp; TCM Security Academy</b>: National Cyber Range "
    "Practitioner (Cohort CTC-912-26); pursuing PNPT, PAPA (Practical AI Pentest Associate), PJPT, and PSAA "
    f"tracks; Active on {L('https://tryhackme.com/p/Mr.nobody.', 'TryHackMe (Mr.nobody.)')} &amp; "
    f"{L('https://app.hackthebox.com/users/2355243', 'HackTheBox (#2355243)')}.",
])


def footer(canvas, doc_):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(GREY)
    canvas.drawRightString(A4[0] - M, 7 * mm, str(doc_.page))
    canvas.restoreState()


doc.addPageTemplates([PageTemplate(
    id="main",
    frames=[Frame(M, 11 * mm, FRAME_W, A4[1] - 23 * mm, id="f", leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)],
    onPage=footer,
)])
doc.build(story)
print("wrote", OUT)
