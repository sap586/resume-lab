# Resume Lab - Project Status & Handoff

**Date:** 2026-09-18

## Repository

https://github.com/sap586/resume-lab

## GitHub Pages

https://sap586.github.io/resume-lab/

---

# Original Goal

Build a browser-based Resume CMS that allows:

```text
Edit Resume
    ↓
Generate PDF
    ↓
Download PDF
```

without requiring:

- Local PC
- MiKTeX
- TeX Live
- Local LaTeX installation

Everything should work from:

- Phone
- Tablet
- Browser

---

# Current Status

## Infrastructure

Completed.

```text
✅ GitHub Repository
✅ GitHub Pages
✅ GitHub Actions
✅ XeLaTeX
✅ PDF Generation
✅ PDF Publishing
✅ GitHub API Integration
✅ PAT Authentication
```

---

# Resume CMS

Completed.

## Editing

```text
✅ Edit Company
✅ Edit Position
✅ Edit Bullet
✅ Add Company
✅ Delete Company
✅ Add Bullet
✅ Delete Bullet
✅ Edit Tags
```

---

## Resume Types

```text
✅ Software
✅ Robotics
✅ Architect
✅ Management
```

---

# Tag Behavior

Final behavior:

```text
Checkbox Checked
    ↓
Tag Added

Checkbox Unchecked
    ↓
Tag Removed

Delete Bullet
    ↓
Bullet Deleted
```

Important:

```text
No automatic deletion.
No automatic hiding.
```

Editor always displays the full master resume.

Filtering happens only during PDF generation.

---

# Current User Workflow

```text
Open Resume CMS
      ↓
Edit Resume
      ↓
Select Resume Type
      ↓
Generate PDF
      ↓
Save Resume To GitHub
      ↓
Trigger GitHub Action
      ↓
Generate PDF
      ↓
Publish To GitHub Pages
      ↓
Download PDF
```

---

# GitHub Authentication

Implemented.

## PAT Storage

Stored in browser localStorage.

Key:

```javascript
resumeLabGithubToken
```

Token entered once via:

```text
GitHub Settings
  ↓
GitHub PAT
  ↓
Save Token
```

---

# GitHub Workflow Status

## Removed

Deleted:

```text
.github/workflows/build.yml
.github/workflows/sync-json-step.yml
```

Reason:

```text
Obsolete legacy workflows
```

---

## Active Workflow

File:

```text
.github/workflows/build-from-json.yml
```

Trigger:

```yaml
on:
  workflow_dispatch:
```

Only.

The workflow is triggered by the CMS Generate PDF button.

---

## GitHub Pages

Still active:

```text
pages-build-deployment
```

Required.

Do NOT remove.

---

# Important Discovery

Original workflow attempted:

```yaml
cp generated/*.pdf docs/pdfs/
```

Failure:

```text
generated/*.pdf did not exist
```

Debug output showed:

```text
./software.pdf
./robotics.pdf
./architect.pdf
./management.pdf
```

PDFs are generated in repository root.

Workflow was corrected to copy:

```yaml
cp software.pdf docs/pdfs/
cp robotics.pdf docs/pdfs/
cp architect.pdf docs/pdfs/
cp management.pdf docs/pdfs/
```

Artifacts were updated similarly.

---

# Current Architecture

```text
master-resume.json
        ↓
Resume CMS
        ↓
Generate PDF Button
        ↓
GitHub API
        ↓
Save master-resume.json
        ↓
workflow_dispatch
        ↓
build-from-json.yml
        ↓
XeLaTeX
        ↓
software.pdf
robotics.pdf
architect.pdf
management.pdf
        ↓
docs/pdfs
        ↓
GitHub Pages
```

---

# Current State

Platform is effectively complete.

Implemented:

```text
✅ Browser Editing
✅ GitHub Save
✅ GitHub Action Triggering
✅ PDF Generation
✅ PDF Publishing
✅ GitHub Pages Download
```

---

# Remaining Work

## Only Major Item Left

### Problem

Generated PDF does NOT visually match the original resume.

---

## Current Generated PDF

Characteristics:

```text
Simple layout
Basic sections
Minimal formatting
Standard LaTeX appearance
```

---

## Original Resume

File source:

```text
tex/document.tex
```

Characteristics:

```text
Custom header
About section
Education table
Skills section
Professional spacing
Icons
University logos
Dense formatting
Resume-specific layout
```

---

# Goal

Do NOT redesign the resume.

Instead:

```text
Reuse original design exactly.
```

Target:

```text
tex/document.tex
        ↓
Convert to Jinja template
        ↓
templates/resume.tex.j2
        ↓
Populate from
master-resume.json
        ↓
Generate PDFs
```

---

# Preserve Exactly

Must preserve:

```text
Header Layout
Fonts
Margins
Spacing
About Section
Education Section
Skills Section
Experience Layout
Section Styling
Icons
University Logos
Overall Visual Design
```

---

# Next Copilot Session

Request:

```text
Review tex/document.tex.

Convert tex/document.tex into a Jinja2 template.

Preserve the exact visual design.

Replace hardcoded content with Jinja variables.

Use master-resume.json as the single data source.

Generate:

software.pdf
robotics.pdf
architect.pdf
management.pdf

Goal:

Generated PDFs should be visually identical to the original manually-maintained resume.
```

---

# Definition of Done

```text
Open Resume CMS
      ↓
Edit Resume
      ↓
Generate PDF
      ↓
GitHub Action
      ↓
PDF Published
```

AND

```text
Generated PDF visually matches original resume design.
```

---

# Project Completion Estimate

```text
Infrastructure            100%
CMS                       100%
GitHub Integration        100%
PDF Generation            100%
PDF Publishing            100%
Workflow Automation       100%
Resume Design Parity       10%
```

## Remaining Effort

```text
Convert original LaTeX design into Jinja template.

This is the final significant task.
```
