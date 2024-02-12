$(document).ready(function () {
    // Verifica se o token está armazenado localmente
    if (localStorage.getItem("token") === null) {
        // Aqui você pode adicionar qualquer lógica que deseja executar quando o token não estiver presente
    } else {
        // Redireciona para outra página se o token estiver presente
        window.location.href = "card.html";
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if(token)
    {
        $.ajax({
            type: 'GET',
            url: 'https://meemic.felipetravassos.com/server/getToken.php?token=' + token,
            contentType: 'application/json',
        })
        .done((data) => {
            if (data == 0) {
                // Mostra um modal informando que o token é inválido
                $('#token').val(token);
                $('#tokenModal').modal('show');
            } else {
                // Define o token no localStorage e redireciona para a página de cartão
                localStorage.setItem("token", token);
                window.location.href = "card.html";
            }
        })
        .fail((err) => {
            console.error("Erro na solicitação AJAX:", err);
            // Adicione uma mensagem de erro adequada aqui, se necessário
        })
    }
    // Manipula a submissão do formulário
    $("#tokenForm").submit(function (event) {
        // Previne o envio padrão do formulário
        event.preventDefault();

        // Obtém o token do campo de entrada
        const token = $("#token").val();
        
        // Verifica se o token não está vazio
        if (token.trim() === "") {
            console.error("O token está vazio.");
            return;
        }

        // Faz a solicitação AJAX para verificar se o token é válido
        $.ajax({
            type: 'GET',
            url: 'https://meemic.felipetravassos.com/server/getToken.php?token=' + token,
            contentType: 'application/json',
        })
        .done((data) => {
            if (data == 0) {
                // Mostra um modal informando que o token é inválido
                $('#tokenModal').modal('show');
            } else {
                // Define o token no localStorage e redireciona para a página de cartão
                localStorage.setItem("token", token);
                window.location.href = "card.html";
            }
        })
        .fail((err) => {
            console.error("Erro na solicitação AJAX:", err);
            // Adicione uma mensagem de erro adequada aqui, se necessário
        })
    });
});