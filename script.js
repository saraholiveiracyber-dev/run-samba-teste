document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu");

    if (!navbar || !menu) {
        return;
    }

    // ==================================================
    // CRIAR BOTÃO MOBILE SE NÃO EXISTIR
    // ==================================================

    let menuMobile = navbar.querySelector(".menu-mobile");

    if (!menuMobile) {

        menuMobile = document.createElement("button");

        menuMobile.className = "menu-mobile";

        menuMobile.type = "button";

        menuMobile.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        menuMobile.setAttribute(
            "aria-expanded",
            "false"
        );

        menuMobile.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        // Coloca o botão antes do menu
        navbar.insertBefore(menuMobile, menu);
    }


    // ==================================================
    // ABRIR / FECHAR MENU
    // ==================================================

    menuMobile.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const aberto =
            navbar.classList.toggle("menu-aberto");

        menuMobile.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );

        menuMobile.setAttribute(
            "aria-label",
            aberto
                ? "Fechar menu"
                : "Abrir menu"
        );

    });


    // ==================================================
    // FECHAR AO CLICAR EM UM LINK
    // ==================================================

    menu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("menu-aberto");

            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

            menuMobile.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });


    // ==================================================
    // FECHAR AO CLICAR FORA
    // ==================================================

    document.addEventListener("click", function (event) {

        if (!navbar.contains(event.target)) {

            navbar.classList.remove("menu-aberto");

            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

            menuMobile.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    // ==================================================
    // REDIMENSIONAMENTO
    // ==================================================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            navbar.classList.remove("menu-aberto");

            menuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});
