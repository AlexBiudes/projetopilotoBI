# SDD-000 — Fundação do Projeto Piloto de Desenvolvimento em Equipe

**Status:** PROPOSTA PARA EXECUÇÃO  
**Tipo:** Fundação / Bootstrap  
**Projeto:** `AlexBiudes/projetopilotoBI`  
**Metodologia:** Spec-Driven Development  
**Participantes:** Diego e Alex  
**Agente executor:** um único agente designado  
**Branch sugerida:** `feat/sdd000-fundacao-projeto`

---

## 1. Contexto

O repositório inicia vazio ou praticamente vazio e será usado como laboratório de desenvolvimento colaborativo real entre Diego e Alex, com implementação apoiada por agentes de IA no Antigravity/Claude.

Antes de liberar features paralelas, é necessário criar uma fundação estável e compartilhada.

Esta SDD existe para evitar que dois desenvolvedores ou dois agentes criem estruturas concorrentes para o mesmo projeto.

---

## 2. Objetivo

Criar a primeira base executável do site educacional, com estrutura mínima, documentação de contribuição, padrões de Git e validações locais básicas.

Ao final, o projeto deve estar pronto para que Diego e Alex iniciem duas features independentes em paralelo.

---

## 3. Escopo autorizado

O agente pode:

1. inicializar uma aplicação frontend com React, TypeScript e Vite;
2. criar uma página inicial mínima e neutra;
3. criar estrutura base de diretórios;
4. configurar ESLint;
5. documentar comandos locais;
6. adicionar `CONTRIBUTING.md`;
7. adicionar template de Pull Request;
8. adicionar template de Issue para feature;
9. preservar e integrar o roadmap existente;
10. validar instalação, lint e build;
11. registrar evidências da execução.

---

## 4. Fora de escopo

Não fazer nesta SDD:

- banco de dados;
- backend;
- autenticação;
- login;
- Supabase;
- Firebase;
- API própria;
- deploy;
- Vercel;
- GitHub Actions completo;
- biblioteca pesada de UI;
- design final;
- conteúdo completo dos módulos educacionais;
- criação das features Fundamentos de Git ou GitHub Flow;
- refatorações oportunistas fora da fundação;
- merge da própria branch.

---

## 5. Arquitetura inicial esperada

Estrutura sugerida:

```text
projetopilotoBI/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── feature.md
│   └── pull_request_template.md
├── docs/
│   ├── ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md
│   └── specs/
│       └── SDD-000_FUNDACAO_DO_PROJETO.md
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── pages/
│   └── styles/
├── CONTRIBUTING.md
├── README.md
├── package.json
└── demais arquivos mínimos do Vite/TypeScript
```

O agente pode adaptar detalhes técnicos se houver justificativa clara e sem ampliar o escopo.

---

## 6. Requisitos funcionais mínimos

A aplicação deve:

1. iniciar localmente;
2. exibir uma página inicial;
3. apresentar o nome do projeto;
4. comunicar que se trata de um guia prático de desenvolvimento em equipe com GitHub, IA e SDD;
5. não depender de backend;
6. não depender de login.

---

## 7. Requisitos de engenharia

### 7.1 Branch

Trabalhar somente em:

`feat/sdd000-fundacao-projeto`

### 7.2 Preflight obrigatório

Antes de editar, reportar:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
git remote -v
git fetch origin
git rev-parse origin/main
git merge-base HEAD origin/main
```

Também informar:

- arquivos tracked modificados;
- arquivos untracked;
- se o diretório contém trabalho preexistente;
- se a branch partiu da `main` esperada.

### 7.3 Preservação

Não sobrescrever trabalho preexistente.

Não executar:

```bash
git reset --hard
git clean -fd
```

ou comandos destrutivos equivalentes sem autorização explícita.

### 7.4 Dependências

Adicionar somente dependências necessárias ao bootstrap.

Não introduzir bibliotecas por conveniência futura.

---

## 8. README mínimo

O README deve conter:

- nome do projeto;
- objetivo;
- metodologia SDD;
- participantes;
- stack;
- pré-requisitos;
- instalação;
- execução local;
- lint;
- testes, mesmo que ainda não existam, deixando o estado claro;
- build;
- fluxo resumido de contribuição;
- links para roadmap e SPECs.

---

## 9. CONTRIBUTING mínimo

Deve explicar:

1. atualizar `main`;
2. criar branch própria;
3. ler a Issue;
4. ler a SPEC;
5. desenvolver;
6. executar validações;
7. criar commits claros;
8. fazer push;
9. abrir PR;
10. receber review cruzado;
11. corrigir no mesmo PR;
12. aguardar aprovação antes do merge.

Também incluir convenções:

- `feat/...`
- `fix/...`
- `docs/...`
- `test/...`
- `refactor/...`
- `chore/...`

---

## 10. Template de Pull Request

Deve exigir:

- Issue relacionada;
- SPEC relacionada;
- problema;
- solução;
- escopo realizado;
- fora de escopo;
- como testar;
- testes executados;
- checklist;
- screenshots quando houver mudança visual;
- riscos;
- observações para o reviewer.

---

## 11. Template de Issue de feature

Deve exigir:

- contexto;
- problema;
- objetivo;
- escopo;
- fora de escopo;
- critérios de aceite;
- dependências;
- riscos;
- observações.

---

## 12. Critérios de aceite

A SDD só pode ser considerada tecnicamente pronta quando:

- [ ] aplicação React + TypeScript + Vite criada;
- [ ] aplicação inicia localmente;
- [ ] página inicial mínima renderiza sem erro;
- [ ] estrutura base criada;
- [ ] README criado ou atualizado;
- [ ] CONTRIBUTING criado;
- [ ] roadmap preservado;
- [ ] SDD-000 preservada;
- [ ] template de PR criado;
- [ ] template de Issue criado;
- [ ] lint passa;
- [ ] build passa;
- [ ] `git diff --check` passa;
- [ ] nenhum arquivo inesperado está no diff;
- [ ] nenhuma feature futura foi antecipada;
- [ ] nenhum deploy foi realizado;
- [ ] nenhum merge foi realizado pelo agente.

---

## 13. Validações obrigatórias

Executar, conforme scripts existentes após o bootstrap:

```bash
npm install
npm run lint
npm run build
git diff --check
git status --short
```

Se forem adicionados testes nesta mesma fundação, executar também:

```bash
npm test
```

Não inventar resultado. Reportar falhas honestamente.

---

## 14. Evidências exigidas na devolutiva

O agente deve retornar:

### Estado Git

- branch;
- HEAD inicial;
- HEAD final;
- relação com `origin/main`.

### Arquivos

- lista completa de arquivos criados;
- lista completa de arquivos modificados.

### Commits

- SHA;
- mensagem.

### Testes

Para cada comando:

- comando executado;
- resultado;
- quantidade de testes, quando aplicável.

### Escopo

- o que foi concluído;
- o que não foi concluído;
- desvios da SPEC;
- riscos ou pendências.

### Ações proibidas

Confirmar explicitamente:

- sem merge;
- sem deploy;
- sem alteração de secrets;
- sem Git destrutivo;
- sem mudanças fora de escopo intencionais.

---

## 15. Estratégia de commit sugerida

Preferência por commits lógicos, por exemplo:

1. `chore: inicializar aplicacao frontend`
2. `docs: adicionar governanca inicial do projeto`

Não fragmentar em dezenas de commits artificiais.

---

## 16. Gate de revisão

Quando a implementação terminar:

1. não fazer merge;
2. abrir ou preparar Pull Request;
3. Diego ou Alex, conforme autoria, realiza revisão cruzada;
4. supervisor técnico audita:
   - escopo;
   - diff;
   - testes;
   - colisões;
   - prontidão para merge.

---

## 17. Próxima fase após o merge

Somente depois da fundação integrada à `main`:

### Frente A — Diego

`FEAT — Fundamentos de Git`

### Frente B — Alex

`FEAT — GitHub Flow`

Cada frente deverá possuir:

- Issue própria;
- SPEC própria;
- branch própria;
- agente próprio;
- PR próprio;
- review cruzado.

---

## 18. Prompt de execução resumido

O agente deve receber esta instrução:

> Leia integralmente `docs/specs/SDD-000_FUNDACAO_DO_PROJETO.md` e execute somente o escopo autorizado. Antes de modificar qualquer arquivo, faça o preflight Git completo e reporte o estado encontrado. Trabalhe exclusivamente na branch `feat/sdd000-fundacao-projeto`. Preserve arquivos preexistentes e untracked. Não faça merge, deploy, alteração de secrets ou limpeza destrutiva. Implemente a fundação, execute todas as validações exigidas e devolva evidências completas de branch, HEADs, commits, arquivos alterados, testes, resultados, desvios e pendências.
