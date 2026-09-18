let masterData = null;
const TAGS = ["software", "robotics", "architect", "management"];

async function init() {
    const response = await fetch("./data/master-resume.json");
    masterData = await response.json();
    renderFiltered();
}

function updateStats() {
    const bulletCount = masterData.experience.reduce(
        (total, job) => total + job.bullets.length,
        0,
    );
    document.getElementById("stats").textContent =
        `Companies: ${masterData.experience.length} | Bullets: ${bulletCount}`;
}

function renderFiltered() {
    const selectedTag = document.getElementById("resumeType").value;
    const jobs = document.getElementById("jobs");
    jobs.innerHTML = "";

    masterData.experience.forEach((job, jobIndex) => {
        const visibleBullets = job.bullets.filter((bullet) =>
            bullet.tags.includes(selectedTag),
        );
        const jobElement = document.createElement("div");
        jobElement.className = "job";
        jobElement.innerHTML = `
            <input type="text" value="${escapeHtml(job.company)}" onchange="updateCompany(${jobIndex}, this.value)">
            <input type="text" value="${escapeHtml(job.title)}" onchange="updateTitle(${jobIndex}, this.value)">
            <button onclick="deleteCompany(${jobIndex})">Delete Company</button>
        `;

        visibleBullets.forEach((bullet) => {
            const bulletIndex = job.bullets.indexOf(bullet);
            const bulletElement = document.createElement("div");
            bulletElement.className = "bullet";
            bulletElement.innerHTML = `
                <input type="text" value="${escapeHtml(bullet.text)}" onchange="updateBullet(${jobIndex}, ${bulletIndex}, this.value)">
                <div class="tags">${TAGS.map((tag) => `
                    <label><input type="checkbox" ${bullet.tags.includes(tag) ? "checked" : ""}
                        onchange="toggleTag(${jobIndex}, ${bulletIndex}, '${tag}', this.checked)">${tag}</label>
                `).join("")}</div>
                <button onclick="deleteBullet(${jobIndex}, ${bulletIndex})">Delete Bullet</button>
            `;
            jobElement.appendChild(bulletElement);
        });

        jobElement.insertAdjacentHTML(
            "beforeend",
            `<button onclick="addBullet(${jobIndex})">Add Bullet</button>`,
        );
        jobs.appendChild(jobElement);
    });
    updateStats();
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function updateCompany(index, value) {
    masterData.experience[index].company = value;
}

function updateTitle(index, value) {
    masterData.experience[index].title = value;
}

function updateBullet(jobIndex, bulletIndex, value) {
    masterData.experience[jobIndex].bullets[bulletIndex].text = value;
}

function toggleTag(jobIndex, bulletIndex, tag, checked) {
    const tags = masterData.experience[jobIndex].bullets[bulletIndex].tags;
    if (checked && !tags.includes(tag)) tags.push(tag);
    if (!checked) {
        masterData.experience[jobIndex].bullets[bulletIndex].tags =
            tags.filter((item) => item !== tag);
    }
    renderFiltered();
}

function addBullet(jobIndex) {
    masterData.experience[jobIndex].bullets.push({
        text: "New Bullet",
        tags: [document.getElementById("resumeType").value],
    });
    renderFiltered();
}

function deleteBullet(jobIndex, bulletIndex) {
    masterData.experience[jobIndex].bullets.splice(bulletIndex, 1);
    renderFiltered();
}

function addCompany() {
    masterData.experience.push({
        company: "New Company",
        title: "New Position",
        bullets: [],
    });
    renderFiltered();
}

function deleteCompany(index) {
    masterData.experience.splice(index, 1);
    renderFiltered();
}

function downloadFile(object, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
        new Blob([JSON.stringify(object, null, 2)], { type: "application/json" }),
    );
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function downloadMasterJson() {
    downloadFile(masterData, "master-resume.json");
}

function downloadFilteredJson() {
    const selectedTag = document.getElementById("resumeType").value;
    const filteredResume = {
        profile: masterData.profile,
        resumeType: selectedTag,
        experience: masterData.experience
            .map((job) => ({
                ...job,
                bullets: job.bullets.filter((bullet) =>
                    bullet.tags.includes(selectedTag),
                ),
            }))
            .filter((job) => job.bullets.length > 0),
    };
    downloadFile(filteredResume, `${selectedTag}-resume.json`);
}

init();
