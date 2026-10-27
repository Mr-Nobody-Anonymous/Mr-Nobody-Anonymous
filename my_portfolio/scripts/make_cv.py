#!/usr/bin/env python3
"""Build the CV PDF served at /cv.pdf on the portfolio site.

Requires: pip install reportlab
Run:      cd my_portfolio/scripts && python3 make_cv.py   (writes ../public/cv.pdf)
"""
import sys

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

INK = HexColor("#0e1116")
INK_DEEP = HexColor("#07080a")
EMBER = HexColor("#b5762f")
EMBER_SOFT = HexColor("#e9a268")
BONE = HexColor("#f6f3ec")
MUTED = HexColor("#5d636b")
HAIR = HexColor("#dcd6c9")

OUT = sys.argv[1] if len(sys.argv) > 1 else "../public/cv.pdf"

doc = BaseDocTemplate(
    OUT, pagesize=A4,
    leftMargin=15 * mm, rightMargin=15 * mm, topMargin=11 * mm, bottomMargin=11 * mm,
    title="Beamlak Sintayehu — CV", author="Beamlak Sintayehu",
    subject="Cybersecurity · Offensive Security · Applied AI",
    keywords="cybersecurity, penetration testing, application security, AI, Python",
)
FRAME_W = A4[0] - 30 * mm

body = ParagraphStyle("body", fontName="Helvetica", fontSize=8.8, leading=12.4,
                      textColor=HexColor("#232a31"), alignment=TA_JUSTIFY)
small = ParagraphStyle("small", parent=body, fontSize=8.2, leading=11.6, textColor=MUTED)
role = ParagraphStyle("role", parent=body, fontSize=9.4, leading=13, textColor=MUTED)
sec = ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=9.6, leading=12,
                     textColor=INK, spaceBefore=0, spaceAfter=0)
item_title = ParagraphStyle("item", fontName="Helvetica-Bold", fontSize=9.4, leading=12.4, textColor=INK)
item_meta = ParagraphStyle("meta", fontName="Helvetica", fontSize=8, leading=11, textColor=EMBER)
bullet = ParagraphStyle("bullet", parent=body, fontSize=8.6, leading=11.8, leftIndent=9,
                        bulletIndent=1, spaceAfter=1.2)
name = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=24,
                      textColor=BONE, spaceAfter=2)
headline = ParagraphStyle("headline", fontName="Helvetica", fontSize=9.6, leading=13,
                          textColor=EMBER_SOFT, spaceAfter=7)
head_contact = ParagraphStyle("hc", fontName="Helvetica", fontSize=8.4, leading=11.6,
                              textColor=HexColor("#cfd5da"))

story = []


def rule(space_before=4, space_after=5, color=HAIR, thickness=0.7):
    t = Table([[""]], colWidths=[FRAME_W], rowHeights=[0.1])
    t.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, -1), thickness, color),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, space_before), t, Spacer(1, space_after)]


def heading(text, kicker=""):
    cells = [[Paragraph(text.upper(), sec)]]
    if kicker:
        cells[0].append(Paragraph(kicker, ParagraphStyle(
            "k", fontName="Helvetica", fontSize=7.6, leading=10, textColor=MUTED, alignment=2)))
    t = Table(cells, colWidths=[FRAME_W * 0.66, FRAME_W * 0.34])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    out = [Spacer(1, 6), t]
    out += rule(3, 4.5, EMBER_SOFT, 1.1)
    return out


def bullets(items, style=bullet):
    return [Paragraph(i, style, bulletText="—") for i in items]


# ── Header band ─────────────────────────────────────────────────────────────
header_cells = [
    [Paragraph("Beamlak Sintayehu", name)],
    [Paragraph("Cybersecurity · Offensive Security · Applied AI", headline)],
    [Paragraph(
        "Addis Ababa, Ethiopia &nbsp;·&nbsp; bmx310712@gmail.com &nbsp;·&nbsp; "
        "linkedin.com/in/beamlak-sintayehu-a47b4b281 &nbsp;·&nbsp; "
        "github.com/Mr-Nobody-Anonymous &nbsp;·&nbsp; tryhackme.com/p/Mr.nobody.", head_contact)],
]
head = Table(header_cells, colWidths=[FRAME_W])
head.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), INK_DEEP),
    ("LEFTPADDING", (0, 0), (-1, -1), 13), ("RIGHTPADDING", (0, 0), (-1, -1), 13),
    ("TOPPADDING", (0, 0), (0, 0), 12), ("BOTTOMPADDING", (0, 0), (0, 0), 0),
    ("TOPPADDING", (0, 1), (0, 1), 0), ("BOTTOMPADDING", (0, 1), (0, 1), 2),
    ("TOPPADDING", (0, 2), (0, 2), 0), ("BOTTOMPADDING", (0, 2), (0, 2), 12),
]))
story += [head, Spacer(1, 10)]

story.append(Paragraph(
    "Security-minded engineer working across offensive testing and applied AI. I build tooling for "
    "reconnaissance, auditing and autonomous agent execution, and I document what I find so other people "
    "can act on it. Comfortable moving from a scoped assessment through exploitation and reporting, then "
    "into the engineering work that hardens the same systems.", body))

# ── Competencies ────────────────────────────────────────────────────────────
story += heading("Core competencies")
left = [
    "Penetration testing (web, network, Active Directory)",
    "Malware triage, IOC extraction, YARA / Sigma rules",
    "Threat modelling: STRIDE, attack trees, ATT&amp;CK mapping",
    "Digital forensics &amp; incident response",
    "Secure code review and API security testing",
]
right = [
    "Python · TypeScript · C/C++ · Bash · SQL",
    "React / Node services, REST, GraphQL, tRPC",
    "Computer vision: OpenCV, YOLO, PyTorch pipelines",
    "AI agents: tool calling, memory, sandboxed execution",
    "Linux internals, containers, CI/CD, observability",
]
comp = Table(
    [[Paragraph(left[i], small, bulletText="·"), Paragraph(right[i], small, bulletText="·")]
     for i in range(len(left))],
    colWidths=[FRAME_W / 2] * 2)
comp.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
]))
story.append(comp)

# ── Selected work ───────────────────────────────────────────────────────────
story += heading("Selected work", "github.com/Mr-Nobody-Anonymous")
work = [
    ("Argus — SentinelSight", "Python · OpenCV · YOLO · PyTorch",
     "Real-time video analytics: async frame queues decouple ingestion from inference; anomaly scoring "
     "drives event telemetry and alerts."),
    ("Cerberus", "Python · Networking · Threat intelligence",
     "Multi-vector security auditing: asset discovery, service fingerprinting, CVE correlation and "
     "JSON / SARIF reporting."),
    ("ultrone", "Python · Agent state machines · Sandboxing",
     "Autonomous agent execution engine: bounded autonomy, tool calling, sandbox safety protocols."),
    ("Orion", "Threat modelling · Risk assessment",
     "Institutional architecture security framework for mapping attack paths and prioritising controls."),
    ("fkali", "Bash · Kali Linux · Automation",
     "Playbooks that stand up hardened, repeatable penetration-testing environments."),
]
for title, meta, desc in work:
    row = Table([[Paragraph(title, item_title)], [Paragraph(meta, item_meta)], [Paragraph(desc, small)]],
                colWidths=[FRAME_W])
    row.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (0, 0), 2.4), ("BOTTOMPADDING", (0, 0), (0, 0), 0),
        ("TOPPADDING", (0, 1), (0, 1), 0.5), ("BOTTOMPADDING", (0, 1), (0, 1), 1.5),
        ("TOPPADDING", (0, 2), (0, 2), 0), ("BOTTOMPADDING", (0, 2), (0, 2), 2.6),
    ]))
    story.append(row)

# ── Experience ──────────────────────────────────────────────────────────────
story += heading("Focus &amp; experience")
story += [Spacer(1, -1)]
exp = [
    ("2026 — present", "Autonomous AI architecture &amp; threat modelling",
     "Designing the ultrone agent execution engine (state machines, sandboxed tool use) and the Orion "
     "institutional architecture security framework."),
    ("2025", "Computer vision &amp; real-time telemetry",
     "Architected Argus / SentinelSight: asynchronous frame ingestion, detection pipelines, anomaly "
     "eventing over live streams."),
    ("2024", "Security auditing &amp; Linux hardening",
     "Built the Cerberus auditing suite and Kali automation playbooks; hardening and detection work on "
     "Debian-based systems."),
    ("2023", "Cryptography research &amp; systems foundations",
     "Stream-cipher implementation and statistical bias analysis (RC4); offensive playbooks and "
     "cheat-sheet reference material."),
]
for when, what, detail in exp:
    row = Table([[Paragraph(when, item_meta), Paragraph(what, item_title)],
                 ["", Paragraph(detail, small)]],
                colWidths=[24 * mm, FRAME_W - 24 * mm])
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    story.append(row)

# ── Certifications & labs ───────────────────────────────────────────────────
story += heading("Certifications &amp; hands-on practice")
certs = [
    "<b>AI for Everyone: Master the Basics</b> (AI0101EN) — IBM · edX, 2026",
    "<b>Claude Code 101</b> — completion badge, Claude Academy · Anthropic, 2026",
    "Full, continuously updated list: linkedin.com/in/beamlak-sintayehu-a47b4b281/details/certifications/",
]
story += bullets(certs)
story += [Spacer(1, 4)]
story += bullets([
    "Hands-on labs — TryHackMe <b>Mr.nobody.</b> (web exploitation, recon, privilege escalation) · "
    "HackTheBox <b>2355243</b> (retired machines, challenge labs)",
])
story += [Spacer(1, 3)]
story.append(Paragraph(
    "All assessment, lab and reporting work referenced here was performed with explicit authorisation.", ParagraphStyle("note", parent=small, fontSize=7.8, leading=10.6)))

# ── Footer ──────────────────────────────────────────────────────────────────
def draw_footer(canvas, doc_):
    canvas.saveState()
    canvas.setStrokeColor(HAIR)
    canvas.setLineWidth(0.6)
    canvas.line(15 * mm, 9.5 * mm, A4[0] - 15 * mm, 9.5 * mm)
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(15 * mm, 5.5 * mm, "Beamlak Sintayehu — CV")
    canvas.drawRightString(A4[0] - 15 * mm, 5.5 * mm, "Page %d" % doc_.page)
    canvas.restoreState()


doc.addPageTemplates([PageTemplate(
    id="main",
    frames=[Frame(15 * mm, 12 * mm, FRAME_W, A4[1] - 23 * mm, id="f", leftPadding=0,
                  rightPadding=0, topPadding=0, bottomPadding=0)],
    onPage=draw_footer,
)])

doc.build(story)
print("wrote", OUT)
