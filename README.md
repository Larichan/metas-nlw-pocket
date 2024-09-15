# Gerenciador de Metas - Projeto NLW Pocket
## Descrição do Projeto
Projeto se trata de uma aplicação de Gerenciamento de Metas - Evento NLW Pocket da Rocketseat.\
Ela se divide no front e no back, a seguir será mostrado o passo-a-passo e informações de ambos.

## Sumário
* [Backend](#começando---backend-)
* [Frontend](#começando---frontend-)

## Começando - Backend 🚀
### Pré-requisitos

Para rodar o projeto, é necessário ter:
```
Docker
Node 20.17.0
```

### Instruções
Após fazer o clone do projeto, entre na pasta do backend, crie e preencha um .env na raiz do projeto com as seguintes informações:
```
DATABASE_HOST="localhost"
POSTGRES_USER="admin"
POSTGRES_PASSWORD="123456"
POSTGRES_DB="metas-pocket"
DB_PORT="5432"
APP_PORT="3333"
```

As informações contidas no .env podem variar de acordo com a necessidade.

Feito isso, rode o seguinte comando para subir o banco:
```
docker-compose up
```

Com o banco rodando, é hora de instalar todas as dependências necessárias para rodar o projeto com o comando
```
npm install
```

É hora de gerar e rodar as migrations para criar as tabelas do banco.
```
npx drizzle-kit generate
npx drizzle-kit migrate
```

Para verificar se as tabelas foram criadas, é possível utilizar uma ferramenta de banco de dados como o DBeaver, criando uma nova conexão com as informações que foram colocadas no .env. Alternativamente, é possível usar o comando abaixo para rodar um gerenciador de banco especialmente para o banco do projeto.
```
npx drizle-kit studio
```

Existe também um arquivo para preencher o banco de dados com algumas informações pré-estabelecidas. Para popular o banco, rode:
```
npm run seed
```

Por fim, para rodar a aplicação, utilize
```
npm run dev
```

### Tecnologias Utilizadas
```
Node
Docker
PostgreSQL
Fastify
Zod
Dayjs
Grizzle ORM
```

## Começando - Frontend 🚀
### Pré-requisitos

Para rodar o projeto, é necessário ter:
```
Node 20.17.0
O backend rodando com o banco
```

### Instruções
Após fazer o clone do projeto, entre na pasta do frontend, crie e preencha um .env na raiz do projeto com as seguintes informações:
```
VITE_BACK_URI=http://localhost:3333
```

ATENÇÃO: o valor da variável VITE_BACK_URI deve ser o mesmo host onde está rodando a aplicação backend.

Após a configuração das variáveis de ambiente, é hora de instalar todas as dependências necessárias para rodar o projeto com o comando
```
npm install
```

Por fim, para rodar a aplicação, utilize
```
npm run dev
```

### Tecnologias Utilizadas
```
Node
Zod
Dayjs
Tailwind CSS
Vite
React
React Toastify
React Hook Form
Lucide React
TanStack React-Query
Radix UI
```