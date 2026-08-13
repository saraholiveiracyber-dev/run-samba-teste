document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");

    if (!menuButton || !menu) {
        console.warn("Menu mobile não encontrado.");
        return;
    }

    menuButton.addEventListener("click", function (event) {

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


    menu.querySelectorAll("a").forEach(function (link) {

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

});
