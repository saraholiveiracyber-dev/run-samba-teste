document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");

    console.log("SCRIPT CARREGADO");
    console.log("Botão:", menuButton);
    console.log("Menu:", menu);

    if (!menuButton || !menu) {
        console.error("MENU NÃO ENCONTRADO");
        return;
    }

    menuButton.addEventListener("click", function () {

        console.log("BOTÃO CLICADO");

        menu.classList.toggle("active");
        menuButton.classList.toggle("active");

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

});
