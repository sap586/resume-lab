# Resume Lab - Project Status

Repository

https://github.com/sap586/resume-lab

GitHub Pages

https://sap586.github.io/resume-lab/

---

# Original Goal

Create a web-based resume builder that allows resume editing and PDF generation from any device without requiring:

- Personal computer
- MiKTeX
- TeX Live
- Local LaTeX installation

Desired workflow:

Resume CMS
    ↓
Select Resume Type
    ↓
Generate PDF
    ↓
Download PDF

---

# Completed

## Infrastructure

✅ GitHub Repository Created

✅ GitHub Pages Enabled

✅ GitHub Actions Working

✅ XeLaTeX Working

✅ Existing Resume PDF Successfully Generated Through GitHub Actions

✅ Existing document.tex Successfully Compiles On GitHub

---

## Resume CMS

✅ GitHub Pages Resume CMS Created

✅ Master Resume Database Created

✅ Tag-Based Resume Filtering Implemented

✅ Resume Types

- Software
- Robotics
- Architect
- Management

---

## Editing Features

✅ Edit Company

✅ Edit Position

✅ Edit Bullet

✅ Add Company

✅ Delete Company

✅ Add Bullet

✅ Delete Bullet

✅ Tag Editor

Tags:

- software
- robotics
- architect
- management

---

## Export Features

✅ Download Master JSON

✅ Download Filtered JSON

---

# Current Architecture

master-resume.json
        ↓
Resume CMS
        ↓
Filter By Tags
        ↓
Filtered Resume JSON

PDF generation is connected through the GitHub Actions workflow. The website editor and PDF workflow are still separate.

---

# Current Repository Structure

resume-lab/

.github/
└── workflows/
    ├── build.yml
    └── build-from-json.yml

docs/
├── index.html
├── app.js
├── styles.css
│
├── data/
│   ├── master-resume.json
│   └── resume.json

data/
├── master-resume.json
└── resume.json

generated/

scripts/
└── generate_tex.py

templates/
├── software.tex.j2
├── robotics.tex.j2
├── architect.tex.j2
└── management.tex.j2

tex/
├── document.tex
├── NYU.png
└── UIC.png

---

# Important GitHub Pages Discovery

GitHub Pages only serves files that exist inside:

docs/

Therefore:

docs/data/master-resume.json

must exist.

Current app.js fetches:

fetch('./data/master-resume.json')

NOT:

fetch('../data/master-resume.json')

---

# Current Website State

Website:

https://sap586.github.io/resume-lab/

Capabilities:

✅ Statistics

Companies Count

Bullets Count

✅ Resume Type Selector

Software

Robotics

Architect

Management

✅ Edit Bullet Text

✅ Edit Company

✅ Edit Position

✅ Modify Tags

✅ Add/Delete Bullet

✅ Add/Delete Company

✅ Download Master JSON

✅ Download Filtered JSON

---

# Master Resume Database

Current companies:

1. Universal Instruments

2. Nor-Cal Controls

3. Mini-Circuits

4. Prima Automation

5. RevMax Fleet Optimization

6. NYU STEM Programs

Each bullet contains tags.

Example:

{
  "text": "Built wafer-to-board mapping system",
  "tags": [
    "software",
    "architect"
  ]
}

Filtering logic:

Software Resume:
    software-tagged bullets

Robotics Resume:
    robotics-tagged bullets

Architect Resume:
    architect-tagged bullets

Management Resume:
    management-tagged bullets

---

# Existing Resume Template

Current LaTeX template:

tex/document.tex

IMPORTANT:

Do not redesign the resume.

Reuse the exact existing format.

Preserve:

- Layout
- Styling
- Icons
- Images
- Sections
- Fonts
- Header

---

# PDF Generation Pipeline

Connect:

master-resume.json
        ↓
Filtered Resume
        ↓
Existing LaTeX Template
        ↓
XeLaTeX
        ↓
PDF

---

# Completed Phase 8

The new generator:

master-resume.json

filters bullets by tag and creates:

templates/resume.tex.j2

The workflow compiles four outputs:

software.pdf

robotics.pdf

architect.pdf

management.pdf

Text is escaped for LaTeX before rendering. The generated template is portable and functional; exact visual parity with tex/document.tex remains a follow-up task.

# Remaining Product Work

The website editor runs in the browser. Download the updated master JSON, replace data/master-resume.json, and push the change. GitHub Actions then rebuilds and publishes the four PDFs in docs/pdfs/.

---

# End Goal

From:

https://sap586.github.io/resume-lab/

User should be able to:

1. Edit resume data

2. Edit tags

3. Choose resume type

4. Generate PDF

5. Download PDF

without requiring:

- Home computer
- MiKTeX
- TeX Live

---

# Instructions For Next Copilot Session

Focus on the website save workflow and the user-facing PDF download experience. Preserve the existing resume design when improving the template.
