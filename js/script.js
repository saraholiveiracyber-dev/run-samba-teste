document.addEventListener("DOMContentLoaded", function () {

    console.log("Run & Samba - script.js carregado");


    /* =========================================================
       MENU MOBILE
    ========================================================= */

    const menuButton = document.getElementById("menuMobile");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("mobileMenuOverlay");
    const menuClose = document.getElementById("mobileMenuClose");


    function abrirMenu() {

        if (!menuButton || !mobileMenu || !menuOverlay) {
            return;
        }

        mobileMenu.classList.add("ativo");
        menuOverlay.classList.add("ativo");
        menuButton.classList.add("ativo");

        mobileMenu.setAttribute("aria-hidden", "false");
        menuOverlay.setAttribute("aria-hidden", "false");
        menuButton.setAttribute("aria-expanded", "true");

        document.body.classList.add("menu-mobile-aberto");
    }


    function fecharMenu() {

        if (!menuButton || !mobileMenu || !menuOverlay) {
            return;
        }

        mobileMenu.classList.remove("ativo");
        menuOverlay.classList.remove("ativo");
        menuButton.classList.remove("ativo");

        mobileMenu.setAttribute("aria-hidden", "true");
        menuOverlay.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-mobile-aberto");
    }


    if (menuButton) {

        menuButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const aberto =
                mobileMenu &&
                mobileMenu.classList.contains("ativo");

            if (aberto) {
                fecharMenu();
            }
            else {
                abrirMenu();
            }

        });

    }


    if (menuClose) {

        menuClose.addEventListener("click", function () {
            fecharMenu();
        });

    }


    if (menuOverlay) {

        menuOverlay.addEventListener("click", function () {
            fecharMenu();
        });

    }


    /* Fecha o menu ao clicar em qualquer link */

    document
        .querySelectorAll(".mobile-menu-nav a, .mobile-menu-cta")
        .forEach(function (link) {

            link.addEventListener("click", function () {
                fecharMenu();
            });

        });


    /* Fecha com ESC */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            fecharMenu();
        }

    });


    /* =========================================================
       PÁGINA ATUAL
    ========================================================= */

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".menu a, .mobile-menu-nav a")
        .forEach(function (link) {

            const href = link.getAttribute("href");

            if (!href) {
                return;
            }

            const paginaLink =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();

            if (
                paginaAtual === paginaLink ||
                (
                    paginaAtual === "" &&
                    paginaLink === "index.html"
                )
            ) {

                link.classList.add("active");

            }

        });


    /* =========================================================
       GALERIA AUTOMÁTICA
    ========================================================= */

    const galeria =
        document.querySelector(".stories-track");


    if (galeria) {

        let velocidade = 0.5;
        let pausado = false;


        function animarGaleria() {

            if (!pausado) {

                galeria.scrollLeft += velocidade;


                if (
                    galeria.scrollLeft >=
                    galeria.scrollWidth -
                    galeria.clientWidth -
                    2
                ) {

                    galeria.scrollLeft = 0;

                }

            }


            requestAnimationFrame(animarGaleria);

        }


        galeria.addEventListener(
            "mouseenter",
            function () {
                pausado = true;
            }
        );


        galeria.addEventListener(
            "mouseleave",
            function () {
                pausado = false;
            }
        );


        galeria.addEventListener(
            "touchstart",
            function () {
                pausado = true;
            },
            { passive: true }
        );


        galeria.addEventListener(
            "touchend",
            function () {
                pausado = false;
            },
            { passive: true }
        );


        animarGaleria();

    }

});
