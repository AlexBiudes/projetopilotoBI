# SDD-004 — Commits

**Status:** PROPOSTA PARA EXECUÇÃO
**Tipo:** Feature educacional
**Projeto:** `AlexBiudes/projetopilotoBI`
**Metodologia:** Spec-Driven Development
**Responsável humano:** Alex
**Issue relacionada:** [#12 — SDD-004 — Commits](https://github.com/AlexBiudes/projetopilotoBI/issues/12)
**Branch obrigatória:** `feat/commits`
**Diretório proprietário:** `src/features/commits/`

---

## 1. Contexto

O projeto concluiu a Fase 1 do roadmap (SDD-001 — Fundamentos de Git, e SDD-002 — GitHub Flow, ambas mergeadas na `main`) e está pronto para a Fase 2 (ver [ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](../ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md), seção 11, Fase 2).

Esta SPEC cobre a Rodada 2A, frente de Alex: um módulo educacional sobre commits no Git, desenvolvido em paralelo com a SDD-003 (Branches, responsabilidade de Diego). Assim como na Fase 1, o isolamento de diretórios descrito na seção 6 é uma exigência dura.

A Fase 1 deixou uma lição concreta registrada no histórico do repositório: o merge `beac67b — merge: integrar github flow em fundamentos git` mostrou que ambas as features tocaram `src/App.tsx` e `src/app/AppShell.tsx` (para registrar suas respectivas abas de navegação), gerando conflito real que precisou ser resolvido preservando as duas features. Esta SPEC assume que o mesmo padrão se repetirá na Rodada 2A e trata isso explicitamente nas seções 15 e 16.

---

## 2. Objetivo

Criar um módulo educacional claro, visual e interativo sobre commits — o snapshot atômico de mudanças, o papel da staging area, e como escrever mensagens de commit boas.

Ao final, o módulo deve permitir que um iniciante compreenda o ciclo `working tree → staging → commit → histórico`, o que compõe um commit, e por que commits pequenos e atômicos importam.

---

## 3. Responsável humano

**Alex** — autor da feature e responsável por validar o comportamento funcional antes da revisão cruzada. Alex não deve aprovar a própria implementação apenas por ter sido executada por seu agente (ROADMAP, seção 4.2). A revisão cruzada desta feature cabe a Diego.

---

## 4. Issue relacionada

[#12 — SDD-004 — Commits](https://github.com/AlexBiudes/projetopilotoBI/issues/12)

---

## 5. Branch obrigatória

```
feat/commits
```

Deve partir da `main` atualizada (pós-merge de SDD-001 e SDD-002). Nenhuma implementação deve ocorrer diretamente na `main` (ROADMAP, seção 8.2).

---

## 6. Diretório proprietário

```
src/features/commits/
```

O agente futuro deve trabalhar **majoritariamente dentro deste diretório**. Qualquer alteração fora dele deve seguir a regra de isolamento da seção 16.

---

## 7. Escopo autorizado

O agente futuro pode, majoritariamente dentro de `src/features/commits/`:

1. criar componentes React/TypeScript que compõem o módulo educacional de Commits;
2. criar estilos específicos da feature (arquivo próprio, ou classes escopadas — evitar reescrever `src/styles/index.css` global);
3. criar conteúdo textual, ilustrações em SVG/JSX e o fluxo visual conforme a seção 11 desta SPEC;
4. adicionar uma rota/aba de navegação mínima para expor o módulo (ver seção 16 — risco de colisão conhecido desde a Fase 1);
5. escrever testes locais relevantes para os componentes criados, se houver infraestrutura de testes disponível no momento da execução.

### Fora de escopo

- qualquer alteração em `src/features/branches/` (diretório proprietário da SDD-003, Diego);
- qualquer alteração em `src/features/fundamentos-git/` ou `src/features/github-flow/` (features já concluídas da Fase 1);
- implementação de conteúdo ou funcionalidades da SDD-003, SDD-005 ou SDD-006;
- refatoração de `AppShell.tsx`, `App.tsx`, `HomePage.tsx` além do mínimo estritamente necessário para pendurar a nova aba/rota;
- alteração de dependências no `package.json` sem necessidade comprovada e justificada;
- redesenho visual global, troca de framework, ou alterações de tema/paleta em `src/styles/index.css`;
- criação de backend, autenticação, banco de dados ou APIs;
- deploy ou merge;
- qualquer "melhoria oportunista" fora deste escopo (ROADMAP, seção 8.5);
- início da Rodada 2B (SDD-006 — Code Review) antes do encerramento controlado desta Rodada 2A.

---

## 8. Estrutura de arquivos esperada

```text
src/features/commits/
├── CommitsPage.tsx          (ou nome equivalente — componente de entrada do módulo)
├── components/                (subcomponentes visuais da feature, se necessário)
│   └── ...
└── commits.css                (estilos escopados da feature, se necessário)
```

Arquivos fora deste diretório só podem ser tocados conforme a seção 16 (regra de isolamento) e devem ser reportados explicitamente na devolutiva.

---

## 9. Requisitos funcionais

O módulo deve:

1. ser acessível a partir da navegação principal da aplicação (nova aba/rota, análoga a `welcome`, `roadmap`, `methodology`, `github-flow`, `fundamentos-git` em `App.tsx`);
2. renderizar sem erros e sem depender de backend, login ou dados externos;
3. apresentar todo o conteúdo mínimo obrigatório listado na seção 11;
4. funcionar de forma independente do módulo Branches (SDD-003) — nenhuma dependência cruzada de componentes ou estado entre as duas features da Rodada 2A.

---

## 10. Requisitos de UX

1. linguagem visual consistente com o restante da aplicação (cards, tipografia e paleta já usados em `HomePage.tsx`, `FundamentosGitPage.tsx`, `GithubFlowPage.tsx`), sem introduzir um novo sistema de design paralelo;
2. o fluxo visual `alteração → staging → commit → histórico` deve ser apresentado de forma clara (diagrama simples em JSX/CSS, sem necessidade de biblioteca de diagramação);
3. exemplos de comandos Git e exemplos de mensagens de commit devem ser exibidos em blocos de código legíveis (fonte monoespaçada);
4. conteúdo organizado em seções navegáveis ou em scroll único, priorizando clareza para iniciantes;
5. responsivo o suficiente para não quebrar em larguras menores, seguindo o padrão já usado nas páginas existentes.

---

## 11. Requisitos de conteúdo

Conteúdo mínimo obrigatório:

- o que é um commit;
- relação entre working tree, staging e commit;
- snapshot;
- histórico;
- SHA/hash do commit;
- mensagem de commit;
- autoria;
- timestamp;
- por que commits pequenos são importantes;
- atomicidade;
- diferença entre um commit bom e um commit ruim;
- como ler `git log`;
- como inspecionar mudanças;
- exemplos de comandos:
  - `git status`
  - `git diff`
  - `git add`
  - `git commit`
  - `git log`
  - `git show`
- convenções de mensagem (conforme CONTRIBUTING.md: `feat:`, `fix:`, `docs:`, `chore:`, etc.);
- exemplos de mensagens boas e ruins;
- exercício prático;
- fluxo visual: `alteração → staging → commit → histórico`.

---

## 12. Critérios de aceite

- [ ] módulo acessível pela navegação da aplicação;
- [ ] todo o conteúdo mínimo da seção 11 está presente;
- [ ] fluxo visual `alteração → staging → commit → histórico` implementado;
- [ ] exemplos dos 6 comandos Git exigidos presentes e formatados como código;
- [ ] pelo menos um exemplo de mensagem de commit boa e um de mensagem ruim presentes;
- [ ] exercício prático presente;
- [ ] nenhuma alteração em `src/features/branches/`, `src/features/fundamentos-git/` ou `src/features/github-flow/`;
- [ ] nenhum arquivo inesperado fora do escopo autorizado no diff;
- [ ] `npm install` executa sem erro;
- [ ] `npm run lint` passa sem erros;
- [ ] `npm run build` passa sem erros;
- [ ] `git diff --check` sem problemas de espaço em branco/formatação;
- [ ] smoke local visual realizado (aplicação rodando em `npm run dev`, módulo inspecionado no navegador);
- [ ] nenhum merge ou deploy realizado pelo agente.

---

## 13. Testes obrigatórios

Antes do PR, executar:

```bash
npm install
npm run lint
npm run build
git diff --check
```

Testes automatizados: se não houver infraestrutura de testes configurada no momento da execução, reportar esse fato honestamente em vez de inventar resultado — não é obrigação desta SPEC configurar um framework de testes do zero.

Também obrigatório: **smoke local visual**, isto é, rodar `npm run dev` e verificar manualmente que o módulo carrega, navega e renderiza corretamente no navegador.

---

## 14. Evidências

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

## 15. Hard stops

Sem autorização explícita, o agente **não pode**:

- fazer merge;
- fazer deploy;
- alterar secrets;
- mexer em `src/features/branches/`, `src/features/fundamentos-git/` ou `src/features/github-flow/`;
- ampliar escopo além do definido nesta SPEC;
- usar `git reset --hard`, `git clean -fd` ou comandos destrutivos equivalentes;
- sobrescrever trabalho preexistente;
- alterar dependências sem justificativa comprovada;
- resolver conflitos de merge escolhendo cegamente `ours` ou `theirs`.

O agente **pode**: sincronizar `main`, criar a branch `feat/commits`, implementar, testar, commitar, fazer push e abrir PR.

---

## 16. Risco de colisão

Diretório proprietário desta SPEC: `src/features/commits/`.

Diretório proprietário da SDD-003 (Diego, mesma rodada): `src/features/branches/`.

Arquivos compartilhados sensíveis (evitar sempre que possível):

- `src/App.tsx`
- `src/app/AppShell.tsx`
- `src/pages/HomePage.tsx`
- `src/styles/index.css`
- `package.json`
- `package-lock.json`

**Lição incorporada da Fase 1:** o merge `beac67b` mostrou que duas features paralelas tocando `App.tsx` e `AppShell.tsx` (para registrar suas abas) gera conflito real e esperado nesses arquivos. Isso não é um erro do agente — é consequência do modelo de navegação atual por `activeTab`. Portanto:

1. a alteração em `App.tsx`/`AppShell.tsx` deve ser mínima (adicionar uma entrada na união de tipos `activeTab` e um botão de navegação, não reestruturar o arquivo);
2. deve ser justificada explicitamente na devolutiva;
3. deve ser reportada com o nome do arquivo e o risco de colisão com a SDD-003, que também precisará da mesma alteração para sua própria aba;
4. não deve incluir reformatação ou refatoração do restante do arquivo.

Se esta feature for a segunda das duas a ser mergeada na Rodada 2A, a branch `feat/commits` precisará sincronizar com a `main` pós-merge de `feat/branches` antes de finalizar seu próprio PR (ver seção 17).

---

## 17. Estratégia de integração

1. a branch `feat/commits` deve partir da `main` atualizada (pós-merge de SDD-001 e SDD-002);
2. o PR desta feature deve ser aberto contra `main`, referenciando a Issue #12 e esta SPEC;
3. revisão cruzada: Diego revisa a implementação de Alex (ROADMAP, seção 10);
4. **merge sequencial:** o primeiro PR aprovado entre `feat/branches` (SDD-003) e `feat/commits` (SDD-004) pode ser mergeado normalmente após aprovação. A segunda branch deve então sincronizar com a `main` atualizada antes de finalizar seu próprio PR;
5. **resolução controlada de conflitos:** se houver conflito em `App.tsx`, `AppShell.tsx` ou outro arquivo compartilhado, a resolução deve preservar ambas as features (nunca descartar cegamente `ours` ou `theirs`) e deve ser coordenada pelo supervisor técnico, não decidida unilateralmente pelo agente;
6. **smoke local pós-integração:** após esta branch sincronizar com a `main`, repetir `npm run lint`, `npm run build`, `git diff --check` e o smoke visual, confirmando que ambas as abas (Branches e Commits) continuam funcionando;
7. nenhuma das duas features deve ser bloqueante da outra para abertura de PR — ambas podem ter PR aberto de forma independente, mas o merge deve ser sequencial, não simultâneo.

---

## 18. Devolutiva obrigatória

A devolutiva final deve conter, no mínimo:

1. estado Git inicial (branch, HEAD, relação com `origin/main`);
2. arquivos criados e modificados (lista completa);
3. commits (SHA + mensagem);
4. resultado de cada comando de validação exigido na seção 13;
5. confirmação e descrição do smoke local visual;
6. checklist de critérios de aceite (seção 12) marcado item a item;
7. desvios da SPEC, se houver, com justificativa;
8. riscos e pendências, incluindo status da sincronização com `feat/branches` caso o merge sequencial já tenha ocorrido;
9. confirmação explícita de que não houve merge, deploy, alteração de secrets, comandos destrutivos, nem alterações em `src/features/branches/`, `src/features/fundamentos-git/` ou `src/features/github-flow/`.

---

## 19. Próxima fase

Após o merge desta feature (e da SDD-003), a Rodada 2B do roadmap (Pull Requests — SDD-005, Code Review — SDD-006) pode ser iniciada, mediante nova autorização explícita, conforme [ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](../ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md), seção 11, Fase 2.
