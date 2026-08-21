/* =========================================================
   RUN & SAMBA
   MENU GLOBAL - FUNCIONA EM TODAS AS PÁGINAS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuMobile");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuClose = document.getElementById("mobileMenuClose");
    const overlay = document.getElementById("mobileMenuOverlay");

    if (!menuButton || !mobileMenu || !menuClose || !overlay) {
        return;
    }


    /* =====================================================
       ABRIR MENU
    ===================================================== */

    function openMenu() {

        mobileMenu.classList.add("active");
        overlay.classList.add("active");

        document.body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================================
       FECHAR MENU
    ===================================================== */

    function closeMenu() {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       BOTÃO MENU
    ===================================================== */

    menuButton.addEventListener(
        "click",
        openMenu
    );


    /* =====================================================
       BOTÃO FECHAR
    ===================================================== */

    menuClose.addEventListener(
        "click",
        closeMenu
    );


    /* =====================================================
       CLICAR NO OVERLAY
    ===================================================== */

    overlay.addEventListener(
        "click",
        closeMenu
    );


    /* =====================================================
       FECHAR COM ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       FECHAR AO CLICAR EM QUALQUER LINK DO MENU
    ===================================================== */

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });

});