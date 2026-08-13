document.addEventListener("DOMContentLoaded", function () {

    console.log("Run & Samba - Script carregado");

    /* ==================================================
       MENU MOBILE
    ================================================== */

    const menu = document.querySelector(".menu");
    const botao = document.querySelector(".menu-mobile");

    if (menu && botao) {

        botao.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            menu.classList.toggle("menu-aberto");

            const aberto = menu.classList.contains("menu-aberto");

            botao.innerHTML = aberto ? "✕ FECHAR" : "☰ MENU";

            botao.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

        });

        /* Fecha ao clicar em um link */

        const links = menu.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                menu.classList.remove("menu-aberto");

                botao.innerHTML = "☰ MENU";

                botao.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

        /* Fecha clicando fora */

        document.addEventListener("click", function (event) {

            if (
                menu.classList.contains("menu-aberto") &&
                !menu.contains(event.target) &&
                !botao.contains(event.target)
            ) {

                menu.classList.remove("menu-aberto");

                botao.innerHTML = "☰ MENU";

                botao.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* ==================================================
       GALERIA
    ================================================== */

    const galeria = document.querySelector(".stories-track");

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

        animarGaleria();

    }


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

            const href = link.getAttribute("href");

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
