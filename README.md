<img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMp1kYn6umTdkijGwau4aM1bBC7776pcJOnQ&s" width="120" />

- Um clone da aplicação airbnb versão web utilizando <code>React</code> , <code>NextJS</code> , <code>Tailwind CSS</code> , <code>Prisma</code> , <code>MongoDB</code> , <code>NextAuth</code> e <code>Vercel</code>

## 🚀 Começando
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 🔧 Instalação
Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.
É necessário que você instale todas as dependências do projeto

```zsh
$ npm install
```
É necessário que você tenha as configurações de ambiente

```dosini
# .env.example
DATABASE_URL=

NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET= 

GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET= 
```

É necessário que você inicialize o prisma

```zsh
$ npx prisma generate
```

A próxima etapa é iniciar o projeto

```zsh
$ npm run dev
```

## ⚙️ Executando a aplicação
Após a instalação, você deve entrar no link https://localhost:3000/ para visualizar a aplicação.

### :page_with_curl: Rotas de navegação
| Endereço | Descrição |
|--|--|
| / | espaços principais |
| /listings/listingId | detalhes de um espaço |
| /reservations/reservationId | detalhes de uma reserva |
| /properties/propertieId | detalhes de uma propriedade |

## 🛠️ Construído com
*  [NodeJS](https://nodejs.org/en/docs/) - Ambiente de execução JavaScript
*  [NextJS](https://nextjs.org/docs) - Framework web
*  [Tailwind CSS](https://tailwindcss.com/docs) - Framework para estilização
*  [Prisma](https://www.prisma.io/nextjs). - A maneira mais fácil de trabalhar com um banco de dados em Next.js
*  [NextAuth](https://next-auth.js.org/). - Autenticação para Next.js
*  [MongoDb](https://www.mongodb.com/). - Sistema de gerenciamento de banco de dados NoSQL

## Redes sociais
*  [Linkedin](https://www.linkedin.com/in/gabrielmina/)

---
⌨️ com ❤️ por [Gabriel Mina](https://github.com/gabrielmina118) 👨‍💻

