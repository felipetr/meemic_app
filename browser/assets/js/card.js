$(document).ready(function () {
    // Verifica se o token está presente no localStorage
    var token = localStorage.getItem("token");
    $("#tokentxt span").text(token);
    if (token === null) {
        // Se o token não estiver presente, redireciona para a página de índice
        window.location.href = "index.html";
        // Aqui você pode adicionar qualquer lógica que deseja executar quando o token não estiver presente
    }
    
    // Define o evento de clique para o cartão
    $("#card").on("click", function () {
        $("#card").addClass('flipped');
    });

    // Define o evento de clique para o botão de saída
    $("#exitBtn").on("click", function () {
        // Remove o token do localStorage
        localStorage.removeItem("token");
        // Redireciona para a página de índice
        window.location.href = "index.html";
    });

    var word = '';

    // Função para atualizar a palavra exibida no cartão
    function wordChanged(data) {
        word = data;
        $("#card").removeClass("flipped");
        setTimeout(function () {
            $('.word').text(data);
        }, 1000);
    }

    // Função para verificar se a palavra no cartão foi alterada
    function detectCardChange() {
        $.ajax({
            type: 'GET',
            url: 'https://meemic.felipetravassos.com/server/getCard.php?token=' + token,
            contentType: 'application/json',
        })
        .done((data) => {
            if (word != data) {
                wordChanged(data);
            }
        })
        .fail((xhr, textStatus, errorThrown) => {
            console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
        })
        .always(() => {
            // Aguarda 4 segundos antes de fazer a próxima verificação
            setTimeout(detectCardChange, 4000);
        });
    }

});