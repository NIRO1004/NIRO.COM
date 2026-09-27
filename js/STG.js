document.addEventListener("DOMContentLoaded", () => {

    console.log("Shoes To Go - página cargada");

    const cards = document.querySelectorAll(
        ".info-card, .project-button, .development"
    );

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";
        card.style.transition = "opacity .5s ease, transform .5s ease";

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100 + index * 80);
    });

    const projectLink = document.getElementById("project-link");

    if (projectLink) {
        projectLink.addEventListener("click", (event) => {
            if (projectLink.getAttribute("href") === "#") {
                event.preventDefault();
                console.log("La URL del proyecto todavía no ha sido configurada.");
            }
        });
    }

    const githubLink = document.getElementById("github-link");

    if (githubLink) {
        githubLink.addEventListener("click", (event) => {
            if (githubLink.getAttribute("href") === "#") {
                event.preventDefault();
                console.log("El repositorio de GitHub todavía no ha sido configurado.");
            }
        });
    }

});