<h1 align='center' >your books API</h1>

API criada para o gerenciamento de livros pessoais.

## Tecnologias

- [Node](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org)
- [Graphql](https://graphql.org)
- [PostgreSQL](https://www.postgresql.org)

## Projeto

Esse projeto é uma aplicação node com graphql feita para organizar a biblioteca pessoal do usuário, podendo marcar os livros emprestados e a quem foi emprestado.

## Instruções

- Para instalar todas as dependências utilizadas do projeto basta rodar o comando `yarn`
- O servidor pode ser iniciado com `yarn dev`, onde se tem acesso pelo `http://localhost:3333/your-books-api`

## Type

```javascript
  User {
    id: ID
    name: String!
    email: String!
    password: String
    created_at: DateTime!
    updated_at: DateTime!

  }
```

```javascript
  Book {
     id: ID
    title: String!
    description: String!
    author: String!
    borrowed: Boolean!
    user_id: User!
    borrowed_user_id: User
    created_at: DateTime!
    updated_at: DateTime!
  }
```


## Query
- showUser `Retorna os dados do usuaário autenticado`.
- findBooksByUserId `Retorna os livros do usuário autenticado`.
- FilterByBorrowedBooksAndByUser `Filtra livros que o usuário emprestou`.
- findBookById `Bunca um livro pelo id` 
```javascript
  Dados que precisa ser enviado em findBookById
  data: { 
    book_id: string
  }
```

# Mutation
- createUser `cria um novo usuário`
```javascript
  Dados que precisa ser enviado em createUser
  data: { 
    name: string,
    email: string,
    password: string
  }
```
- updateUser `atualiza um usuário`
```javascript
  Dados que podem ser enviado em updateUser
  data: { 
    name: string,
    email: string,
    password: string
  }
```
- deleteUser `deleta um usuário.`
- userAuthenticatication `autenticação de usuário`.
```javascript
  Dados que precisam ser enviado em userAuthenticatication
  data: { 
    email: string,
    password: string
  }
```
- createBook `cria um novo livro`.
```javascript
  Dados que precisam ser enviado em createBook
  data: { 
    title: string,
    description: string,
    author: string,
  }
```
- updateBook `atualiza um novo livro`.
```javascript
  Dados que precisam ser enviado em updateBook
  data: { 
    book_id: string,
    title: string,
    description: string,
    author: string,
  }
```
- borrowBook`empresta um livro.`
```javascript
  Dados que precisam ser enviado em updateBook
  data: { 
    book_id: string,
    borrowed_user_id: string
  }
```
- borrowedBookReturn `marca um livro como devolvido`
```javascript
  Dados que precisam ser enviado em borrowedBookReturn
  data: { 
    book_id: string,
  }
```
- deleteBook `deleta um livro`
```javascript
  Dados que precisam ser enviado em deleteBook
  data: { 
    book_id: string,
  }
```
