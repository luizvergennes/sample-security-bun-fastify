# Projeto Backend Bun.js com Fastify - Simulação de Segurança

[English Version](#english-version)

Este projeto é um backend construído com Bun.js e Fastify, implementado em TypeScript, com o objetivo de demonstrar riscos comuns de segurança em APIs e como mitigá-los aplicando práticas básicas.

## Tecnologias

- Bun.js como gerenciador de pacotes e runtime.
- Fastify para criação do servidor HTTP.
- TypeScript com configurações estritas.
- bcrypt para hash de senhas.
- Middleware simples para simulação de autenticação por API Key.
- BiomeJS para linting e formatação (configurações locais não incluídas neste repositório).

---

## Funcionalidades da API

A API oferece:

- Cadastro, listagem e exclusão de produtos.
- Cadastro e listagem de usuários, com senha criptografada e omissão da senha ao listar.
- Middleware para exigir API Key na maioria das rotas, com exceção de:
  - Listar produtos
  - Cadastro de usuários

---

## Endpoints

### Produtos

- `GET /produtos`
  Retorna todos os produtos registrados (sem autenticação).

- `POST /produtos`
  Cadastra um novo produto. Não possui validação nem autenticação (simulação de risco).

- `DELETE /produtos/:id`
  Remove um produto pelo ID. Sem autorização (simulação de risco).

### Usuários

- `POST /usuarios`
  Registra um usuário com senha que será armazenada de forma segura com bcrypt.

- `GET /usuarios`
  Lista usuários, omitindo a senha para proteger dados sensíveis.

---

## Simulação de Riscos

- *API aberta para criação e remoção de produtos*: Qualquer um pode fazer alterações, evidenciando a importância de autenticação e autorização.
- *Armazenamento seguro de senhas*: As senhas são armazenadas como hash, protegendo contra vazamentos.
- *Omissão de dados sensíveis*: Senhas não são retornadas na listagem de usuários.

---

## Requisitos e Configuração

- Ter **Bun.js** instalado como runtime e gerenciador.
- Rodar `bun install` para instalar as dependências.
- Iniciar o servidor com:
  ```bash
  bun run dev
  ```
  ou diretamente com
  ```bash
  bun run start
  ```

---

## Testando a API

### Sem Autenticação

- `GET /produtos` — funciona normalmente.
- `POST /produtos` e `DELETE /produtos/:id` — também funcionam, pois o middleware não bloqueia (mostrando o risco).
- `GET /usuarios` — bloqueado (401 Unauthorized).
- `POST /usuarios` — funciona para cadastro.

### Com Autenticação

Para testar rotas protegidas, envie o header:

```
Authorization: ApiKey123
```

- Assim, `GET /usuarios`, `POST /produtos` e `DELETE /produtos/:id` funcionam normalmente.

---

## Notas

- O valor da API Key (`ApiKey123`) está fixo no código apenas para demonstração.
- Para produção, considere usar JWT, HTTPS, variáveis de ambiente e autenticação robusta.
- Este projeto tem o propósito educacional para demonstrar riscos sem proteção e como mitigá-los.

---

## Contato

Dúvidas ou sugestões? Abra uma issue ou contate o responsável pelo projeto.

---

## English Version

# Bun.js Fastify Backend Project - Security Simulation

This is a backend built with Bun.js and Fastify using TypeScript. It aims to demonstrate common API security risks and how to mitigate them with basic best practices.

## Technologies

- Bun.js as package manager and runtime.
- Fastify HTTP server.
- TypeScript with strict mode enabled.
- bcrypt for password hashing.
- Simple middleware simulating API Key authentication.
- BiomeJS for linting and formatting (local configs not included here).

---

## API Features

- CRUD operations on products: register, list, delete.
- User registration and listing with passwords hashed and omitted on lists.
- Middleware requiring an API Key for most routes except:
  - Product listing
  - User registration

---

## Endpoints

### Products

- `GET /produtos`
  Returns all registered products (no authentication).

- `POST /produtos`
  Registers a new product without validation or authentication (risk simulation).

- `DELETE /produtos/:id`
  Deletes a product by ID without authorization (risk simulation).

### Users

- `POST /usuarios`
  Registers a user with a securely hashed password using bcrypt.

- `GET /usuarios`
  Lists users omitting passwords to protect sensitive data.

---

## Risk Simulation

- *Open API for product creation and deletion*: anyone can manipulate data, showing why auth matters.
- *Secure password storage*: passwords are hashed to prevent data leaks.
- *Sensitive data omission*: passwords are never exposed in user lists.

---

## Requirements and Setup

- Install **Bun.js** as runtime and package manager.
- Run `bun install` to install dependencies.
- Start the server with:
  ```bash
  bun run dev
  ```
  or directly:
  ```bash
  bun run start
  ```

---

## Testing the API

### Without Authentication

- `GET /produtos` — works normally.
- `POST /produtos` and `DELETE /produtos/:id` — also work, showing the risk.
- `GET /usuarios` — blocked (401 Unauthorized).
- `POST /usuarios` — works for registration.

### With Authentication

To test protected routes, send header:

```
Authorization: ApiKey123
```

- This allows `GET /usuarios`, `POST /produtos` and `DELETE /produtos/:id` to work normally.

---

## Notes

- The API Key `ApiKey123` is hardcoded for demonstration only.
- For production, use JWT, HTTPS, environment variables and robust auth.
- This project is educational, demonstrating risks and mitigation.

---

## Contact

Questions or suggestions? Open an issue or contact the maintainer.
