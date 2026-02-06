🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

Pré-requisitos

Para executar este projeto, você precisará ter o Node.js instalado em sua máquina. O Node.js inclui o npm (Node Package Manager), que será usado para instalar as dependências do projeto.

•
Node.js: Certifique-se de ter a versão 18 ou superior. Você pode baixá-lo em nodejs.org.

Passo a Passo Detalhado

1.
Instale o Node.js (se ainda não tiver):
Acesse nodejs.org e baixe a versão recomendada para o seu sistema operacional. Siga as instruções de instalação.

2.
Verifique a instalação do Node.js e npm:
Abra seu terminal ou prompt de comando e execute:

Bash


node -v
npm -v



Certifique-se de que as versões exibidas são compatíveis (Node.js v18+).



3.
Clone o repositório do projeto:

Bash


git clone https://github.com/seu-usuario/nome-do-projeto.git





4.
Navegue até a pasta do projeto:

Bash


cd nome-do-projeto





5.
Instale as dependências do projeto:
Este comando lerá o arquivo package.json e instalará todas as bibliotecas necessárias, como React, Next.js, React Flow, etc.

Bash


npm install
# ou, se preferir usar Yarn:
# yarn install
# ou, se preferir usar pnpm:
# pnpm install





6.
Configure as variáveis de ambiente:
Crie um arquivo chamado .env.local na raiz do projeto. Este arquivo conterá chaves de API e outras configurações sensíveis. Consulte o arquivo .env.example (se existir ) para saber quais variáveis são necessárias.

7.
Inicie o servidor de desenvolvimento:

Bash


npm run dev
# ou
yarn dev
# ou
# pnpm dev





8.
Acesse o projeto no navegador:
Após iniciar o servidor, abra seu navegador e acesse http://localhost:3000. O projeto estará rodando localmente.

