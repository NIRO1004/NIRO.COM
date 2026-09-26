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