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

/* =========================================================
   NAVBAR MOBILE
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}