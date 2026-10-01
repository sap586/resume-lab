# Resume Lab

Enable GitHub Pages from `docs/` and GitHub Actions with workflow write permissions in the repository settings. Open the Pages site to edit the current About paragraph, choose a PDF file name, and compile.

The page needs a GitHub personal access token with **Contents: Read and write** and **Actions: Read and write** access to this repository. Enter it under GitHub access each session; it is used for the API calls and is not stored by the page. Do not use this page on a shared device with an untrusted browser extension.

Compile commits the edited `tex/modifiable-about.tex` to `main`, dispatches the workflow, and builds only that TeX file. The workflow commits `output/<name>/<name>.pdf` alongside a complete copy of the source as `output/<name>/<name>.tex`, and also publishes the PDF to `docs/pdfs/<name>.pdf` for GitHub Pages. The PDF link on the page becomes available after GitHub Actions finishes and Pages deploys the update. Names may contain letters, numbers, hyphens, and underscores; `.pdf` is optional in the name field.
