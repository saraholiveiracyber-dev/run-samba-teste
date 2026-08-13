document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");

    if (!menuButton || !menu) {
        console.error("Menu mobile não encontrado.");
        return;
    }

    menuButton.addEventListener("click", () => {

        menu.classList.toggle("active");

        const isOpen = menu.classList.contains("active");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

        menuButton.classList.toggle("active", isOpen);
    });


    // Fecha o menu ao clicar em um link
    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Abrir menu");

        });

    });

});
