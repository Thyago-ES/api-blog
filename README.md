# API para gerenciamento de um blog

## Sobre o projeto
Esta API foi desenvolvida para prática dos conceitos de operações CRUD, relacionamentos entre entidades e design de API Restful.
Permitindo o registro de novos usuários no sistema e a autenticação via login, o gerenciamento de posts e comentários. A API oferece um sistema de autenticação de usuário com geração e validação de token jwt. Oferece também que somente usuários autenticados consigam criar e gerenciar posts e comentários.

## Estrutura de Pastas
/src               # Código-fonte principal  
  /controllers     # Classes com métodos de controle das rotas  
  /middlewares     # Funções intermediárias que processam as requisições  
  /models          # Modelos de dados do MySQL  
  /routes          # Rotas aninhadas expostas para consultas  
/config            # Objetos isolados de configurações  
/database          # Classe do banco de dados para conexão e Migrations  

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução Javascript no lado do servidor.
- **Express.js**: Framework para Node.js que facilita a criação de servidores HTTP.
- **PostgreSQL**: Banco de dados relacional SQL open-source, amplamente utilizado, com foco em alto desempenho, ideal para aplicações web, dados estruturados e operações de leitura intensiva.
- **JWT (lib)**: Token compacto para autenticação segura entre partes.
- **Bcrypt (lib)**: Algoritmo de hashing usado para criptografar senhas de forma segura.
- **Yup (lib)**: Biblioteca de validação de esquemas em JavaScript, usada para definir e validar formatos de dados de forma simples e eficaz.

## Rodando localmente
Clone o repositório
```bash
git clone https://github.com/Thyago-ES/api-blog.git
```

Instalando as dependências
```bash
npm install
```

Inicializando o servidor
```bash
npm run dev
```

## Funcionalidades
### Autenticação
- **POST :: /auth/login**: Autentica o usuário verificando as credenciais fornecidas (email e senha) e retorna um token JWT caso a autenticação seja bem-sucedida.

### Usuário
- **GET :: /users/list**: Lista todos os usuários registrados no banco de dados.
- **GET :: /users/show/:id**: Exibe um usuário específico buscando-o com base no id do usuário fornecido como path parameter.
- **POST :: /users/register**: Registra um novo usuário no sistema com os dados do body da requisição, criptografa sua senha e persiste seus dados no banco.
- **PUT :: /users/update/:id**: Busca o usuário com base no id fornecido como path parameter, e, caso ele exista, atualiza seus dados com base nos dados fornecidos no body da requisição. Ainda, caso o usuário atualize a senha, criptografa-a novamente e persiste os novos dados no banco.
- **DELETE :: /users/destroy/:id**: Exclui um usuário específico buscando-o com base no id do usuário fornecido como path parameter.

### Postagem
- **GET :: /users/:userId/posts/list**: Lista todos as postagens de um usuário específico registradas no banco de dados.
- **GET :: /users/:userId/posts/show/:id**: Exibe uma postagem específica de um usuário buscando-a com base no id do usuário e no id do post fornecidos como path parameter.
- **POST :: /users/:userId/posts/create**: Registra uma nova postagem no sistema com os dados do body da requisição, caso o schema seja válido, verifica se o usuário existe com base no userId, caso ele exista, a nova postagem é criada. Ainda, caso o usuário não modifique a categoria da postagem, seu valor padrão é "GERAL".
- **PUT :: /users/:userId/posts/update/:id**: Busca a postagem com base no id do usuário e no id da postagem fornecidos como path parameter, e, caso eles existam, atualiza seus dados com base nos dados fornecidos no body da requisição.
- **DELETE :: /users/:userId/posts/destroy/:id**: Exclui uma postagem específica buscando-a com base no id do usuário e no id da postagem fornecidos como path parameter.

### Comentário
- **GET :: /posts/:postId/comments/list**: Lista todos os comentários de uma postagem específica registrados no banco de dados.
- **GET :: /posts/:postId/comments/show/:id**: Exibe um comentário específico buscando-o com base no id da postagem e no id do comentário fornecidos como path parameter.
- **POST :: /posts/:postId/comments/create**: Registra um novo comentário em uma postagem com os dados do body da requisição, caso o schema seja válido, verifica se a postagem existe com base no postId, caso ela exista, o novo comentário é criado.
- **PUT :: /posts/:postId/comments/update/:id**: Busca o comentário com base no id da postagem e no id do comentário fornecidos como path parameter, e, caso ele exista, atualiza seus dados com base nos dados fornecidos no body da requisição.
- **DELETE :: /posts/:postId/comments/destroy/:id**: Exclui um comentário específico buscando-o com base no id da postagem e no id do comentário fornecidos como path parameter.