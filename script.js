document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // MENU MOBILE - TODAS AS PÁGINAS
    // =========================================================

    const menuButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");

    if (!menuButton || !menu) {
        console.warn("Menu mobile não encontrado nesta página.");
        return;
    }

    // Abrir / fechar
    menuButton.addEventListener("click", () => {

        const isOpen = menu.classList.toggle("active");

        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

    });


    // Fechar ao clicar em qualquer link
    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

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


    // Fechar ao clicar fora do menu
    document.addEventListener("click", event => {

        const clicouNoMenu =
            menu.contains(event.target);

        const clicouNoBotao =
            menuButton.contains(event.target);

        if (
            !clicouNoMenu &&
            !clicouNoBotao &&
            menu.classList.contains("active")
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


    // Fechar menu se aumentar a tela
    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

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
