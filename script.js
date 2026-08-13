document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       MENU MOBILE
    ================================================== */

    const menuButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");

    if (menuButton && menu) {

        menuButton.addEventListener("click", function () {

            menu.classList.toggle("active");

            const aberto = menu.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );

        });


        /* Fecha o menu ao clicar em um link */

        const links = menu.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                menu.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }


    /* ==================================================
       SLIDER DA GALERIA
    ================================================== */

    const storiesTrack = document.getElementById("storiesTrack");

    if (storiesTrack) {

        let velocidade = 0.5;
        let pausado = false;

        function moverGaleria() {

            if (!pausado) {

                storiesTrack.scrollLeft += velocidade;

                /*
                 * Quando chegar perto do final,
                 * volta para o início.
                 */

                if (
                    storiesTrack.scrollLeft >=
                    storiesTrack.scrollWidth -
                    storiesTrack.clientWidth -
                    5
                ) {

                    storiesTrack.scrollLeft = 0;

                }

            }

            requestAnimationFrame(moverGaleria);

        }

        storiesTrack.addEventListener(
            "mouseenter",
            function () {
                pausado = true;
            }
        );

        storiesTrack.addEventListener(
            "mouseleave",
            function () {
                pausado = false;
            }
        );

        moverGaleria();

    }


    /* ==================================================
       LINKS EXTERNOS
    ================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* ==================================================
       PÁGINA ATUAL
    ================================================== */

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll(".menu a").forEach(
        function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const paginaLink =
                href.split("/")
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

        }
    );

});
