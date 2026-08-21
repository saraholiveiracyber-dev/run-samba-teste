document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuMobile");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("mobileMenuOverlay");
    const menuClose = document.getElementById("mobileMenuClose");

    const linksMobile = document.querySelectorAll(
        ".mobile-menu-nav a, .mobile-menu-cta"
    );

    if (!menuButton || !mobileMenu || !menuOverlay) {
        console.warn("Elementos do menu mobile não encontrados.");
        return;
    }

    function abrirMenu() {
        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");
        menuButton.classList.add("active");

        document.body.classList.add("menu-open");

        mobileMenu.setAttribute("aria-hidden", "false");
        menuOverlay.setAttribute("aria-hidden", "false");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Fechar menu");
    }

    function fecharMenu() {
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        menuButton.classList.remove("active");

        document.body.classList.remove("menu-open");

        mobileMenu.setAttribute("aria-hidden", "true");
        menuOverlay.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
    }

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.contains("active")
            ? fecharMenu()
            : abrirMenu();
    });

    if (menuClose) {
        menuClose.addEventListener("click", fecharMenu);
    }

    menuOverlay.addEventListener("click", fecharMenu);

    linksMobile.forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            fecharMenu();
        }
    });

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    document
        .querySelectorAll(".menu a, .mobile-menu-nav a")
        .forEach((link) => {
            const href = link.getAttribute("href");

            if (!href) return;

            const paginaLink =
                href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();

            if (paginaAtual === paginaLink) {
                link.classList.add("active");
            }
        });
});