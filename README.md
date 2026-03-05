# Vet+ Landing Page

Esta é a landing page para a Vet+, um serviço de atendimento veterinário domiciliar. O projeto foi desenvolvido com foco em uma experiência de usuário moderna e animações ricas, utilizando tecnologias de ponta.

## Tecnologias Utilizadas

Este projeto foi construído com:

- **Vite**: Build tool de frontend de última geração.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework CSS utility-first para estilização rápida.
- **shadcn/ui**: Coleção de componentes de UI reusáveis.
- **Framer Motion**: Biblioteca de animação para React.
- **GSAP (GreenSock Animation Platform)**: Biblioteca de animação JavaScript de alta performance.
- **Lucide React**: Ícones SVG leves e customizáveis.

## Estrutura do Projeto

O código-fonte está localizado na pasta `src`, com a seguinte estrutura:

- `components/landing`: Contém os componentes principais da landing page (Hero, Services, About, etc.).
- `components/ui`: Componentes de UI reutilizáveis, incluindo os de `shadcn/ui`.
- `assets`: Imagens e outros recursos estáticos.
- `pages`: Componentes que representam as páginas do site.

## Como Executar o Projeto Localmente

Para trabalhar no projeto em seu ambiente local, siga os passos abaixo.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

**Passos:**

1.  **Clone o repositório:**
    ```sh
    git clone <URL_DO_SEU_REPOSITORIO_GIT>
    ```

2.  **Navegue até o diretório do projeto:**
    ```sh
    cd vetflow-pro-main
    ```

3.  **Instale as dependências:**
    ```sh
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

    O servidor iniciará em `http://localhost:8080` com hot-reloading, permitindo que você veja as alterações em tempo real.

## Deploy

O deploy do projeto pode ser feito facilmente em plataformas como Vercel ou Netlify, conectando o repositório Git e configurando o comando de build (`npm run build`).
