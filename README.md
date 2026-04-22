# Process Mapper Ecosystem

> Solução completa para mapeamento de processos com **API em Laravel** e **frontend em React/Next.js**.

---

## Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

* ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
* ![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![React Flow](https://img.shields.io/badge/React%20Flow-FF0073?style=for-the-badge&logo=react&logoColor=white)
* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## Como Executar o Projeto

Siga os passos abaixo para configurar o ambiente e rodar o projeto localmente.

---

## Backend (Laravel + Docker)

### Pré-requisitos

- Docker  
- Git  

---

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/process-mapper-api.git
cd process-mapper-api
Configure o ambiente
cp .env.example .env

Ajuste no .env:

APP_PORT=8080
FORWARD_DB_PORT=33060
Suba os containers
composer install
./vendor/bin/sail up -d

No Linux, se houver conflito com MySQL:

sudo systemctl stop mysql
Instale dependências e gere a chave
./vendor/bin/sail composer install
./vendor/bin/sail php artisan key:generate
Importe o banco de dados
./vendor/bin/sail mysql < database/backup_completo.sql
Frontend (React / Next.js)
Pré-requisitos
Node.js 18+
Passo a Passo
Acesse a pasta do frontend
cd nome-da-pasta-frontend
Verifique a instalação
node -v
npm -v
Instale as dependências
npm install
Configure variáveis de ambiente
Crie o arquivo .env.local com base no .env.example.
Inicie o projeto
npm run dev
Acesse no navegador
http://localhost:3000
Acessos
Frontend: http://localhost:3000
Backend: http://localhost:8080
Banco: 127.0.0.1:33060
Usuário: sail
Senha: password
Comandos Úteis
Backend
./vendor/bin/sail down
./vendor/bin/sail php artisan migrate
./vendor/bin/sail ps
Frontend
npm run build
rm -rf node_modules package-lock.json && npm install
Desenvolvido por Taila
