document.addEventListener("DOMContentLoaded", () => {
    const projectLink = document.getElementById("project-link");
    const githubLink = document.getElementById("github-link");

    if (projectLink) {
        projectLink.addEventListener("click", () => {
            projectLink.setAttribute("target", "_blank");
            projectLink.setAttribute("rel", "noopener noreferrer");
        });
    }

    if (githubLink) {
        githubLink.addEventListener("click", () => {
            githubLink.setAttribute("target", "_blank");
            githubLink.setAttribute("rel", "noopener noreferrer");
        });
    }

    const cards = document.querySelectorAll(".info-card, .process-item");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    cards.forEach(card => observer.observe(card));
});