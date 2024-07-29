
# Fibblog

## Descrição

Este é um projeto de aplicação full-stack para um blog onde os usuários podem criar, editar, remover posts e comentar. O sistema possui autenticação JWT para garantir segurança. O back-end é desenvolvido em Java utilizando o Spring Boot, e o front-end é construído com React e TypeScript.

## Tecnologias Utilizadas

### Back-end
- **Java 17**
- **Spring Boot**
- **Spring Security** (para autenticação JWT)
- **MySQL** (para banco de dados)
- **Docker** (para containerização)

### Front-end
- **React** (biblioteca para construção de interfaces)
- **TypeScript** (superset do JavaScript)
- **Tailwind CSS** (para estilização)
- **Axios** (para requisições HTTP)

## Funcionalidades

- **Autenticação**: Login e registro de usuários com JWT.
- **Gerenciamento de Posts**: Criação, edição e remoção de posts.
- **Comentários**: Adicionar e remover comentários nos posts.
- **CRUD Completo**: Operações de criar, ler, atualizar e deletar posts e comentários.

## Instalação e Configuração

### Back-end

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/w-felipe360/fibblog.git

2. **Navegue até o diretório do projeto:**
    ```bash
    cd fibblog
3. **Inicie os conteiners:**
    ```bash
    docker-compose up -d
4. **Assim que o banco iniciar, inicie o conteiner do back-end:**
    ```bash
    docker-compose start fibblog-backend

### Screenshots:

#### Tela de Login:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/fibblogLoginScreen.jpeg" alt="Login screen" width="600">

#### Tela de Registro:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/registerScreenFibbo.jpeg" alt="Login screen" width="600">

### Tela inicial:

<img src="https://github.com/w-felipe360/images/blob/main/homeScreenFibblog.jpeg" alt="Home screen" width="600">


### Postagens e comentários:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/comments.jpeg" alt="Comments screen" width="600">

### Edição de comentários:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/editComment.jpeg" alt="editing comments screen" width="600">

### Remoção de comentários:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/deleteComment.jpeg" alt="Removing comments screen" width="600">

### Nova postagem:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/NewPostFibbo.jpeg" alt="New post Screen" width="600">


### Remover postagem:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/DeletePost.jpeg" alt="Remove post screen" width="600">

### Edição de postagem:

<img src="https://raw.githubusercontent.com/w-felipe360/images/main/EditPost.jpeg" alt="Editing post screen" width="600">

### API:

A API foi criada para integração com o frontend com os seguintes Controladores:

<img src="https://github.com/w-felipe360/images/blob/main/routesbackendFibbo.png?raw=true" alt="API Controllers" width="600">

### ROTAS:

Você pode tentar acessar as rotas através de uma aplicação de requisição, como por exemplo o Insomnia

#### CRUD Systems:

<img src="https://github.com/w-felipe360/images/blob/main/routesInsomnia.png?raw=true" alt="CRUD Systems" width="600">