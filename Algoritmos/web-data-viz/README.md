# Web Data Viz

Base de referência da São Paulo Tech School, com Express, CORS e MySQL.

## Estrutura mantida

- `app.js`: inicialização, middlewares e registro das rotas.
- `public`: espaço para os arquivos do seu site.
- `src/routes`: rotas HTTP.
- `src/controllers`: recebimento e validação dos dados.
- `src/models`: comandos SQL.
- `src/database/config.js`: conexão e execução dos comandos no MySQL.
- `.env.dev`: configurações de desenvolvimento.
- `.env`: configurações de produção.

## Execução

1. Execute `npm install` na pasta `web-data-viz`.
2. Preencha as configurações do banco no arquivo de ambiente correspondente. `DB_DATABASE` está vazio para você informar seu banco.
3. Em `app.js`, mantenha `ambiente_processo` como `desenvolvimento` para usar `.env.dev`, ou altere para `producao` para usar `.env`.
4. Execute `npm start`, ou `npm run dev` para usar o nodemon.
5. Acesse o endereço mostrado no terminal. Enquanto `public` estiver vazio, a página inicial mostra uma mensagem da API.

## Cadastro e login de referência

- `POST /usuarios/cadastrar`: recebe `nomeServer`, `emailServer` e `senhaServer`.
- `POST /usuarios/autenticar`: recebe `emailServer` e `senhaServer`.

Essas rotas ainda são exemplos genéricos. Os comandos SQL esperam uma tabela `usuario` com `id`, `nome`, `email` e `senha`. Adapte os campos e as consultas ao seu próprio banco antes de utilizar as rotas.

Nenhum site foi integrado e nenhum script de criação de banco é executado pela API. Coloque seus arquivos em `public` e adapte as rotas posteriormente.

Foram retirados os recursos de aquários, medidas, empresas, mural de avisos, páginas e imagens do exemplo, scripts de sessão e alertas e projetos auxiliares de demonstração.

O módulo `path` continua sendo utilizado em `app.js`, diretamente do Node.js. Ele não precisa ser instalado pelo npm.

Licença original preservada no arquivo `LICENSE`.
