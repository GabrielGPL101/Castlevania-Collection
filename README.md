# 🦇 Projeto Individual - Castlevania Legacy

## Sobre o projeto

Castlevania Legacy é meu projeto individual do curso de Análise e Desenvolvimento de Sistemas da SPTech. O site, apresentado como **Castlevania Collection**, reúne quatro clássicos de exploração 2D da franquia Castlevania.

| Jogo | Plataforma | Personagem |
| --- | --- | --- |
| *Symphony of the Night* | PlayStation | Alucard |
| *Circle of the Moon* | Game Boy Advance | Nathan Graves |
| *Harmony of Dissonance* | Game Boy Advance | Juste Belmont |
| *Aria of Sorrow* | Game Boy Advance | Soma Cruz |

Meu objetivo foi aplicar os conteúdos das disciplinas do semestre em um projeto sobre uma franquia de que gosto. O desenvolvimento reuniu interface web, validação de formulários, integração com uma API, modelagem de banco de dados e visualização de dados.

## Páginas e funcionalidades

| Página | O que você pode fazer |
| --- | --- |
| **Home** | Conhecer os quatro jogos e seus personagens. Depois do login, marque ou desmarque a estrela ao lado de um jogo e abra **Favoritos** no menu para ver a lista na própria Home. |
| **Cadastro** | Escolher um dos quatro personagens como avatar e criar uma conta com apelido, e-mail, senha e confirmação. O formulário verifica os campos antes de enviar e encaminha você ao login após o cadastro. |
| **Login** | Entrar com e-mail e senha. A API consulta o MySQL e, quando as credenciais são válidas, cria uma sessão. A Home passa a mostrar seu apelido, seu avatar e o botão **Sair**. |
| **Quiz** | Responder quatro perguntas, uma por jogo. A API corrige as alternativas, registra a tentativa no banco e devolve a pontuação. A página mostra os acertos e as respostas corretas. |
| **Painel** | Ver os totais de usuários, favoritos, tentativas e participantes únicos do quiz. Os gráficos exibem escolhas por personagem, favoritos por jogo e a distribuição das tentativas por número de acertos. O botão **Ver dados de demonstração** exibe números fictícios para apresentação. |

A Home pode ser visitada sem conta. As operações de favoritos, o registro do quiz e as consultas do painel usam a sessão para validar o acesso. Favoritos e resultados do quiz ficam gravados no MySQL.

## Tecnologias e arquitetura

- **Frontend:** HTML, CSS e JavaScript para a interface, as validações e as chamadas à API com `fetch`. Os gráficos são exibidos com Chart.js.
- **Backend:** Node.js e Express, com a estrutura da Web Data Viz adaptada ao projeto. As rotas recebem as requisições, os controllers verificam os dados e os models montam as consultas SQL.
- **Banco de dados:** MySQL em uma máquina virtual Linux. O modelo lógico relaciona jogos, personagens, usuários, favoritos e resultados do quiz.

**Fluxo dos dados** · Navegador → rota → controller → model → MySQL. O controller devolve o resultado ao navegador, que atualiza a interface.

| Caminho | Conteúdo |
| --- | --- |
| [`Algoritmos/web-data-viz/`](Algoritmos/web-data-viz/) | Aplicação integrada. O arquivo `app.js` inicia o servidor. |
| [`public/`](Algoritmos/web-data-viz/public/) e [`private/`](Algoritmos/web-data-viz/private/) | Home, arquivos públicos e páginas que o servidor entrega por rota. |
| [`src/`](Algoritmos/web-data-viz/src/) | Rotas, controllers, models, configuração do MySQL e controle de sessão. |
| [`Banco de dados/`](Banco%20de%20dados/) | Modelo lógico e script SQL do projeto. |

## Como executar localmente

Você precisa de **Node.js com npm** no computador e de uma **VM Linux com MySQL**. Use o Git para clonar o repositório ou baixe o ZIP pelo botão **Code** do GitHub.

### 1. Obtenha o projeto

```bash
git clone https://github.com/GabrielGPL101/Castlevania-Collection.git
cd Castlevania-Collection
```

### 2. Ligue a VM e prepare o banco

1. Inicie a VM e confira se o serviço do MySQL está rodando. Se a VM usar o serviço `mysql` com systemd, você pode iniciá-lo com `sudo systemctl start mysql`.
2. Configure a conexão do computador com o MySQL da VM. O exemplo abaixo considera um encaminhamento de `127.0.0.1:3307` no computador para a porta `3306` da VM. Se conectar diretamente pelo IP da VM, use o IP e a porta em que o MySQL estiver escutando.
3. Na primeira instalação, abra a conexão no MySQL Workbench ou em outro cliente SQL e execute [`Banco de dados/CastlevaniaCollection.sql`](Banco%20de%20dados/CastlevaniaCollection.sql) com uma conta autorizada a criar o banco. O script cria o banco `castlevaniaCollection`, as tabelas e os registros iniciais dos jogos e personagens. Se o banco já estiver preparado, siga para a configuração da aplicação.

### 3. Configure a conexão da aplicação

Crie o arquivo **`Algoritmos/web-data-viz/.env.dev`**, usado pelo servidor em modo de desenvolvimento. O exemplo usa a porta `3333` para o site e `3307` para o acesso ao MySQL por encaminhamento.

```dotenv
AMBIENTE_PROCESSO=desenvolvimento
APP_HOST=localhost
APP_PORT=3333

DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=castlevaniaCollection
DB_USER=seu_usuario_mysql
DB_PASSWORD="sua_senha_mysql"
```

Substitua `DB_USER` e `DB_PASSWORD` pelas suas credenciais. Ajuste `DB_HOST` e `DB_PORT` se a sua VM usar outra conexão. Mantenha o arquivo com as credenciais no seu ambiente local.

### 4. Inicie o site

A partir da raiz do repositório, abra o terminal e execute os comandos abaixo.

```bash
cd Algoritmos/web-data-viz
npm install
npm start
```

Quando o servidor iniciar, acesse [http://localhost:3333](http://localhost:3333). Se alterou `APP_PORT`, use a porta que definiu. Para interromper o servidor, pressione **Ctrl+C** no terminal.

### 5. Confira a integração

Crie uma conta, faça login, favorite um jogo e conclua o quiz. Abra o **Painel** no modo de dados reais para conferir se as ações aparecem nos indicadores e gráficos.

Se a Home abrir, mas as operações falharem, teste a conexão com o MySQL pelo cliente SQL e confira a VM, o encaminhamento de porta e as variáveis do `.env.dev`.
