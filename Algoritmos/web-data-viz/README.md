# Castlevania Collection com Web Data Viz

## Como executar

1. Ligue a VM e mantenha o redirecionamento da porta 3307 do computador para o MySQL da VM.
2. No Workbench, use a conexão já configurada para `127.0.0.1:3307`, usuário `aluno`.
3. Se o banco ainda não existir, execute `Banco de dados/CastlevaniaCollection.sql`, na raiz do projeto. Há uma cópia idêntica em `src/database/script-tabelas.sql`. Execute apenas uma delas. O script cria o banco e insere somente os quatro jogos e personagens.
4. Abra o terminal na pasta `Algoritmos/web-data-viz`.
5. Execute `npm install`.
6. Execute `npm start`.
7. Abra `http://localhost:3333` no navegador.

Não abra o HTML diretamente por arquivo. As chamadas à API usam o mesmo endereço do servidor.

## Configuração

A configuração ativa está em `.env.dev`:

- Ambiente: desenvolvimento.
- Banco: castlevaniaCollection.
- Host do MySQL: 127.0.0.1.
- Porta do MySQL: 3307.
- Usuário do MySQL: aluno.
- Porta do site/API: 3333.

A senha fornecida já foi gravada nos arquivos de ambiente, entre aspas para preservar o caractere especial. Ela não está no JavaScript do navegador. Os arquivos de ambiente estão no `.gitignore`.

A seleção entre `.env.dev` e `.env` continua em `app.js`, pelo valor de `ambiente_processo`, como no exemplo original. O host do banco é o redirecionamento local da VM; isso não exige trocar automaticamente o ambiente para produção.

## Estrutura

- `public`: Home e arquivos de estilo, scripts e imagens.
- `private`: páginas de cadastro, login, quiz e painel, servidas conforme o estado da sessão.
- `src/routes`: recebe as chamadas HTTP.
- `src/controllers`: valida os valores e devolve a resposta.
- `src/models`: monta as consultas ao banco.
- `src/database/config.js`: mantém a mesma configuração e sequência de conexão MySQL da Web Data Viz original; somente o comentário foi removido.

O caminho permanece: navegador → fetch → rota → controller → model → database/config.js → MySQL.

## Funcionalidades conectadas

- Cadastro: grava apelido, e-mail, senha e personagem.
- Login: consulta as credenciais e abre a Home.
- Cabeçalho: mostra o apelido e o personagem da conta. O botão Sair, ao lado do avatar, encerra a sessão no servidor.
- Favoritos: consulta, adiciona e remove escolhas do usuário no banco.
- Quiz: recebe as quatro respostas, calcula os acertos no servidor e registra a tentativa. Use Tentar novamente para outra tentativa.
- Painel: consulta quantidades reais de usuários, favoritos, participantes, personagens e distribuição de acertos. Por padrão, os dados reais são consultados ao abrir a página. O link Ver dados de demonstração exibe quatro usuários, cinco favoritos e quatro tentativas fictícias definidos no JavaScript do painel.

O navegador guarda a chave da sessão no sessionStorage. A API confere essa chave ao receber cada requisição protegida. A sessão dura até oito horas. Reiniciar a API encerra as sessões. O servidor usa essa sessão para identificar quem pode consultar ou gravar favoritos e resultados do quiz.

Os nomes técnicos necessários de `fetch`, `then`, `require`, `module.exports` e a biblioteca Chart.js foram mantidos. Os arquivos de interface continuam sem `getElementById`, `querySelector`, `textContent`, manipulação de estilo pelo JavaScript ou `return`.

## Rotas

| Método | Caminho | Uso |
|---|---|---|
| POST | /usuarios/cadastrar | Cadastro |
| POST | /usuarios/autenticar | Login |
| GET | /usuarios/sessao | Consultar a sessão atual |
| POST | /usuarios/sair | Encerrar sessão |
| GET | /favoritos/listar | Consultar favoritos |
| POST | /favoritos/cadastrar | Favoritar |
| DELETE | /favoritos/remover/:idJogo | Desfavoritar |
| POST | /quiz/registrar | Registrar respostas e acertos |
| GET | /dashboard/resumo | KPIs |
| GET | /dashboard/personagens | Escolhas de personagens |
| GET | /dashboard/favoritos | Favoritos por jogo |
| GET | /dashboard/quiz | Distribuição de acertos |

## Conferência no seu computador

Cadastre uma conta, faça login, favorite um jogo e responda ao quiz. Abra o Painel e confira os registros no Workbench. Recarregue a Home para confirmar que os favoritos continuam no banco.

Se houver falha de conexão, confira a VM ligada, o redirecionamento 3307, o usuário, a senha, o nome do banco e as permissões de acesso desse usuário. A porta 3333 atende o site; a porta 3307 atende o MySQL.

Nenhuma tabela existente foi apagada. Esta entrega não executa o SQL automaticamente e não inclui usuários, favoritos ou tentativas fictícios.
