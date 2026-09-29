document.addEventListener("DOMContentLoaded", () => {

    const cards = Array.from(document.querySelectorAll(".photo-card"));
    const filters = document.querySelectorAll(".filter");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCategory = document.getElementById("lightbox-category");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxLocation = document.getElementById("lightbox-location");

    const closeButton = document.querySelector(".lightbox-close");
    const previousButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");

    let visibleCards = [...cards];
    let currentIndex = 0;


    /* FILTROS */

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const selectedCategory = filter.dataset.filter;

            cards.forEach(card => {

                if (
                    selectedCategory === "todos" ||
                    card.dataset.category === selectedCategory
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

            visibleCards = cards.filter(card => {
                return (
                    selectedCategory === "todos" ||
                    card.dataset.category === selectedCategory
                );
            });

        });

    });


    /* LIGHTBOX */

    function openLightbox(card) {

        const image = card.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCategory.textContent =
            card.dataset.category.toUpperCase();

        lightboxTitle.textContent =
            card.dataset.title;

        lightboxLocation.textContent =
            `${card.dataset.location} · ${card.dataset.year}`;

        currentIndex = visibleCards.indexOf(card);

        lightbox.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    function closeLightbox() {

        lightbox.classList.remove("open");

        document.body.style.overflow = "";

    }


    function showPhoto(index) {

        if (!visibleCards.length) return;

        if (index < 0) {
            index = visibleCards.length - 1;
        }

        if (index >= visibleCards.length) {
            index = 0;
        }

        currentIndex = index;

        const card = visibleCards[currentIndex];
        const image = card.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCategory.textContent =
            card.dataset.category.toUpperCase();

        lightboxTitle.textContent =
            card.dataset.title;

        lightboxLocation.textContent =
            `${card.dataset.location} · ${card.dataset.year}`;

    }


    cards.forEach(card => {

        card.addEventListener("click", () => {
            openLightbox(card);
        });

    });


    closeButton.addEventListener("click", closeLightbox);


    previousButton.addEventListener("click", () => {
        showPhoto(currentIndex - 1);
    });


    nextButton.addEventListener("click", () => {
        showPhoto(currentIndex + 1);
    });


    /* CERRAR AL HACER CLICK FUERA */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /* TECLADO */

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentIndex + 1);
        }

    });

});