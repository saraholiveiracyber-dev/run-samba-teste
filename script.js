/* ============================================================
   RUN & SAMBA 2026
   SCRIPT PRINCIPAL
   Menu Mobile + Navegação + Galeria
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       MENU MOBILE
    ======================================================== */

    const menuButton = document.getElementById("menuMobile");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuClose = document.getElementById("mobileMenuClose");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

    if (
        menuButton &&
        mobileMenu
    ) {

        function abrirMenu() {

            mobileMenu.classList.add("active");

            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add("active");
                mobileMenuOverlay.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }

            mobileMenu.setAttribute(
                "aria-hidden",
                "false"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Fechar menu"
            );

            menuButton.classList.add("active");

            document.body.classList.add(
                "menu-open"
            );
        }


        function fecharMenu() {

            mobileMenu.classList.remove("active");

            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove("active");
                mobileMenuOverlay.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }

            mobileMenu.setAttribute(
                "aria-hidden",
                "true"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuButton.classList.remove("active");

            document.body.classList.remove(
                "menu-open"
            );
        }


        /* BOTÃO MENU */

        menuButton.addEventListener(
            "click",
            () => {

                if (
                    mobileMenu.classList.contains(
                        "active"
                    )
                ) {

                    fecharMenu();

                } else {

                    abrirMenu();

                }

            }
        );


        /* BOTÃO FECHAR */

        if (mobileMenuClose) {

            mobileMenuClose.addEventListener(
                "click",
                fecharMenu
            );

        }


        /* OVERLAY */

        if (mobileMenuOverlay) {

            mobileMenuOverlay.addEventListener(
                "click",
                fecharMenu
            );

        }


        /* LINKS DO MENU MOBILE */

        const linksMobile =
            mobileMenu.querySelectorAll("a");

        linksMobile.forEach((link) => {

            link.addEventListener(
                "click",
                fecharMenu
            );

        });


        /* ESC */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    mobileMenu.classList.contains(
                        "active"
                    )
                ) {

                    fecharMenu();

                }

            }
        );


        /* REDIMENSIONAMENTO */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 900
                ) {

                    fecharMenu();

                }

            }
        );

    }



    /* ========================================================
       MARCAR PÁGINA ATUAL
    ======================================================== */

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const linksMenu =
        document.querySelectorAll(
            ".menu a, .mobile-menu-nav a"
        );


    linksMenu.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) return;


        const paginaLink =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            paginaAtual === paginaLink ||
            (
                paginaAtual === "" &&
                paginaLink === "index.html"
            )
        ) {

            link.classList.add(
                "active"
            );

        }

    });



    /* ========================================================
       LINKS EXTERNOS
    ======================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach((link) => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });



    /* ========================================================
       CARROSSEL DE STORIES
    ======================================================== */

    const storiesContainer =
        document.querySelector(
            ".stories-container"
        );

    const storiesTrack =
        document.getElementById(
            "storiesTrack"
        );


    if (
        storiesContainer &&
        storiesTrack
    ) {

        let velocidade = 0.35;

        let pausado = false;

        let animacao;

        let tocando = false;

        let inicioX = 0;

        let scrollInicial = 0;


        /* MOVIMENTO AUTOMÁTICO */

        function moverGaleria() {

            if (!pausado) {

                storiesContainer.scrollLeft +=
                    velocidade;


                const metade =
                    storiesTrack.scrollWidth / 2;


                if (
                    metade > 0 &&
                    storiesContainer.scrollLeft >= metade
                ) {

                    storiesContainer.scrollLeft -=
                        metade;

                }

            }


            animacao =
                requestAnimationFrame(
                    moverGaleria
                );

        }


        /* PAUSAR COM MOUSE */

        storiesContainer.addEventListener(
            "mouseenter",
            () => {

                pausado = true;

            }
        );


        storiesContainer.addEventListener(
            "mouseleave",
            () => {

                pausado = false;

            }
        );



        /* ====================================================
           TOUCH MOBILE
        ==================================================== */

        storiesContainer.addEventListener(
            "touchstart",
            (event) => {

                tocando = true;

                pausado = true;

                inicioX =
                    event.touches[0].clientX;

                scrollInicial =
                    storiesContainer.scrollLeft;

            },
            {
                passive: true
            }
        );


        storiesContainer.addEventListener(
            "touchmove",
            (event) => {

                if (!tocando) return;


                const atualX =
                    event.touches[0].clientX;


                const distancia =
                    inicioX - atualX;


                storiesContainer.scrollLeft =
                    scrollInicial + distancia;

            },
            {
                passive: true
            }
        );


        storiesContainer.addEventListener(
            "touchend",
            () => {

                tocando = false;

                pausado = false;

            }
        );



        /* ====================================================
           ARRASTAR COM MOUSE
        ==================================================== */

        let arrastando = false;

        let mouseInicial = 0;

        let scrollMouseInicial = 0;


        storiesContainer.addEventListener(
            "mousedown",
            (event) => {

                arrastando = true;

                pausado = true;

                mouseInicial =
                    event.pageX;

                scrollMouseInicial =
                    storiesContainer.scrollLeft;

                storiesContainer.classList.add(
                    "is-dragging"
                );

            }
        );


        storiesContainer.addEventListener(
            "mousemove",
            (event) => {

                if (!arrastando) return;

                event.preventDefault();


                const distancia =
                    event.pageX -
                    mouseInicial;


                storiesContainer.scrollLeft =
                    scrollMouseInicial -
                    distancia;

            }
        );


        function finalizarArraste() {

            if (!arrastando) return;

            arrastando = false;

            pausado = false;

            storiesContainer.classList.remove(
                "is-dragging"
            );

        }


        storiesContainer.addEventListener(
            "mouseup",
            finalizarArraste
        );


        storiesContainer.addEventListener(
            "mouseleave",
            finalizarArraste
        );


        /* INICIAR */

        moverGaleria();


        /* LIMPAR ANIMAÇÃO */

        window.addEventListener(
            "beforeunload",
            () => {

                if (animacao) {

                    cancelAnimationFrame(
                        animacao
                    );

                }

            }
        );

    }



    /* ========================================================
       VÍDEOS
    ======================================================== */

    const videos =
        document.querySelectorAll(
            ".galeria-video video"
        );


    videos.forEach((video) => {

        video.muted = true;

        video.playsInline = true;


        function iniciarVideo() {

            const promessa =
                video.play();


            if (
                promessa &&
                typeof promessa.catch ===
                    "function"
            ) {

                promessa.catch(() => {});

            }

        }


        iniciarVideo();


        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    iniciarVideo();

                                } else {

                                    video.pause();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            observer.observe(video);

        }

    });



    /* ========================================================
       IMAGENS
    ======================================================== */

    document
        .querySelectorAll(
            ".story-card img"
        )
        .forEach((imagem) => {

            imagem.addEventListener(
                "error",
                () => {

                    imagem.style.opacity =
                        "0";

                }
            );

        });



    /* ========================================================
       ANO AUTOMÁTICO
    ======================================================== */

    document
        .querySelectorAll(
            ".current-year"
        )
        .forEach((elemento) => {

            elemento.textContent =
                new Date().getFullYear();

        });



    /* ========================================================
       BLOQUEIO DE SCROLL QUANDO MENU ESTÁ ABERTO
    ======================================================== */

    document.body.addEventListener(
        "touchmove",
        (event) => {

            if (
                document.body.classList.contains(
                    "menu-open"
                )
            ) {

                if (
                    mobileMenu &&
                    !mobileMenu.contains(
                        event.target
                    )
                ) {

                    event.preventDefault();

                }

            }

        },
        {
            passive: false
        }
    );

});