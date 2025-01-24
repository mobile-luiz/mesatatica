# Sistema de Escalação e Mesa Tática de Futebol

Este sistema foi desenvolvido para gerenciar a escalação de jogadores e suas posições em uma mesa tática de futebol. Ele permite que você adicione jogadores à sua equipe, defina suas posições, visualize e altere a disposição deles no campo e compartilhe a mesa tática com outras pessoas.

## Funcionalidades

1. **Cadastro de Jogadores**
   - Adiciona jogadores à equipe informando o nome e a posição.
   - A lista de jogadores é armazenada no `localStorage`, permitindo persistência entre as sessões.

2. **Escalação de Jogadores**
   - Os jogadores são exibidos em uma tabela com suas informações e podem ser editados ou excluídos.
   - Cada jogador tem um botão para editar ou excluir, com confirmação antes da exclusão.

3. **Mesa Tática de Futebol**
   - A disposição dos jogadores pode ser visualizada em um campo de jogo (divisão do campo com coordenadas x e y).
   - Os jogadores podem ser arrastados e reposicionados no campo.
   - As posições dos jogadores são salvas automaticamente no `localStorage` e sincronizadas com a tabela de escalação.

4. **Compartilhamento da Mesa Tática**
   - A mesa tática pode ser compartilhada por meio de um link de e-mail ou utilizando a API de compartilhamento do navegador.
   - A mesa é capturada como uma imagem e enviada como parte do corpo do e-mail.

5. **Persistência de Dados**
   - As informações de jogadores e suas posições no campo são salvas no `localStorage`, permitindo que as alterações sejam mantidas entre as sessões.

## Tecnologias Utilizadas

- **HTML5**: Para a estruturação das páginas e elementos da interface.
- **CSS3**: Para a estilização e organização do layout.
- **JavaScript**: Para a lógica de funcionamento, manipulação da tabela, do campo de jogo e do `localStorage`.
- **html2canvas**: Para capturar a imagem da mesa tática e permitir o compartilhamento.

## Como Usar

1. **Adicionando Jogadores**
   - Preencha os campos de nome e posição e clique em "Adicionar Jogador" para incluir o jogador na tabela e no campo de jogo.
   
2. **Editando Jogadores**
   - Clique no botão "Editar" na tabela para alterar o nome ou a posição do jogador.
   
3. **Excluindo Jogadores**
   - Clique no botão "Excluir" na tabela para remover o jogador da lista e do campo de jogo.

4. **Movendo Jogadores no Campo**
   - Arraste os jogadores no campo para alterar suas posições. As mudanças são salvas automaticamente.

5. **Compartilhando a Mesa Tática**
   - Clique no botão "Compartilhar Mesa Tática" para gerar um link de e-mail ou compartilhar via API de compartilhamento.

## Exemplo de Uso

1. **Adicionar um jogador**
   - Nome: "João"
   - Posição: "Atacante"
   
   Clique em "Adicionar Jogador". O jogador será adicionado à tabela e aparecerá no campo de jogo.

2. **Editar um jogador**
   - Na tabela de escalação, clique em "Editar" ao lado de um jogador. Altere o nome ou a posição.

3. **Excluir um jogador**
   - Na tabela de escalação, clique em "Excluir" ao lado de um jogador. Uma janela de confirmação será exibida.

4. **Compartilhar a mesa tática**
   - Clique em "Compartilhar Mesa Tática" para gerar um link de e-mail ou usar a API de compartilhamento.

## Estrutura de Arquivos

## Contribuindo

Se você deseja contribuir com o projeto, faça um fork do repositório, crie uma branch para suas mudanças e envie um pull request. Toda contribuição é bem-vinda!

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).







