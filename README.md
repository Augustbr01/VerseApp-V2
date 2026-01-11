# 📖 VerseApp V2

Aplicação moderna para buscar e ler versículos bíblicos, construída com **React**, **Vite**, **Tailwind CSS v4** e **Headless UI**.  
Reescrita completa da primeira versão (HTML/CSS/JS) com foco em performance, UX e escalabilidade.

---

## ✨ Features

- 🔎 Seleção de **Livro, Capítulo e Versículo** em comboboxes elegantes
- ⚡ Carregamento rápido usando um **JSON local** da Bíblia, sem depender de API externa
- 🎨 Interface moderna com **Tailwind CSS v4**, fonte personalizada e scrollbar customizada
- 🔁 Comboboxes em cascata (Livro → Capítulo → Versículo), com estados desabilitados inteligentes
- 📱 Layout responsivo, otimizado para desktop e mobile
- 🌗 Estilo focado em leitura confortável (background escuro, contraste bom)

---

## 🧱 Stack Tecnológica

- **Frontend:** React 19 + Vite 7
- **Estilização:** Tailwind CSS v4, classes utilitárias customizadas
- **Componentes de UI:** Headless UI (`Combobox`), Heroicons, Lucide Icons
- **Dados:** `biblia.json` local (livro / capítulo / versículo / texto)
- **Dev Experience:** ESLint, Hot Module Replacement (HMR) do Vite

---

## 🚀 Como rodar o projeto

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/VerseAppV2.git
cd VerseAppV2

# 2. Instalar dependências
npm install

# 3. Rodar em ambiente de desenvolvimento
npm run dev
```

O Vite geralmente sobe em `http://localhost:5173`.  
Para testar no celular na mesma rede, rode:

```bash
npm run dev
```

O comando já está configurado com `--host` no `package.json` e exibirá o IP da rede local.

---

## 🧩 Estrutura de Pastas

```text
src/
  components/
    BibliaSelector.jsx   # Componente principal que orquestra os selects
    SelectLivro.jsx      # Combobox de livros
    SelectCap.jsx        # Combobox de capítulos
    SelectVerse.jsx      # Combobox de versículos
  assets/
    biblia.json          # Base de dados local da Bíblia
  App.jsx                # Layout geral / página inicial
  main.jsx               # Entrada da aplicação React
  index.css              # Tailwind + estilos globais (fontes, scrollbar)
```

---

## 🎛 Detalhes de Implementação

- O JSON da Bíblia é carregado uma única vez no `BibliaSelector`, usando `useEffect` + `fetch`
- A partir do array principal de versículos são derivadas:
  - Lista de livros (únicos)
  - Lista de capítulos do livro selecionado
  - Lista de versículos do capítulo selecionado
- O usuário escolhe **Livro / Capítulo / Versículo** e só ao clicar no botão ➜ o texto é exibido em um card animado
- Os comboboxes usam:
  - `readOnly` para impedir digitação (apenas seleção)
  - Grid responsivo para organizar opções em múltiplas colunas
  - Scrollbar customizada com Tailwind v4 (`@theme` + utilitárias)


## 📦 Versão Anterior (V1)

A primeira versão do VerseApp, feita em **HTML + CSS + JavaScript vanilla**, continua disponível em:

👉 [VerseApp V1](https://github.com/Augustbr01/VerseApp)

Este repositório (V2) é uma reescrita completa com foco em arquitetura e boas práticas modernas de frontend.

---

## 📄 Licença

Este projeto é open source e está sob a licença MIT.

---

## 👨‍💻 Autor

**Augusto Corrêa**  
Estudante de Engenharia de Software 
[GitHub](https://github.com/Augustbr01) | [LinkedIn](https://www.linkedin.com/in/augusto-corr%C3%AAa-6537a8276/)
