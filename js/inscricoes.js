/* =========================================================
   RUN & SAMBA 2026
   SISTEMA DE INSCRIÇÕES
   ========================================================= */

const SUPABASE_URL =
    "https://tqezxxobxsipjjuyydvc.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Yt-DyfGqRqfbPN6aPgLM5w_K2RIneDd";


/* =========================================================
   SUPABASE
   ========================================================= */

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Run & Samba — sistema de inscrições carregado."
    );


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const form =
        document.getElementById("form-inscricao");

    const nome =
        document.getElementById("nome");

    const cpf =
        document.getElementById("cpf");

    const nascimento =
        document.getElementById("nascimento");

    const email =
        document.getElementById("email");

    const telefone =
        document.getElementById("telefone");

    const sexo =
        document.getElementById("sexo");

    const aceiteTermo =
        document.getElementById("aceiteTermo");

    const mensagem =
        document.getElementById("mensagem-formulario");

    const botao =
        document.getElementById("btnContinuar");


    /* RESUMO */

    const resumoNome =
        document.getElementById("resumo-nome");

    const resumoPercurso =
        document.getElementById("resumo-percurso");

    const resumoCamiseta =
        document.getElementById("resumo-camiseta");

    const resumoValor =
        document.getElementById("resumo-valor");


    if (!form) {

        console.error(
            "Formulário de inscrição não encontrado."
        );

        return;
    }


    /* =====================================================
       MENSAGEM
       ===================================================== */

    function mostrarMensagem(
        texto,
        tipo = "erro"
    ) {

        if (!mensagem) {

            alert(texto);

            return;
        }

        mensagem.textContent =
            texto;

        mensagem.className =
            "mensagem-formulario " + tipo;

        mensagem.style.display =
            "block";
    }


    function limparMensagem() {

        if (!mensagem) {
            return;
        }

        mensagem.textContent =
            "";

        mensagem.className =
            "mensagem-formulario";

        mensagem.style.display =
            "none";
    }


    /* =====================================================
       SOMENTE NÚMEROS
       ===================================================== */

    function somenteNumeros(valor) {

        return String(valor || "")
            .replace(/\D/g, "");
    }


    /* =====================================================
       CPF — MÁSCARA
       ===================================================== */

    cpf?.addEventListener(
        "input",
        function () {

            let valor =
                somenteNumeros(
                    cpf.value
                ).substring(0, 11);


            if (valor.length > 9) {

                valor =
                    valor.replace(
                        /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/,
                        "$1.$2.$3-$4"
                    );

            } else if (valor.length > 6) {

                valor =
                    valor.replace(
                        /^(\d{3})(\d{3})(\d{1,3})$/,
                        "$1.$2.$3"
                    );

            } else if (valor.length > 3) {

                valor =
                    valor.replace(
                        /^(\d{3})(\d{1,3})$/,
                        "$1.$2"
                    );
            }


            cpf.value =
                valor;


            /*
             * Quando o usuário alterar o CPF,
             * limpamos a mensagem anterior.
             */

            limparMensagem();
        }
    );


    /* =====================================================
       DATA — MÁSCARA
       ===================================================== */

    nascimento?.addEventListener(
        "input",
        function () {

            let valor =
                somenteNumeros(
                    nascimento.value
                ).substring(0, 8);


            if (valor.length > 4) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{2})(\d{1,4})$/,
                        "$1/$2/$3"
                    );

            } else if (valor.length > 2) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{1,2})$/,
                        "$1/$2"
                    );
            }


            nascimento.value =
                valor;
        }
    );


    /* =====================================================
       TELEFONE — MÁSCARA
       ===================================================== */

    telefone?.addEventListener(
        "input",
        function () {

            let valor =
                somenteNumeros(
                    telefone.value
                ).substring(0, 11);


            if (valor.length > 10) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{5})(\d{1,4})$/,
                        "($1) $2-$3"
                    );

            } else if (valor.length > 6) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{4})(\d{1,4})$/,
                        "($1) $2-$3"
                    );

            } else if (valor.length > 2) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{1,5})$/,
                        "($1) $2"
                    );
            }


            telefone.value =
                valor;
        }
    );


    /* =====================================================
       CPF — VALIDAÇÃO
       ===================================================== */

    function cpfValido(valor) {

        const numero =
            somenteNumeros(valor);


        if (numero.length !== 11) {
            return false;
        }


        if (/^(\d)\1{10}$/.test(numero)) {
            return false;
        }


        let soma = 0;


        for (let i = 0; i < 9; i++) {

            soma +=
                Number(numero[i]) *
                (10 - i);
        }


        let resto =
            soma % 11;


        let digito1 =
            resto < 2
                ? 0
                : 11 - resto;


        if (
            digito1 !==
            Number(numero[9])
        ) {

            return false;
        }


        soma = 0;


        for (let i = 0; i < 10; i++) {

            soma +=
                Number(numero[i]) *
                (11 - i);
        }


        resto =
            soma % 11;


        let digito2 =
            resto < 2
                ? 0
                : 11 - resto;


        return (
            digito2 ===
            Number(numero[10])
        );
    }


    /* =====================================================
       DATA — VALIDAÇÃO
       ===================================================== */

    function dataValida(data) {

        const partes =
            data.split("/");


        if (partes.length !== 3) {
            return false;
        }


        const dia =
            Number(partes[0]);

        const mes =
            Number(partes[1]);

        const ano =
            Number(partes[2]);


        if (
            !dia ||
            !mes ||
            !ano ||
            mes < 1 ||
            mes > 12
        ) {

            return false;
        }


        const dataObj =
            new Date(
                ano,
                mes - 1,
                dia
            );


        return (
            dataObj.getFullYear() === ano &&
            dataObj.getMonth() === mes - 1 &&
            dataObj.getDate() === dia
        );
    }


    /* =====================================================
       DATA — CONVERTER PARA SUPABASE
       ===================================================== */

    function converterData(data) {

        const partes =
            data.split("/");


        if (partes.length !== 3) {
            return null;
        }


        const dia = partes[0];
        const mes = partes[1];
        const ano = partes[2];


        return `${ano}-${mes}-${dia}`;
    }


    /* =====================================================
       PERCURSO
       ===================================================== */

    function obterPercurso() {

        return document.querySelector(
            'input[name="percurso"]:checked'
        );
    }


    /* =====================================================
       CAMISETA
       ===================================================== */

    function obterCamiseta() {

        return document.querySelector(
            'input[name="camiseta"]:checked'
        );
    }


    /* =====================================================
       RESUMO
       ===================================================== */

    function atualizarResumo() {

        const percurso =
            obterPercurso();

        const camiseta =
            obterCamiseta();


        if (resumoNome) {

            resumoNome.textContent =
                nome?.value.trim() || "—";
        }


        if (resumoPercurso) {

            resumoPercurso.textContent =
                percurso?.value || "—";
        }


        if (resumoCamiseta) {

            resumoCamiseta.textContent =
                camiseta?.value || "—";
        }


        if (resumoValor) {

            let valor =
                percurso?.dataset.valor;


            /*
             * Seu HTML usa "89,90".
             * O JavaScript precisa transformar
             * para 89.90.
             */

            valor =
                valor
                    ? Number(
                        String(valor)
                            .replace(",", ".")
                    )
                    : 89.90;


            resumoValor.textContent =
                valor.toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                );
        }
    }


    nome?.addEventListener(
        "input",
        atualizarResumo
    );


    document
        .querySelectorAll(
            'input[name="percurso"]'
        )
        .forEach(function (item) {

            item.addEventListener(
                "change",
                atualizarResumo
            );
        });


    document
        .querySelectorAll(
            'input[name="camiseta"]'
        )
        .forEach(function (item) {

            item.addEventListener(
                "change",
                atualizarResumo
            );
        });


    /* =====================================================
       MODAL DO TERMO
       ===================================================== */

    const abrirTermo =
        document.getElementById("abrirTermo");

    const modalTermo =
        document.getElementById("modalTermo");

    const fecharTermo =
        document.getElementById("fecharTermo");

    const fecharTermoBtn =
        document.getElementById("fecharTermoBtn");

    const overlay =
        document.querySelector(
            ".modal-termo-overlay"
        );


    function abrirModalTermo() {

        if (!modalTermo) {
            return;
        }


        modalTermo.classList.add(
            "ativo"
        );


        modalTermo.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-aberto"
        );


        document.body.style.overflow =
            "hidden";
    }


    function fecharModalTermo() {

        if (!modalTermo) {
            return;
        }


        modalTermo.classList.remove(
            "ativo"
        );


        modalTermo.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-aberto"
        );


        document.body.style.overflow =
            "";
    }


    abrirTermo?.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            abrirModalTermo();
        }
    );


    fecharTermo?.addEventListener(
        "click",
        fecharModalTermo
    );


    fecharTermoBtn?.addEventListener(
        "click",
        fecharModalTermo
    );


    overlay?.addEventListener(
        "click",
        fecharModalTermo
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modalTermo?.classList.contains(
                    "ativo"
                )
            ) {

                fecharModalTermo();
            }
        }
    );


    /* =====================================================
       ⭐ VERIFICAR CPF NO SUPABASE
       ===================================================== */

    async function verificarCPF(cpfInformado) {

        const cpfLimpo =
            somenteNumeros(
                cpfInformado
            );


        console.log(
            "Consultando CPF:",
            cpfLimpo
        );


        const resposta =
            await db
                .from("inscricoes")
                .select("id")
                .eq("cpf", cpfLimpo)
                .limit(1);


        console.log(
            "Resposta CPF:",
            resposta
        );


        if (resposta.error) {

            console.error(
                "Erro ao consultar CPF:",
                resposta.error
            );

            throw resposta.error;
        }


        return (
            resposta.data &&
            resposta.data.length > 0
        );
    }


    /* =====================================================
       ⭐ SUBMIT
       ===================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            limparMensagem();


            /* ---------------------------------------------
               VALIDAÇÃO HTML
            --------------------------------------------- */

            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }


            /* ---------------------------------------------
               CPF
            --------------------------------------------- */

            const cpfLimpo =
                somenteNumeros(
                    cpf.value
                );


            if (!cpfValido(cpfLimpo)) {

                mostrarMensagem(
                    "Digite um CPF válido.",
                    "erro"
                );

                cpf.focus();

                return;
            }


            /* ---------------------------------------------
               DATA
            --------------------------------------------- */

            if (
                !dataValida(
                    nascimento.value
                )
            ) {

                mostrarMensagem(
                    "Digite uma data de nascimento válida.",
                    "erro"
                );

                nascimento.focus();

                return;
            }


            /* ---------------------------------------------
               PERCURSO
            --------------------------------------------- */

            const percurso =
                obterPercurso();


            if (!percurso) {

                mostrarMensagem(
                    "Selecione um percurso.",
                    "erro"
                );

                return;
            }


            /* ---------------------------------------------
               CAMISETA
            --------------------------------------------- */

            const camiseta =
                obterCamiseta();


            if (!camiseta) {

                mostrarMensagem(
                    "Selecione o tamanho da camiseta.",
                    "erro"
                );

                return;
            }


            /* ---------------------------------------------
               TERMO
            --------------------------------------------- */

            if (
                !aceiteTermo ||
                !aceiteTermo.checked
            ) {

                mostrarMensagem(
                    "Você precisa aceitar o Termo de Responsabilidade.",
                    "erro"
                );

                return;
            }


            /* =================================================
               ⭐ VERIFICAR CPF ANTES DE CADASTRAR
            ================================================= */

            try {

                if (botao) {

                    botao.disabled =
                        true;
                }


                const spanBotao =
                    botao?.querySelector(
                        "span"
                    );


                if (spanBotao) {

                    spanBotao.textContent =
                        "VERIFICANDO CPF...";
                }


                const existe =
                    await verificarCPF(
                        cpfLimpo
                    );


                /* ---------------------------------------------
                   CPF JÁ CADASTRADO
                --------------------------------------------- */

                if (existe) {

                    console.warn(
                        "CPF já cadastrado:",
                        cpfLimpo
                    );


                    mostrarMensagem(
                        "⚠️ CPF já cadastrado! Já existe uma inscrição registrada para este CPF.",
                        "erro"
                    );


                    cpf.focus();


                    if (botao) {

                        botao.disabled =
                            false;
                    }


                    if (spanBotao) {

                        spanBotao.textContent =
                            "CONTINUAR INSCRIÇÃO";
                    }


                    return;
                }


                /* =================================================
                   CPF NOVO → CADASTRAR
                ================================================= */

                if (spanBotao) {

                    spanBotao.textContent =
                        "CADASTRANDO...";
                }


                let valor =
                    percurso.dataset.valor;


                valor =
                    valor
                        ? Number(
                            String(valor)
                                .replace(",", ".")
                        )
                        : 89.90;


                const dadosInscricao = {

                    nome:
                        nome.value.trim(),

                    cpf:
                        cpfLimpo,

                    nascimento:
                        converterData(
                            nascimento.value
                        ),

                    email:
                        email.value
                            .trim()
                            .toLowerCase(),

                    telefone:
                        somenteNumeros(
                            telefone.value
                        ),

                    sexo:
                        sexo.value,

                    camiseta:
                        camiseta.value,

                    percurso:
                        percurso.value,

                    valor:
                        valor,

                    status:
                        "pendente",

                    status_pagamento:
                        "pendente"
                };


                console.log(
                    "Dados enviados ao Supabase:",
                    dadosInscricao
                );


                /* ---------------------------------------------
                   INSERT
                --------------------------------------------- */

                const resultado =
                    await db
                        .from("inscricoes")
                        .insert([
                            dadosInscricao
                        ])
                        .select()
                        .single();


                /* ---------------------------------------------
                   ERRO
                --------------------------------------------- */

                if (resultado.error) {

                    console.error(
                        "Erro Supabase:",
                        resultado.error
                    );


                    /*
                     * Mesmo que duas pessoas tentem
                     * cadastrar o mesmo CPF ao mesmo tempo,
                     * o banco continua protegendo a tabela.
                     */

                    if (
                        resultado.error.code ===
                        "23505"
                    ) {

                        mostrarMensagem(
                            "⚠️ CPF já cadastrado! Já existe uma inscrição registrada para este CPF.",
                            "erro"
                        );


                        if (botao) {

                            botao.disabled =
                                false;
                        }


                        if (spanBotao) {

                            spanBotao.textContent =
                                "CONTINUAR INSCRIÇÃO";
                        }


                        cpf.focus();

                        return;
                    }


                    throw resultado.error;
                }


                /* =================================================
                   SUCESSO
                ================================================= */

                console.log(
                    "Inscrição registrada:",
                    resultado.data
                );


                window.location.href =
                    "obrigado-inscricoes.html";
            }


            /* =====================================================
               ERRO GERAL
            ===================================================== */

            catch (erro) {

                console.error(
                    "Erro ao registrar inscrição:",
                    erro
                );


                let texto =
                    "Não foi possível registrar sua inscrição. Tente novamente.";


                if (
                    erro?.code ===
                    "23505"
                ) {

                    texto =
                        "⚠️ CPF já cadastrado! Já existe uma inscrição registrada para este CPF.";

                } else if (
                    erro?.code ===
                    "42501"
                ) {

                    texto =
                        "O Supabase bloqueou o cadastro. Verifique as políticas RLS da tabela inscricoes.";
                }


                mostrarMensagem(
                    texto,
                    "erro"
                );


                if (botao) {

                    botao.disabled =
                        false;
                }


                const spanBotao =
                    botao?.querySelector(
                        "span"
                    );


                if (spanBotao) {

                    spanBotao.textContent =
                        "CONTINUAR INSCRIÇÃO";
                }
            }
        }
    );


    /* =====================================================
       INICIALIZAÇÃO
       ===================================================== */

    atualizarResumo();

});