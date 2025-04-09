# DestravAI

DestravAI é uma aplicação web para ajudar estudantes a destravar seus estudos através de questões diárias e desafios personalizados.

## 📁 Estrutura do Projeto

```
destrav.ai/
├── frontend/           # Aplicação Next.js com Tailwind CSS
│   ├── app/           # Páginas e componentes da aplicação
│   ├── components/    # Componentes reutilizáveis
│   └── public/        # Arquivos estáticos
│
└── backend/           # API Node.js com Express e TypeORM
    ├── src/          # Código fonte do backend
    ├── config/       # Configurações do banco de dados
    └── entities/     # Entidades do TypeORM
```

## 🚀 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (normalmente vem com Node.js)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [Git](https://git-scm.com/)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luanlucasideias/destravAI.git
cd destravAI
```

2. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../backend
npm install
```

4. Configure as variáveis de ambiente:

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=destravai_db
```

## 🚀 Executando o Projeto

1. Inicie o backend:
```bash
cd backend
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm run dev
```

3. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - TypeScript

- **Backend**:
  - Node.js
  - Express
  - TypeORM
  - PostgreSQL
  - TypeScript

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Contribuições são sempre bem-vindas! Por favor, leia o [guia de contribuição](CONTRIBUTING.md) primeiro.

## 📧 Contato

Se você tiver alguma dúvida, sinta-se à vontade para entrar em contato.'
