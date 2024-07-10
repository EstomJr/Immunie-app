# 📇 Carteirinha

Bem-vindo à Carteirinha! 🎉

A **Carteirinha** é uma aplicação inovadora que permite aos usuários criar e gerenciar uma carteira eletrônica de acesso, disponível online para exibição em dispositivos móveis. Facilite o acesso e exibição dos seus dados importantes com apenas alguns cliques!
## 🚀 Funcionalidades Principais

#### 📷 Upload e Edição de Foto ✅
- Os usuários podem fazer upload de uma foto e substituí-la quando necessário.
#### ✍️ Preenchimento e Edição do Nome ✅
- Os usuários podem preencher e editar seu nome a qualquer momento.
#### 📅 Cálculo Automático da Data de Validade ✅
- A data de validade da carteira é calculada automaticamente para 1 ano após a última atualização da conta.


## 🛠️ Tecnologias Utilizadas

**Front-end:** TypeScript, React/Next.js, TailwindCSS

**Back-end:** Node, Express, AWS S3, MongoDB


## Deploy

o deploy da aplicação em frontend está hospedado no link:

 [Immunie app](https://immunie-carteirinha.vercel.app/)

o deploy da API está hospedado no link:

 [Immunie API](https://immunie-api-v6gs.onrender.com)


## Documentação da API

#### Retorna todos os usuários

```http
  GET /api/users
```

#### Cria um novo usuário

```http
  POST /api/users
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `photo`      | `file` | **Obrigatório**. A foto do usuário |
| `name`      | `string` | **Obrigatório**. O nome do usuário |

#### Retorna um usuário

```http
    GET /api/users/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

#### Atualiza a foto de um usuário

```http
    PUT /api/users/${id}/photo
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário |
| `photo`      | `file` | **Obrigatório**. A nova foto do usuário |

#### Atualiza o nome de um usuário

```http
    PUT /api/users/${id}/name
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário |
| `name`      | `string` | **Obrigatório**. O novo nome do usuário |


## Rodando API  localmente

Clone o projeto

```bash
  git clone https://github.com/EstomJr/Immunie-app.git
```

Entre no diretório do projeto

```bash
  cd backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  node server.js
```

## Rodando frontend  localmente

Clone o projeto

```bash
  git clone https://github.com/EstomJr/Immunie-app.git
```

Entre no diretório do projeto

```bash
  cd frontend
```

Instale as dependências

```bash
  pnpm install
```

Inicie o servidor

```bash
  pnpm dev
```

