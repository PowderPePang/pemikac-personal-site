// 1. Fetch Data
async function loadData() {
    try {
        // Detect if we're in a subdirectory (pages/) and adjust path accordingly
        const path = window.location.pathname.includes("/pages/")
            ? "../data.json"
            : "data.json";
        const response = await fetch(path);
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

    // Render Contact Section with Icons
    const contactContainer = document.getElementById("contact-container");
    if (contactContainer) {
        let contactHtml = '<div class="contact-links">';

        // Email
        if (profile.email) {
            contactHtml += `
                <a href="mailto:${profile.email}" class="contact-link" title="Email">
                    <i class="fas fa-envelope"></i>
                    <span>${profile.email}</span>
                </a>
            `;
        }

        // Phone
        if (profile.phone) {
            contactHtml += `
                <a href="tel:${profile.phone}" class="contact-link" title="Phone">
                    <i class="fas fa-phone"></i>
                    <span>${profile.phone}</span>
                </a>
            `;
        }

        // GitHub
        if (profile.github) {
            const githubUrl = profile.github.startsWith("http")
                ? profile.github
                : `https://${profile.github}`;
            contactHtml += `
                <a href="${githubUrl}" target="_blank" class="contact-link" title="GitHub">
                    <i class="fab fa-github"></i>
                    <span>GitHub</span>
                </a>
            `;
        }

        // LinkedIn
        if (profile.linkedin) {
            const linkedinUrl = profile.linkedin.startsWith("http")
                ? profile.linkedin
                : `https://${profile.linkedin}`;
            contactHtml += `
                <a href="${linkedinUrl}" target="_blank" class="contact-link" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
            `;
        }

        // Medium
        if (profile.medium) {
            const mediumUrl = profile.medium.startsWith("http")
                ? profile.medium
                : `https://${profile.medium}`;
            contactHtml += `
                <a href="${mediumUrl}" target="_blank" class="contact-link" title="Medium">
                    <i class="fab fa-medium"></i>
                    <span>Medium</span>
                </a>
            `;
        }

        contactHtml += "</div>";
        contactContainer.innerHTML = contactHtml;
    }
}

// 3. Render Education & Awards (Home)
function renderEducation(eduList) {
    const container = document.getElementById("academic-container");
    if (!container) return;

    let html = `<div class="academic-card"><h3>Education</h3>`;
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

    let html = `<div class="academic-card"><h3>Achievements</h3><ul class="award-list">`;
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

// 4.1. Render Recent Experience (Home Page)
function renderRecentExperience(expList, limit = null) {
    const container = document.getElementById("recent-experience-container");
    if (!container) return;

    // Apply limit if provided (e.g., Home page shows only 3)
    const displayExperiences = limit ? expList.slice(0, limit) : expList;

    if (displayExperiences.length === 0) {
        container.innerHTML =
            '<p style="text-align: center; color: #666;">No experiences to display.</p>';
        return;
    }

    container.innerHTML = displayExperiences
        .map(
            (exp) => `
        <div class="experience-card">
            <div class="experience-header">
                <h3>${exp.role}</h3>
                <span class="experience-period">${exp.period}</span>
            </div>
            <p class="experience-company">${exp.company}</p>
        </div>
    `
        )
        .join("");
}

// 5. Render Projects (Shared Function)
function renderProjects(projects, containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Apply limit if provided (e.g., Home page shows only 3)
    const displayProjects = limit ? projects.slice(0, limit) : projects;

    container.innerHTML = displayProjects
        .map((proj) => {
            // Resolve image path:
            // - If absolute URL (http:// or https://) or starts with '/' or '../' or './', use as-is
            // - Otherwise, if we're in a /pages/ subfolder, prefix '../' so 'asset/...' becomes '../asset/...'
            const isAbsoluteUrl = /^(?:[a-z]+:)?\/\//i.test(proj.image);
            const startsWithSlash = proj.image.startsWith("/");
            const startsWithDot =
                proj.image.startsWith("../") || proj.image.startsWith("./");
            const needsPrefix =
                !isAbsoluteUrl &&
                !startsWithSlash &&
                !startsWithDot &&
                window.location.pathname.includes("/pages/");
            const imgSrc = needsPrefix ? `../${proj.image}` : proj.image;

            // Build links section
            let linksHtml = '<div class="project-links">';
            if (proj.github) {
                linksHtml += `<a href="${proj.github}" target="_blank" title="View on GitHub"><i class="fab fa-github"></i></a>`;
            }
            if (proj.more_info) {
                linksHtml += `<a href="${proj.more_info}" target="_blank" title="View Demo"><i class="fas fa-video"></i></a>`;
            }
            linksHtml += "</div>";

            return `
        <div class="project-card" data-category="${proj.category}">
            <img src="${imgSrc}" alt="${proj.title}" class="project-img">
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
                ${linksHtml}
            </div>
        </div>
    `;
        })
        .join("");
}

// 6. Project Page Logic (Filter, Search & Sort)
function initProjectPage(projects) {
    const containerId = "all-projects-container";
    let currentFilter = "all";
    let currentSort = "recent";
    let currentSearch = "";

    // Helper function to apply all filters, search, and sorting
    function updateProjects() {
        let filtered = [...projects]; // Create a copy to avoid mutating the original

        // Apply category filter
        if (currentFilter !== "all") {
            filtered = filtered.filter((p) => p.category === currentFilter);
        }

        // Apply search filter
        if (currentSearch.trim()) {
            const searchLower = currentSearch.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower) ||
                    p.category.toLowerCase().includes(searchLower) ||
                    p.tech_stack.some((tech) =>
                        tech.toLowerCase().includes(searchLower)
                    )
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (currentSort === "recent") {
                return new Date(b.date) - new Date(a.date);
            } else if (currentSort === "oldest") {
                return new Date(a.date) - new Date(b.date);
            } else if (currentSort === "category") {
                return a.category.localeCompare(b.category);
            }
            return 0;
        });

        renderProjects(filtered, containerId);
    }

    // 1. Render All initially
    updateProjects();

    // 2. Generate Category Buttons dynamically with counts
    const categories = ["all", ...new Set(projects.map((p) => p.category))];
    const filterContainer = document.getElementById("filter-container");

    filterContainer.innerHTML = categories
        .map((cat) => {
            let count;
            if (cat === "all") {
                count = projects.length;
            } else {
                count = projects.filter((p) => p.category === cat).length;
            }
            return `<button class="filter-btn ${
                cat === "all" ? "active" : ""
            }" data-filter="${cat}">
            ${
                cat.charAt(0).toUpperCase() + cat.slice(1)
            } <span class="category-count">${count}</span>
         </button>`;
        })
        .join("");

    // 3. Add Click Listeners for filters
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // Use closest() to get the button element, even if clicking on child elements like .category-count
            const button = e.target.closest(".filter-btn");
            document
                .querySelectorAll(".filter-btn")
                .forEach((b) => b.classList.remove("active"));
            button.classList.add("active");
            currentFilter = button.getAttribute("data-filter");
            updateProjects();
        });
    });

    // 4. Add Search Listener
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value;
            updateProjects();
        });
    }

    // 5. Add Sort Listener
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            updateProjects();
        });
    }
}
