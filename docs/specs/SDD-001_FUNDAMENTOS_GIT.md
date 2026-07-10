# SDD-001 — Fundamentos de Git

**Status:** PROPOSTA PARA EXECUÇÃO
**Tipo:** Feature educacional
**Projeto:** `AlexBiudes/projetopilotoBI`
**Metodologia:** Spec-Driven Development
**Responsável humano:** Diego
**Issue relacionada:** [#6 — SDD-001 — Fundamentos de Git](https://github.com/AlexBiudes/projetopilotoBI/issues/6)
**Branch obrigatória:** `feat/fundamentos-git`
**Diretório proprietário:** `src/features/fundamentos-git/`

---

## 1. Contexto

O projeto concluiu a fundação (SDD-000) e está pronto para a Fase 1 do roadmap: as duas primeiras features paralelas (ver [ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](../ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md), seção 11, Fase 1).

Esta SPEC cobre a frente de Diego: um módulo educacional sobre os fundamentos do Git, que será desenvolvido em paralelo com a SDD-002 (GitHub Flow, responsabilidade de Alex). O objetivo do roadmap para esta rodada é praticar trabalho simultâneo sem colisão de escopo — por isso o isolamento de diretórios descrito na seção 6 desta SPEC é uma exigência dura, não uma sugestão.

A estrutura de diretórios `src/features/fundamentos-git/` já existe no repositório (contendo apenas `.gitkeep`), preparada pela SDD-000 para receber esta feature.

---

## 2. Objetivo

Criar um módulo educacional claro, visual e interativo sobre os fundamentos do Git, cobrindo os conceitos que antecedem o fluxo colaborativo no GitHub (que é objeto da SDD-002).

Ao final, o módulo deve permitir que um iniciante compreenda o que é Git, a diferença entre Git e GitHub, e o ciclo `Working Tree → Staging → Commit → Histórico`.

---

## 3. Responsável humano

**Diego** — autor da feature e responsável por validar o comportamento funcional antes da revisão cruzada. Diego não deve aprovar a própria implementação apenas por ter sido executada por seu agente (ROADMAP, seção 4.1).

---

## 4. Issue relacionada

[#6 — SDD-001 — Fundamentos de Git](https://github.com/AlexBiudes/projetopilotoBI/issues/6)

---

## 5. Branch obrigatória

```
feat/fundamentos-git
```

Deve partir da `main` atualizada. Nenhuma implementação deve ocorrer diretamente na `main` (ROADMAP, seção 8.2).

---

## 6. Escopo autorizado

O agente futuro pode, **majoritariamente dentro de `src/features/fundamentos-git/`**:

1. criar componentes React/TypeScript que compõem o módulo educacional de Fundamentos de Git;
2. criar estilos específicos da feature (arquivo próprio, ou classes escopadas — evitar reescrever `src/styles/index.css` global);
3. criar conteúdo textual, ilustrações em SVG/JSX e exemplos de comandos Git conforme a seção 10 desta SPEC;
4. adicionar uma rota/aba de navegação mínima para expor o módulo (ver seção 16 — risco de colisão);
5. escrever testes locais relevantes para os componentes criados, se houver infraestrutura de testes disponível no momento da execução.

### Fora de escopo

- qualquer alteração em `src/features/github-flow/`;
- implementação de conteúdo ou funcionalidades da SDD-002;
- refatoração de `AppShell.tsx`, `App.tsx`, `HomePage.tsx`, `RoadmapPage.tsx` ou `MethodologyPage.tsx` além do mínimo estritamente necessário para pendurar a nova aba/rota (ver seção 6, item 4, e seção 16);
- alteração de dependências no `package.json` sem necessidade comprovada e justificada;
- redesenho visual global, troca de framework, ou alterações de tema/paleta em `src/styles/index.css`;
- criação de backend, autenticação, banco de dados ou APIs;
- deploy ou merge;
- qualquer "melhoria oportunista" fora deste escopo (ROADMAP, seção 8.5).

---

## 7. Estrutura de arquivos esperada

```text
src/features/fundamentos-git/
├── FundamentosGitPage.tsx      (ou nome equivalente — componente de entrada do módulo)
├── components/                 (subcomponentes visuais da feature, se necessário)
│   └── ...
└── fundamentos-git.css         (estilos escopados da feature, se necessário)
```

Arquivos fora deste diretório só podem ser tocados conforme a seção 16 (regra de isolamento) e devem ser reportados explicitamente na devolutiva.

---

## 8. Requisitos funcionais

O módulo deve:

1. ser acessível a partir da navegação principal da aplicação (nova aba/rota, análoga a `welcome`, `roadmap`, `methodology` em `App.tsx`);
2. renderizar sem erros e sem depender de backend, login ou dados externos;
3. apresentar todo o conteúdo mínimo obrigatório listado na seção 10;
4. funcionar de forma independente do módulo GitHub Flow (SDD-002) — nenhuma dependência cruzada de componentes ou estado entre as duas features.

---

## 9. Requisitos de UX

1. Linguagem visual consistente com o restante da aplicação (cards, tipografia e paleta já usados em `HomePage.tsx` / `RoadmapPage.tsx`), sem introduzir um novo sistema de design paralelo;
2. o fluxo visual `Working Tree → Staging → Commit → Histórico` deve ser apresentado de forma clara (diagrama simples em JSX/CSS, não é necessário biblioteca de diagramação);
3. exemplos de comandos Git devem ser exibidos em blocos de código legíveis (fonte monoespaçada);
4. conteúdo organizado em seções navegáveis ou em scroll único, priorizando clareza para iniciantes;
5. responsivo o suficiente para não quebrar em larguras menores, seguindo o padrão já usado nas páginas existentes.

---

## 10. Requisitos de conteúdo

Conteúdo mínimo obrigatório:

- o que é Git;
- diferença entre Git e GitHub;
- repositório;
- working tree;
- staging area;
- commit;
- histórico;
- repositório local;
- repositório remoto;
- exemplos de comandos:
  - `git status`
  - `git add`
  - `git commit`
  - `git log`
  - `git diff`
- fluxo visual: `Working Tree → Staging → Commit → Histórico`;
- explicação de por que commits pequenos e claros são importantes;
- exercício ou exemplo prático (pode ser um cenário guiado em texto/interativo simples, sem necessidade de terminal real embutido);
- linguagem simples para iniciantes.

---

## 11. Critérios de aceite

- [ ] módulo acessível pela navegação da aplicação;
- [ ] todo o conteúdo mínimo da seção 10 está presente;
- [ ] fluxo visual `Working Tree → Staging → Commit → Histórico` implementado;
- [ ] exemplos dos 5 comandos Git exigidos presentes e formatados como código;
- [ ] exercício/exemplo prático presente;
- [ ] nenhuma alteração em `src/features/github-flow/`;
- [ ] nenhum arquivo inesperado fora do escopo autorizado no diff;
- [ ] `npm install` executa sem erro;
- [ ] `npm run lint` passa sem erros;
- [ ] `npm run build` passa sem erros;
- [ ] `git diff --check` sem problemas de espaço em branco/formatação;
- [ ] smoke local visual realizado (aplicação rodando em `npm run dev`, módulo inspecionado no navegador);
- [ ] nenhum merge ou deploy realizado pelo agente.

---

## 12. Testes obrigatórios

Antes do PR, executar:

```bash
npm install
npm run lint
npm run build
git diff --check
```

Testes automatizados: se não houver infraestrutura de testes configurada no momento da execução (situação herdada da SDD-000, que não configurou testes), reportar esse fato honestamente em vez de inventar resultado — não é obrigação desta SPEC configurar um framework de testes do zero.

Também obrigatório: **smoke local visual**, isto é, rodar `npm run dev` e verificar manualmente que o módulo carrega, navega e renderiza corretamente no navegador.

---

## 13. Evidências obrigatórias

A devolutiva do agente deve incluir:

- branch e HEAD inicial e final;
- SHA e mensagem de cada commit;
- lista completa de arquivos criados e modificados;
- resumo do diff;
- resultado de cada comando de validação (`npm install`, `npm run lint`, `npm run build`, `git diff --check`);
- confirmação do smoke local visual (o que foi verificado);
- desvios da SPEC, se houver, com justificativa;
- pendências e riscos.

---

## 14. Hard stops

Sem autorização explícita, o agente **não pode**:

- fazer merge;
- fazer deploy;
- alterar secrets;
- mexer em `src/features/github-flow/`;
- ampliar escopo além do definido nesta SPEC;
- usar `git reset --hard`, `git clean -fd` ou comandos destrutivos equivalentes;
- sobrescrever trabalho preexistente;
- alterar dependências sem justificativa comprovada.

O agente **pode**: sincronizar `main`, criar a branch `feat/fundamentos-git`, implementar, testar, commitar, fazer push e abrir PR.

---

## 15. Risco de colisão

Diretório proprietário desta SPEC: `src/features/fundamentos-git/`.

Diretório proprietário da SDD-002 (Alex): `src/features/github-flow/`.

Arquivos compartilhados sensíveis (evitar sempre que possível):

- `src/App.tsx`
- `src/app/AppShell.tsx`
- `src/styles/index.css`
- `package.json`

Se a navegação exigir tocar em `App.tsx` ou `AppShell.tsx` para registrar a nova aba/rota, a alteração deve ser:

1. mínima (adicionar uma entrada de navegação, não reestruturar o arquivo);
2. justificada explicitamente na devolutiva;
3. reportada com o nome do arquivo e o risco de colisão com a SDD-002, que provavelmente precisará da mesma alteração para sua própria aba;
4. limitada — não deve incluir reformatação ou refatoração do restante do arquivo.

Recomenda-se que os dois agentes (SDD-001 e SDD-002) não editem `App.tsx`/`AppShell.tsx` no mesmo intervalo sem coordenação do supervisor técnico, para reduzir a chance de conflito de merge.

---

## 16. Estratégia de integração

1. a branch `feat/fundamentos-git` deve partir da `main` atualizada (pós-merge da fundação SDD-000);
2. o PR desta feature deve ser aberto contra `main`, referenciando a Issue #6 e esta SPEC;
3. revisão cruzada: Alex revisa a implementação de Diego (ROADMAP, seção 10);
4. se houver conflito com a branch `feat/github-flow` (SDD-002) em arquivos compartilhados, a resolução deve ser coordenada pelo supervisor técnico, não decidida unilateralmente pelo agente;
5. nenhuma das duas features deve ser bloqueante da outra — ambas podem ser implementadas e ter PR aberto de forma independente.

---

## 17. Formato da devolutiva do agente

A devolutiva final deve conter, no mínimo:

1. estado Git inicial (branch, HEAD, relação com `origin/main`);
2. arquivos criados e modificados (lista completa);
3. commits (SHA + mensagem);
4. resultado de cada comando de validação exigido na seção 12;
5. confirmação e descrição do smoke local visual;
6. checklist de critérios de aceite (seção 11) marcado item a item;
7. desvios da SPEC, se houver;
8. riscos e pendências;
9. confirmação explícita de que não houve merge, deploy, alteração de secrets, comandos destrutivos, nem alterações em `src/features/github-flow/`.

---

## 18. Próxima fase

Após o merge desta feature (e da SDD-002), a Fase 2 do roadmap (Branches, Commits, Pull Requests, Code Review) pode ser iniciada, conforme [ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](../ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md), seção 11.
