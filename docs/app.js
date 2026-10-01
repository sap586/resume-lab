const repo = 'sap586/resume-lab';
const sourcePath = 'tex/modifiable-about.tex';
const workflow = 'build-from-json.yml';
const aboutPattern = /(% ABOUT_START\r?\n)([\s\S]*?)(\r?\n% ABOUT_END)/;
const filenamePattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/;

const form = document.getElementById('resumeForm');
const aboutField = document.getElementById('about');
const filenameField = document.getElementById('pdfName');
const tokenField = document.getElementById('githubToken');
const status = document.getElementById('status');
const compileButton = document.getElementById('compileButton');

function setStatus(message, link, label) {
    status.replaceChildren(document.createTextNode(message));
    if (link) {
        const anchor = document.createElement('a');
        anchor.href = link;
        anchor.textContent = label;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        status.append(' ', anchor);
    }
}

function decodeContent(content) {
    const bytes = Uint8Array.from(atob(content.replace(/\s/g, '')), character => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function encodeContent(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function escapeLatex(text) {
    const escaped = {
        '\\': '\\textbackslash{}', '{': '\\{', '}': '\\}',
        '&': '\\&', '%': '\\%', '$': '\\$', '#': '\\#',
        '_': '\\_', '~': '\\textasciitilde{}', '^': '\\textasciicircum{}'
    };
    return text.replace(/[\\{}&%$#_~^]/g, character => escaped[character]);
}

function unescapeLatex(text) {
    const literal = {
        '\\textbackslash{}': '\\', '\\textasciitilde{}': '~',
        '\\textasciicircum{}': '^', '\\{': '{', '\\}': '}',
        '\\&': '&', '\\%': '%', '\\$': '$', '\\#': '#', '\\_': '_'
    };
    return text.replace(/\\(?:textbackslash\{\}|textasciitilde\{\}|textasciicircum\{\}|[{}&%$#_])/g, value => literal[value]);
}

async function githubRequest(url, token, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            Accept: 'application/vnd.github+json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `GitHub request failed (${response.status})`);
    }
    return response.status === 204 ? null : response.json();
}

async function loadAbout() {
    try {
        let source;
        if (location.protocol === 'file:') {
            const response = await fetch('../tex/modifiable-about.tex');
            if (!response.ok) throw new Error(`Could not read local TeX file (${response.status}).`);
            source = await response.text();
        } else {
            const file = await githubRequest(`https://api.github.com/repos/${repo}/contents/${sourcePath}?ref=main`, tokenField.value.trim());
            source = decodeContent(file.content);
        }
        const match = source.match(aboutPattern);
        if (!match) throw new Error('About section markers are missing from the TeX file.');
        aboutField.value = unescapeLatex(match[2].trim());
        compileButton.disabled = false;
        setStatus('');
    } catch (error) {
        setStatus(`Could not load About: ${error.message}`);
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    const token = tokenField.value.trim();
    const about = aboutField.value.trim().replace(/\s+/g, ' ');
    const filename = filenameField.value.trim().replace(/\.pdf$/i, '');
    if (!token) {
        setStatus('Enter a GitHub token with Contents and Actions write access.');
        tokenField.focus();
        return;
    }
    if (!about || !filenamePattern.test(filename)) {
        setStatus('Enter About text and a PDF name using only letters, numbers, hyphens or underscores (up to 80 characters).');
        return;
    }

    compileButton.disabled = true;
    try {
        setStatus('Saving About to GitHub...');
        const file = await githubRequest(`https://api.github.com/repos/${repo}/contents/${sourcePath}?ref=main`, token);
        const original = decodeContent(file.content);
        if (!aboutPattern.test(original)) throw new Error('About section markers are missing from the TeX file.');
        const updated = original.replace(aboutPattern, (_, start, text, end) =>
            `${start}${escapeLatex(about)}${end}`);
        await githubRequest(`https://api.github.com/repos/${repo}/contents/${sourcePath}`, token, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Update resume About', content: encodeContent(updated), sha: file.sha, branch: 'main' })
        });

        setStatus('Starting PDF build...');
        await githubRequest(`https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`, token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ref: 'main', inputs: { pdf_name: filename } })
        });
        setStatus('Build started. The PDF will appear after the workflow finishes.',
            `./pdfs/${filename}.pdf`, `Open ${filename}.pdf`);
    } catch (error) {
        setStatus(`Could not complete the build: ${error.message}`);
    } finally {
        compileButton.disabled = false;
    }
});

tokenField.addEventListener('change', () => {
    if (compileButton.disabled && tokenField.value.trim()) loadAbout();
});

loadAbout();
