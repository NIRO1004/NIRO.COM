/* =========================================================
   NIRO PORTFOLIO
   SCRIPT.JS
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           NAVEGACIÓN ACTIVA
        ===================================================== */

        const sections =
            document.querySelectorAll(
                "main section"
            );


        const navLinks =
            document.querySelectorAll(
                ".site-header nav a:not(.cv-button)"
            );


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                const id =
                                    entry.target.id;


                                navLinks.forEach(
                                    (link) => {

                                        link.classList.remove(
                                            "active"
                                        );


                                        if (
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                            `#${id}`
                                        ) {

                                            link.classList.add(
                                                "active"
                                            );

                                        }

                                    }
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.35
                }

            );


        sections.forEach(
            (section) => {

                observer.observe(
                    section
                );

            }
        );



        /* =====================================================
           ANIMACIÓN AL APARECER
        ===================================================== */

        const animatedElements =
            document.querySelectorAll(
                ".project-card, .about-content, .contact-links a"
            );


        const animationObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                animationObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        animatedElements.forEach(
            (element) => {

                element.classList.add(
                    "hidden"
                );

                animationObserver.observe(
                    element
                );

            }
        );



        /* =====================================================
           AÑO AUTOMÁTICO DEL FOOTER
        ===================================================== */

        const year =
            new Date().getFullYear();


        const copyright =
            document.querySelector(
                ".footer-copy p"
            );


        if (
            copyright
        ) {

            copyright.textContent =
                `© ${year} Niro. Todos los derechos reservados.`;

        }


    }
);

/* PHOTOGRAPHY PREVIEW */

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".photo-slide");
    const thumbs = document.querySelectorAll(".photo-thumb");
    const dots = document.querySelectorAll(".photo-dot");
    const categories = document.querySelectorAll(".photo-category");
    const prev = document.querySelector(".photo-prev");
    const next = document.querySelector(".photo-next");

    if (!slides.length) return;

    let current = 0;

    function updateGallery(index) {
        current = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === current);
        });

        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === current);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
        });
    }

    next.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        updateGallery(current);
    });

    prev.addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        updateGallery(current);
    });

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            updateGallery(index);
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateGallery(index);
        });
    });

    categories.forEach(category => {
        category.addEventListener("click", () => {
            categories.forEach(item => {
                item.classList.remove("active");
            });

            category.classList.add("active");

            const selectedCategory = category.dataset.category;

            slides.forEach(slide => {
                if (
                    selectedCategory === "todos" ||
                    slide.dataset.category === selectedCategory
                ) {
                    slide.style.display = "";
                } else {
                    slide.style.display = "none";
                }
            });
        });
    });
});