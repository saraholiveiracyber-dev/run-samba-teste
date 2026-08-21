<?php

/* =========================================================
   RUN & SAMBA 2026
   ENVIO DE FORMULÁRIO DE CONTATO
========================================================= */


/* =========================================================
   VERIFICA SE O FORMULÁRIO FOI ENVIADO
========================================================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: contato.html");

    exit;

}


/* =========================================================
   RECEBE OS DADOS
========================================================= */

$nome = trim($_POST["nome"] ?? "");

$email = trim($_POST["email"] ?? "");

$telefone = trim($_POST["telefone"] ?? "");

$assuntoContato = trim($_POST["assunto"] ?? "");

$mensagem = trim($_POST["mensagem"] ?? "");


/* =========================================================
   VALIDAÇÃO
========================================================= */

if (

    empty($nome) ||

    empty($email) ||

    empty($mensagem)

) {

    header("Location: contato.html?erro=campos");

    exit;

}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    header("Location: contato.html?erro=email");

    exit;

}


/* =========================================================
   E-MAIL QUE RECEBERÁ A MENSAGEM
========================================================= */

$para = "runesamba.oficial@gmail.com";


/* =========================================================
   ASSUNTO DO E-MAIL
========================================================= */

$assuntoEmail =

    "Novo contato pelo site — Run & Samba 2026";


/* =========================================================
   MENSAGEM HTML
========================================================= */

$corpo = "

<!DOCTYPE html>

<html lang='pt-BR'>

<head>

    <meta charset='UTF-8'>

</head>

<body style='
    margin: 0;
    padding: 30px;
    background: #f4f4f4;
    font-family: Arial, sans-serif;
'>

    <div style='
        max-width: 650px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
    '>

        <div style='
            padding: 25px;
            background: #080808;
            color: #ffffff;
        '>

            <h1 style='
                margin: 0;
                font-size: 24px;
            '>

                RUN & SAMBA 2026

            </h1>

            <p style='
                margin: 8px 0 0;
                color: #ffd500;
            '>

                NOVO CONTATO RECEBIDO

            </p>

        </div>


        <div style='
            padding: 30px;
            color: #222222;
        '>

            <h2>
                Informações do contato
            </h2>


            <hr>


            <p>

                <strong>Nome:</strong>

                {$nome}

            </p>


            <p>

                <strong>E-mail:</strong>

                {$email}

            </p>


            <p>

                <strong>Telefone:</strong>

                {$telefone}

            </p>


            <p>

                <strong>Assunto:</strong>

                {$assuntoContato}

            </p>


            <hr>


            <h3>
                Mensagem
            </h3>


            <p style='
                line-height: 1.7;
            '>

                " . nl2br(htmlspecialchars($mensagem)) . "

            </p>


        </div>


        <div style='
            padding: 20px 30px;
            background: #080808;
            color: #888888;
            font-size: 12px;
        '>

            Mensagem enviada pelo site Run & Samba 2026.

        </div>

    </div>

</body>

</html>

";


/* =========================================================
   CABEÇALHOS
========================================================= */

$headers =

    "MIME-Version: 1.0\r\n";


$headers .=

    "Content-type: text/html; charset=UTF-8\r\n";


$headers .=

    "From: Run & Samba <noreply@seudominio.com>\r\n";


$headers .=

    "Reply-To: {$email}\r\n";


/* =========================================================
   ENVIA O E-MAIL
========================================================= */

$enviado = mail(

    $para,

    $assuntoEmail,

    $corpo,

    $headers

);


/* =========================================================
   REDIRECIONAMENTO
========================================================= */

if ($enviado) {

    header("Location: obrigado.html");

    exit;

}


/* =========================================================
   ERRO
========================================================= */

header("Location: contato.html?erro=envio");

exit;

?>