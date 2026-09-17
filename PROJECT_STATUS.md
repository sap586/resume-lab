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

PDF generation not yet connected.

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

# Biggest Remaining Task

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

# Next Phase (Phase 8)

Convert:

tex/document.tex

into:

templates/document.tex.j2

Create:

scripts/generate_resume_from_json.py

Goal:

software-resume.json
        ↓
generate_resume_from_json.py
        ↓
generated/document.tex
        ↓
XeLaTeX
        ↓
software.pdf

The same should work for:

- software.pdf
- robotics.pdf
- architect.pdf
- management.pdf

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

Continue from:

PHASE 8

Reuse:

tex/document.tex

Do NOT redesign the resume.

Focus ONLY on:

master-resume.json
        ↓
document.tex.j2
        ↓
generate_resume_from_json.py
        ↓
GitHub Action
        ↓
PDF generation

Ultimate goal:

Generate:

software.pdf

robotics.pdf

architect.pdf

management.pdf

from the same master-resume.json database.
