/* =========================================================
   RUN & SAMBA
   SCRIPT.JS
   Menu mobile global
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS DO MENU
    ===================================================== */

    const menuButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");

    /* Se a página não tiver menu, não faz nada */
    if (!menuButton || !menu) {
        console.warn("Menu mobile não encontrado nesta página.");
        return;
    }


    /* =====================================================
       ABRIR / FECHAR MENU
    ===================================================== */

    menuButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const aberto = menu.classList.toggle("active");

        menuButton.classList.toggle("active", aberto);

        menuButton.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

    });


    /* =====================================================
       FECHAR AO CLICAR EM UM LINK
    ===================================================== */

    const links = menu.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("active");
            menuButton.classList.remove("active");

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


    /* =====================================================
       FECHAR AO CLICAR FORA DO MENU
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            menu.classList.contains("active") &&
            !menu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            menu.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    /* =====================================================
       ESC FECHA O MENU
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            menu.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });

});
