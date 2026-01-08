// 1. Fetch Data
async function loadData() {
    try {
        const response = await fetch("data.json");
        return await response.json();
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

// 2. Render Profile (Home)
function renderProfile(profile) {
    if (!document.getElementById("hero-name")) return;

    document.getElementById("hero-name").textContent = profile.name;
    document.getElementById("hero-title").textContent = profile.title;
    document.getElementById("about-text").textContent = profile.about;
    document.getElementById(
        "contact-email"
    ).textContent = `Email: ${profile.email}`;
    document.getElementById(
        "contact-phone"
    ).textContent = `Phone: ${profile.phone}`;
}

// 3. Render Education & Awards (Home)
function renderEducation(eduList) {
    const container = document.getElementById("academic-container");
    if (!container) return;

    let html = `<div class="academic-card"><h3>🎓 Education</h3>`;
    eduList.forEach((edu) => {
        html += `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 1.1rem;">${edu.institution}</h4>
                <p>${edu.degree}</p>
                <p style="color: #666; font-size: 0.9rem;">${edu.period} | GPA: ${edu.gpa}</p>
                <p style="font-size: 0.9rem; margin-top: 0.2rem;">${edu.details}</p>
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML += html;
}

function renderAwards(awardList) {
    const container = document.getElementById("academic-container");
    if (!container) return;

    let html = `<div class="academic-card"><h3>🏆 Achievements</h3><ul class="award-list">`;
    awardList.forEach((award) => {
        html += `
            <li>
                <strong>${award.title}</strong><br>
                <span style="font-size: 0.85rem; color: #666;">${award.organization} (${award.year})</span>
            </li>
        `;
    });
    html += `</ul></div>`;
    container.innerHTML += html;
}

// 4. Render Experience (Timeline Path)
function renderExperience(expList) {
    const container = document.getElementById("experience-container");
    if (!container) return;

    container.innerHTML = expList
        .map(
            (exp) => `
        <div class="timeline-item" onclick="this.classList.toggle('active')">
            <div class="timeline-date">${exp.period}</div>
            <div class="timeline-role">${exp.role}</div>
            <div class="timeline-company">${exp.company}</div>
            <div class="timeline-details">
                <p>${exp.description}</p>
            </div>
        </div>
    `
        )
        .join("");
}

// 5. Render Projects (Shared Function)
function renderProjects(projects, containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Sort by date descending (Newest first)
    const sortedProjects = projects.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Apply limit if provided (e.g., Home page shows only 3)
    const displayProjects = limit
        ? sortedProjects.slice(0, limit)
        : sortedProjects;

    container.innerHTML = displayProjects
        .map(
            (proj) => `
        <div class="project-card" data-category="${proj.category}">
            <img src="${proj.image}" alt="${proj.title}" class="project-img">
            <div class="project-content">
                <div class="project-category">${proj.category}</div>
                <h3>${proj.title}</h3>
                <p style="font-size: 0.9rem; color: #555; margin-top: 0.5rem;">${
                    proj.description
                }</p>
                <div class="project-tech">
                    ${proj.tech_stack
                        .map((tech) => `<span class="tech-tag">${tech}</span>`)
                        .join("")}
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

// 6. Project Page Logic (Filter & Init)
function initProjectPage(projects) {
    const containerId = "all-projects-container";

    // 1. Render All initially
    renderProjects(projects, containerId);

    // 2. Generate Category Buttons dynamically
    const categories = ["all", ...new Set(projects.map((p) => p.category))];
    const filterContainer = document.getElementById("filter-container");

    filterContainer.innerHTML = categories
        .map(
            (cat) =>
                `<button class="filter-btn ${
                    cat === "all" ? "active" : ""
                }" data-filter="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
         </button>`
        )
        .join("");

    // 3. Add Click Listeners
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // Remove active class from all
            document
                .querySelectorAll(".filter-btn")
                .forEach((b) => b.classList.remove("active"));
            // Add to current
            e.target.classList.add("active");

            const filterValue = e.target.getAttribute("data-filter");

            if (filterValue === "all") {
                renderProjects(projects, containerId);
            } else {
                const filtered = projects.filter(
                    (p) => p.category === filterValue
                );
                renderProjects(filtered, containerId);
            }
        });
    });
}
