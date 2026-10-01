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
                ".desktop-nav a:not(.cv-button), .mobile-nav a:not(.cv-button)"
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

/* =========================================================
   MENÚ RESPONSIVE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
});

/* =========================================================
   PHOTOGRAPHY PREVIEW
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slides = Array.from(
        document.querySelectorAll(".photo-slide")
    );

    const dotsContainer =
        document.querySelector(".photography-dots");

    const thumbsContainer =
        document.querySelector(".photography-thumbnails");

    const categories =
        document.querySelectorAll(".photo-category");

    const prev =
        document.querySelector(".photo-prev");

    const next =
        document.querySelector(".photo-next");

    const photography =
        document.querySelector(".photography");

    if (!slides.length) return;

    let current = 0;
    let filteredSlides = [...slides];
    let autoPlay = null;


    /* =====================================================
       DOTS
       ===================================================== */

    function createDots() {

        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        filteredSlides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "photo-dot";
            dot.setAttribute(
                "aria-label",
                `Fotografía ${index + 1}`
            );

            dot.addEventListener("click", () => {
                current = index;
                updateGallery();
                restartAutoPlay();
            });

            dotsContainer.appendChild(dot);
        });
    }


    /* =====================================================
       MINIATURAS
       ===================================================== */

    function createThumbnails() {

        if (!thumbsContainer) return;

        thumbsContainer.innerHTML = "";

        filteredSlides.forEach((slide, index) => {

            const button =
                document.createElement("button");

            button.type = "button";
            button.className = "photo-thumb";

            const image =
                slide.querySelector("img");

            if (image) {

                const thumb =
                    document.createElement("img");

                thumb.src = image.src;
                thumb.alt = image.alt || "";

                button.appendChild(thumb);
            }

            button.addEventListener("click", () => {
                current = index;
                updateGallery();
                restartAutoPlay();
            });

            thumbsContainer.appendChild(button);
        });
    }


    /* =====================================================
       ACTUALIZAR GALERÍA
       ===================================================== */

    function updateGallery() {

        if (!filteredSlides.length) return;

        if (current < 0 || current >= filteredSlides.length) {
            current = 0;
        }

        const activeSlide =
            filteredSlides[current];

        slides.forEach(slide => {
            slide.classList.remove("active");
            slide.style.display = "none";
        });

        activeSlide.classList.add("active");
        activeSlide.style.display = "block";

        const dots =
            dotsContainer
                ? dotsContainer.querySelectorAll(".photo-dot")
                : [];

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === current
            );
        });

        const thumbs =
            thumbsContainer
                ? thumbsContainer.querySelectorAll(".photo-thumb")
                : [];

        thumbs.forEach((thumb, index) => {
            thumb.classList.toggle(
                "active",
                index === current
            );
        });
    }


    /* =====================================================
       SIGUIENTE / ANTERIOR
       ===================================================== */

    function nextPhoto() {

        if (!filteredSlides.length) return;

        current =
            (current + 1) % filteredSlides.length;

        updateGallery();
    }

    function previousPhoto() {

        if (!filteredSlides.length) return;

        current =
            (current - 1 + filteredSlides.length) %
            filteredSlides.length;

        updateGallery();
    }


    /* =====================================================
       FLECHAS
       ===================================================== */

    next?.addEventListener("click", () => {
        nextPhoto();
        restartAutoPlay();
    });

    prev?.addEventListener("click", () => {
        previousPhoto();
        restartAutoPlay();
    });


    /* =====================================================
       FILTROS
       ===================================================== */

    categories.forEach(category => {

        category.addEventListener("click", () => {

            categories.forEach(item => {
                item.classList.remove("active");
            });

            category.classList.add("active");

            const selectedCategory =
                category.dataset.category;

            if (selectedCategory === "todos") {
                filteredSlides = [...slides];
            } else {
                filteredSlides = slides.filter(
                    slide =>
                        slide.dataset.category ===
                        selectedCategory
                );
            }

            current = 0;

            createDots();
            createThumbnails();
            updateGallery();
            restartAutoPlay();
        });
    });


    /* =====================================================
       AUTOPLAY
       ===================================================== */

    function startAutoPlay() {

        clearInterval(autoPlay);

        autoPlay = setInterval(() => {
            nextPhoto();
        }, 4000);
    }

    function restartAutoPlay() {
        startAutoPlay();
    }


    /* =====================================================
       PAUSAR EN ESCRITORIO
       ===================================================== */

    photography?.addEventListener(
        "mouseenter",
        () => clearInterval(autoPlay)
    );

    photography?.addEventListener(
        "mouseleave",
        () => startAutoPlay()
    );


    /* =====================================================
       INICIALIZAR
       ===================================================== */

    createDots();
    createThumbnails();
    updateGallery();
    startAutoPlay();
});