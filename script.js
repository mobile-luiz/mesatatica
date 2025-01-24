const escalacaoTable = document.getElementById("escalacao").getElementsByTagName("tbody")[0];
const campo = document.getElementById("campo");

let jogadores = [];

// Carrega os jogadores e suas posições salvas no localStorage
window.onload = function () {
    const jogadoresSalvos = JSON.parse(localStorage.getItem("jogadores"));
    const posicoesSalvas = JSON.parse(localStorage.getItem("posicoesJogadores"));

    if (jogadoresSalvos && posicoesSalvas) {
        jogadores = jogadoresSalvos;
        posicoesSalvas.forEach(posicao => {
            // Adiciona o jogador à tabela e ao campo com base nas posições salvas
            adicionarJogadorTabela(posicao.nome, posicao.posicao);
            adicionarJogadorCampo(posicao.nome, posicao.posicao, posicao.x, posicao.y);
        });
    }
};

// Função para adicionar jogador
function adicionarJogador() {
    const nome = document.getElementById("nomeJogador").value;
    const posicao = document.getElementById("posicaoJogador").value;

    // Verifica se os campos não estão vazios
    if (nome === '' || posicao === '') {
        alert('Preencha todos os campos!');
        return;
    }

    // Cria o objeto do jogador
    const jogador = { nome, posicao };

    // Adiciona o jogador à lista
    jogadores.push(jogador);

    // Atualiza o localStorage
    localStorage.setItem("jogadores", JSON.stringify(jogadores));

    // Adiciona o jogador à tabela e ao campo
    adicionarJogadorTabela(nome, posicao);
    adicionarJogadorCampo(nome, posicao, Math.random() * 300, Math.random() * 300);

    // Limpa os campos de entrada
    document.getElementById("nomeJogador").value = "";
    document.getElementById("posicaoJogador").value = "";
}

// Adiciona jogador à tabela
function adicionarJogadorTabela(nome, posicao) {
    const row = escalacaoTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = nome;
    cell2.textContent = posicao;

    // Botões de editar e excluir
    const editarBotao = document.createElement('button');
    editarBotao.textContent = 'Editar';
    editarBotao.onclick = () => editarJogador(row, nome, posicao);

    const excluirBotao = document.createElement('button');
    excluirBotao.textContent = 'Excluir';
    excluirBotao.onclick = () => excluirJogador(row, nome);

    // Adiciona os botões na célula de ações
    cell3.appendChild(editarBotao);
    cell3.appendChild(excluirBotao);
}

// Adiciona jogador ao campo de jogo
function adicionarJogadorCampo(nome, posicao, x, y) {
    const jogadorSolto = document.createElement("div");
    jogadorSolto.classList.add("jogador");
    jogadorSolto.textContent = nome;
    jogadorSolto.style.left = `${x}px`;
    jogadorSolto.style.top = `${y}px`;
    campo.appendChild(jogadorSolto);

    jogadorSolto.setAttribute("data-nome", nome);
    jogadorSolto.setAttribute("data-posicao", posicao);

    // Adiciona eventos de arrastar e soltar
    jogadorSolto.draggable = true;
    jogadorSolto.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text", nome);
    });

    jogadorSolto.addEventListener("dblclick", function () {
        // Remove o jogador do campo e da lista
        campo.removeChild(jogadorSolto);
        jogadores = jogadores.filter(jogador => jogador.nome !== nome);

        // Atualiza o localStorage
        localStorage.setItem("jogadores", JSON.stringify(jogadores));

        // Remove a posição do jogador
        const posicoesSalvas = JSON.parse(localStorage.getItem("posicoesJogadores")) || [];
        const index = posicoesSalvas.findIndex(posicao => posicao.nome === nome);
        if (index !== -1) {
            posicoesSalvas.splice(index, 1);
            localStorage.setItem("posicoesJogadores", JSON.stringify(posicoesSalvas));
        }
    });

    // Permite o arraste do jogador para outra posição
    campo.ondragover = (event) => event.preventDefault();
    campo.ondrop = (event) => {
        event.preventDefault();
        const nomeJogador = event.dataTransfer.getData("text");
        const novoX = event.offsetX - 20; // Ajusta o jogador para o centro do mouse
        const novoY = event.offsetY - 20;

        // Atualiza a posição do jogador no campo
        const jogadorNoCampo = campo.querySelector(`[data-nome="${nomeJogador}"]`);
        if (jogadorNoCampo) {
            jogadorNoCampo.style.left = `${novoX}px`;
            jogadorNoCampo.style.top = `${novoY}px`;

            // Atualiza a posição salva no localStorage
            const posicoesSalvas = JSON.parse(localStorage.getItem("posicoesJogadores")) || [];
            const jogadorExistente = posicoesSalvas.find(jogador => jogador.nome === nomeJogador);
            if (jogadorExistente) {
                jogadorExistente.x = novoX;
                jogadorExistente.y = novoY;
            }

            // Salva as novas posições
            localStorage.setItem("posicoesJogadores", JSON.stringify(posicoesSalvas));

            // Sincroniza a tabela com a posição atualizada
            atualizarTabelaPosicao(nomeJogador, novoX, novoY);
        }
    };
}

// Sincroniza a tabela com a posição atualizada
function atualizarTabelaPosicao(nomeJogador, x, y) {
    const jogadorTabela = [...escalacaoTable.rows].find(row => row.cells[0].textContent === nomeJogador);
    if (jogadorTabela) {
        jogadorTabela.cells[0].textContent = nomeJogador;
        // Atualiza as coordenadas no localStorage
        const posicoesSalvas = JSON.parse(localStorage.getItem("posicoesJogadores")) || [];
        const jogadorExistente = posicoesSalvas.find(jogador => jogador.nome === nomeJogador);
        if (jogadorExistente) {
            jogadorExistente.x = x;
            jogadorExistente.y = y;
        }
        localStorage.setItem("posicoesJogadores", JSON.stringify(posicoesSalvas));
    }
}

// Função para editar um jogador
function editarJogador(row, nomeAntigo, posicaoAntiga) {
    const nomeNovo = prompt('Digite o novo nome:', nomeAntigo);
    const posicaoNova = prompt('Digite a nova posição:', posicaoAntiga);

    if (nomeNovo && posicaoNova) {
        // Atualiza a tabela
        row.cells[0].textContent = nomeNovo;
        row.cells[1].textContent = posicaoNova;

        // Atualiza a lista de jogadores
        jogadores = jogadores.map(jogador => {
            if (jogador.nome === nomeAntigo && jogador.posicao === posicaoAntiga) {
                return { nome: nomeNovo, posicao: posicaoNova };
            }
            return jogador;
        });

        // Atualiza o localStorage
        localStorage.setItem("jogadores", JSON.stringify(jogadores));

        // Atualiza a mesa tática
        const jogadorNoCampo = campo.querySelector(`[data-nome="${nomeAntigo}"]`);
        if (jogadorNoCampo) {
            // Atualiza o nome e a posição visual no campo
            jogadorNoCampo.textContent = nomeNovo;
            jogadorNoCampo.setAttribute("data-nome", nomeNovo);
            jogadorNoCampo.setAttribute("data-posicao", posicaoNova);
        }
    }
}

// Função para excluir um jogador
function excluirJogador(row, nome) {
    if (confirm('Tem certeza que deseja excluir este jogador?')) {
        // Remove o jogador da lista
        jogadores = jogadores.filter(jogador => jogador.nome !== nome);

        // Atualiza o localStorage
        localStorage.setItem("jogadores", JSON.stringify(jogadores));

        // Remove a linha da tabela
        row.remove();

        // Remove o jogador do campo
        const jogadorNoCampo = campo.querySelector(`[data-nome="${nome}"]`);
        if (jogadorNoCampo) {
            campo.removeChild(jogadorNoCampo);
        }

        // Atualiza as posições salvas no localStorage
        const posicoesSalvas = JSON.parse(localStorage.getItem("posicoesJogadores")) || [];
        const index = posicoesSalvas.findIndex(posicao => posicao.nome === nome);
        if (index !== -1) {
            posicoesSalvas.splice(index, 1);
            localStorage.setItem("posicoesJogadores", JSON.stringify(posicoesSalvas));
        }
    }
}


function compartilharMesaTatica() {
    // Seleciona o elemento que contém a mesa tática (campo de jogo)
    const campoMesa = document.getElementById("campo");

    // Usa html2canvas para capturar uma imagem do campo
    html2canvas(campoMesa).then(canvas => {
        // Converte o canvas para uma imagem em formato base64
        const imagemBase64 = canvas.toDataURL("image/png");

        // Cria um link de e-mail com a imagem como anexo (não pode anexar diretamente, então apenas inclui a imagem no corpo)
        const subject = 'Mesa Tática de Futebol';
        const body = 'Aqui está a mesa tática com a escalação e as posições dos jogadores:\n\n' + imagemBase64;

        // Monta o link para enviar o e-mail com a imagem
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Verifica se a API de compartilhamento está disponível
        if (navigator.share) {
            console.log('Tentando compartilhar com API de compartilhamento...');
            navigator.share({
                title: 'Mesa Tática de Futebol',
                text: 'Aqui está a mesa tática com a escalação e as posições dos jogadores:',
                url: imagemBase64 // Pode tentar compartilhar a imagem diretamente
            }).then(() => {
                console.log('Compartilhado com sucesso!');
            }).catch((error) => {
                console.log('Erro ao compartilhar via API:', error);
            });
        } else {
            console.log('Compartilhamento via API não suportado, utilizando link de e-mail.');
            window.location.href = mailtoLink; // Se não suportar, envia o e-mail
        }

        // Atualiza o localStorage com as posições dos jogadores (caso necessário)
        const posicoesJogadores = [];
        const jogadoresCampo = document.querySelectorAll(".jogador");

        jogadoresCampo.forEach(jogador => {
            const nome = jogador.getAttribute("data-nome");
            const posicao = jogador.getAttribute("data-posicao");
            const x = parseFloat(jogador.style.left);
            const y = parseFloat(jogador.style.top);

            posicoesJogadores.push({ nome, posicao, x, y });
        });

        localStorage.setItem("posicoesJogadores", JSON.stringify(posicoesJogadores));
    });
}
