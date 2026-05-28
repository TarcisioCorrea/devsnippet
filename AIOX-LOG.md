# AIOX Log — DevSnippet

## @aiox-master

**Pergunta:** Por onde começar o projeto?
**Resposta resumida:** Definir stack, criar MVP rápido com Next.js, TailwindCSS e localStorage.

---

## @pm

**PRD definido:** Aplicação web para salvar snippets de código com syntax highlight e persistência local.

---

## @architect

**Decisão de stack:**

* Next.js 14
* TypeScript
* TailwindCSS
* localStorage
* react-syntax-highlighter

Motivo: stack rápida, moderna e ideal para frontend sem backend.

---

## @ux-design-expert

**Spec gerada:**
Interface dark mode inspirada em editores de código modernos, com:

* sidebar de snippets;
* syntax highlight;
* busca;
* filtros;
* modal para criação de snippets.

---

## @sm

**Stories criadas:**

* Story 1.1: Criar snippet
* Story 1.2: Visualizar snippet
* Story 1.3: Buscar snippets

---

## @po

**Veredicto:** GO — 9/10

---

## @dev

**Modo usado:** YOLO

**Arquivos criados:**

* app/page.tsx
* components/*
* hooks/*
* lib/*

---

## @qa

**Veredicto:** PASS

**Issues encontrados:**

* Problemas de import path corrigidos
* Ajustes no alias do Next.js

---

## @devops

**Comando de deploy:** Deploy realizado via plataforma online

**URL final:** https://wonderful-concha-73e50a.netlify.app/

---

## Reflexão

O fluxo AIOX ajudou bastante na organização do projeto e acelerou o desenvolvimento. A parte mais difícil foi configurar corretamente os imports e dependências do Next.js. O uso do localStorage facilitou muito a persistência dos dados sem precisar de backend.
