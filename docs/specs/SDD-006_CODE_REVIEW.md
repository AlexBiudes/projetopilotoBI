# SDD-006 — Code Review

**Status:** PROPOSTA PARA EXECUÇÃO (Rodada 2B — não iniciar antes do encerramento controlado da Rodada 2A, salvo nova autorização explícita)
**Tipo:** Feature educacional
**Projeto:** `AlexBiudes/projetopilotoBI`
**Metodologia:** Spec-Driven Development
**Responsável humano:** Alex
**Issue relacionada:** [#14 — SDD-006 — Code Review](https://github.com/AlexBiudes/projetopilotoBI/issues/14)
**Branch obrigatória:** `feat/code-review`
**Diretório proprietário:** `src/features/code-review/`

---

## 1. Contexto

O projeto está na Fase 2 do roadmap (ver [ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](../ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md), seção 11, Fase 2). Esta SPEC cobre a Rodada 2B, frente de Alex, e só deve ser executada após o encerramento controlado da Rodada 2A (SDD-003 — Branches, e SDD-004 — Commits, ambas mergeadas na `main`), salvo nova autorização explícita do supervisor técnico.

Esta SPEC cobre um módulo educacional sobre Code Review, desenvolvido em paralelo com a SDD-005 (Pull Requests, responsabilidade de Diego). O isolamento de diretórios descrito na seção 6 é uma exigência dura, repetindo o padrão validado nas rodadas anteriores.

A Fase 1 e a Rodada 2A deixaram uma lição recorrente: features paralelas que precisam registrar uma aba de navegação tocam os mesmos arquivos compartilhados (`App.tsx`, `AppShell.tsx`), gerando conflito real e esperado. Esta SPEC trata isso explicitamente nas seções 15 e 16.

---

## 2. Objetivo

Criar um módulo educacional claro, visual e interativo sobre Code Review — o que revisar, como classificar severidade, e a diferença entre Comment, Approve e Request Changes.

Ao final, o módulo deve permitir que um iniciante compreenda o papel do revisor, o que constitui um bom review, e como o ciclo de feedback e correção funciona dentro do mesmo PR.

---

## 3. Responsável humano

**Alex** — autor da feature e responsável por validar o comportamento funcional antes da revisão cruzada. Alex não deve aprovar a própria implementação apenas por ter sido executada por seu agente (ROADMAP, seção 4.2). A revisão cruzada desta feature cabe a Diego.

---

## 4. Issue relacionada

[#14 — SDD-006 — Code Review](https://github.com/AlexBiudes/projetopilotoBI/issues/14)

---

## 5. Branch obrigatória

```
feat/code-review
```

Deve partir da `main` atualizada (pós-merge de SDD-003 e SDD-004). Nenhuma implementação deve ocorrer diretamente na `main` (ROADMAP, seção 8.2).

---

## 6. Diretório proprietário

```
src/features/code-review/
```

O agente futuro deve trabalhar **majoritariamente dentro deste diretório**. Qualquer alteração fora dele deve seguir a regra de isolamento da seção 15.

---

## 7. Escopo autorizado

O agente futuro pode, majoritariamente dentro de `src/features/code-review/`:

1. criar componentes React/TypeScript que compõem o módulo educacional de Code Review;
2. criar estilos específicos da feature (arquivo próprio, ou classes escopadas — evitar reescrever `src/styles/index.css` global);
3. criar conteúdo textual, ilustrações em SVG/JSX e o fluxo visual conforme a seção 12 desta SPEC;
4. adicionar uma rota/aba de navegação mínima para expor o módulo (ver seção 15 — risco de colisão conhecido);
5. escrever testes locais relevantes para os componentes criados, se houver infraestrutura de testes disponível no momento da execução.

### Fora de escopo

- qualquer alteração em `src/features/pull-requests/` (diretório proprietário da SDD-005, Diego);
- qualquer alteração em `src/features/branches/`, `src/features/commits/`, `src/features/fundamentos-git/` ou `src/features/github-flow/` (features já concluídas);
- implementação de conteúdo ou funcionalidades da SDD-005;
- refatoração de `AppShell.tsx`, `App.tsx`, `HomePage.tsx` além do mínimo estritamente necessário para pendurar a nova aba/rota;
- alteração de dependências no `package.json` sem necessidade comprovada e justificada;
- redesenho visual global, troca de framework, ou alterações de tema/paleta em `src/styles/index.css`;
- criação de backend, autenticação, banco de dados ou APIs;
- deploy ou merge;
- qualquer "melhoria oportunista" fora deste escopo (ROADMAP, seção 8.5);
- integração com a API real do GitHub (dados, exemplos e simulações devem ser estáticos/ilustrativos, sem chamadas de rede).

---

## 8. Estrutura de arquivos esperada

```text
src/features/code-review/
├── CodeReviewPage.tsx        (ou nome equivalente — componente de entrada do módulo)
├── components/                 (subcomponentes visuais da feature, se necessário)
│   └── ...
└── code-review.css             (estilos escopados da feature, se necessário)
```

Arquivos fora deste diretório só podem ser tocados conforme a seção 15 (regra de isolamento) e devem ser reportados explicitamente na devolutiva.

---

## 9. Requisitos funcionais

O módulo deve:

1. ser acessível a partir da navegação principal da aplicação (nova aba/rota, análoga às demais abas já registradas em `App.tsx`);
2. renderizar sem erros e sem depender de backend, login ou dados externos (nenhuma chamada real à API do GitHub);
3. apresentar todo o conteúdo mínimo obrigatório listado na seção 12;
4. incluir um exercício ou simulação prática de revisão de código (interativo simples ou guiado em texto, sem necessidade de integração real com GitHub);
5. funcionar de forma independente do módulo Pull Requests (SDD-005) — nenhuma dependência cruzada de componentes ou estado entre as duas features da Rodada 2B.

---

## 10. Requisitos de UX

1. linguagem visual consistente com o restante da aplicação (cards, tipografia e paleta já usados nas páginas existentes), sem introduzir um novo sistema de design paralelo;
2. o fluxo visual obrigatório (seção 12) deve ser apresentado como diagrama sequencial claro (JSX/CSS simples, sem necessidade de biblioteca de diagramação);
3. distinção visual clara entre Comment, Approve e Request Changes (por exemplo com cores ou ícones diferentes, seguindo o padrão já estabelecido em `GithubFlowPage.tsx` para esses três estados);
4. os cinco níveis de severidade sugeridos (crítico, alto, médio, baixo, informativo) devem ter representação visual distinta e consistente entre si;
5. conteúdo organizado em seções navegáveis ou em scroll único, priorizando clareza para iniciantes;
6. responsivo o suficiente para não quebrar em larguras menores, seguindo o padrão já usado nas páginas existentes.

---

## 11. Requisitos de conteúdo

Conteúdo mínimo obrigatório:

- objetivo do code review;
- o que revisar: corretude, aderência à SPEC, bugs, segurança básica, legibilidade, manutenção, testes, escopo, arquivos inesperados;
- diferença entre Comment, Approve e Request Changes;
- comentários inline;
- sugestões;
- como pedir mudança;
- como responder feedback;
- como atualizar o mesmo PR;
- nova revisão após correção;
- revisão cruzada (por que Diego revisa Alex e vice-versa);
- por que o autor não deve aprovar a própria implementação;
- níveis de severidade sugeridos: crítico, alto, médio, baixo, informativo;
- exercício ou simulação prática.

Fluxo visual obrigatório:

```
PR aberto → leitura da SPEC → análise do diff → comentários → Request Changes, se necessário → correção → novo push → nova revisão → Approve → merge
```

---

## 12. Critérios de aceite

- [ ] módulo acessível pela navegação da aplicação;
- [ ] todo o conteúdo mínimo desta SPEC está presente;
- [ ] fluxo visual completo (`PR aberto → ... → merge`) implementado;
- [ ] diferença entre Comment, Approve e Request Changes explicada de forma visualmente clara;
- [ ] os cinco níveis de severidade (crítico, alto, médio, baixo, informativo) presentes e diferenciados visualmente;
- [ ] exercício/simulação prática de revisão presente;
- [ ] nenhuma alteração em `src/features/pull-requests/`, `src/features/branches/`, `src/features/commits/`, `src/features/fundamentos-git/` ou `src/features/github-flow/`;
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
- mexer em `src/features/pull-requests/`, `src/features/branches/`, `src/features/commits/`, `src/features/fundamentos-git/` ou `src/features/github-flow/`;
- ampliar escopo além do definido nesta SPEC;
- usar `git reset --hard`, `git clean -fd` ou comandos destrutivos equivalentes;
- sobrescrever trabalho preexistente;
- alterar dependências sem justificativa comprovada;
- resolver conflitos de merge escolhendo cegamente `ours` ou `theirs`;
- iniciar esta feature antes do encerramento controlado da Rodada 2A, salvo nova autorização explícita.

O agente **pode**: sincronizar `main`, criar a branch `feat/code-review`, implementar, testar, commitar, fazer push e abrir PR.

---

## 16. Risco de colisão

Diretório proprietário desta SPEC: `src/features/code-review/`.

Diretório proprietário da SDD-005 (Diego, mesma rodada): `src/features/pull-requests/`.

Arquivos compartilhados sensíveis (evitar sempre que possível):

- `src/App.tsx`
- `src/app/AppShell.tsx`
- `src/pages/HomePage.tsx`
- `src/styles/index.css`
- `package.json`
- `package-lock.json`

**Lição incorporada das rodadas anteriores:** duas features paralelas tocando `App.tsx` e `AppShell.tsx` (para registrar suas abas) geram conflito real e esperado nesses arquivos — já observado no merge `beac67b` da Fase 1. Portanto:

1. a alteração em `App.tsx`/`AppShell.tsx` deve ser mínima (adicionar uma entrada na união de tipos `activeTab` e um botão de navegação, não reestruturar o arquivo);
2. deve ser justificada explicitamente na devolutiva;
3. deve ser reportada com o nome do arquivo e o risco de colisão com a SDD-005, que também precisará da mesma alteração para sua própria aba;
4. não deve incluir reformatação ou refatoração do restante do arquivo.

Se esta feature for a segunda das duas a ser mergeada na Rodada 2B, a branch `feat/code-review` precisará sincronizar com a `main` pós-merge de `feat/pull-requests` antes de finalizar seu próprio PR (ver seção 17).

---

## 17. Estratégia de integração

1. a branch `feat/code-review` deve partir da `main` atualizada (pós-merge de SDD-003 e SDD-004);
2. o PR desta feature deve ser aberto contra `main`, referenciando a Issue #14 e esta SPEC;
3. revisão cruzada: Diego revisa a implementação de Alex (ROADMAP, seção 10);
4. **merge sequencial:** o primeiro PR aprovado entre `feat/pull-requests` (SDD-005) e `feat/code-review` (SDD-006) pode ser mergeado normalmente após aprovação. A segunda branch deve então sincronizar com a `main` atualizada antes de finalizar seu próprio PR;
5. **resolução controlada de conflitos:** se houver conflito em `App.tsx`, `AppShell.tsx` ou outro arquivo compartilhado, a resolução deve preservar ambas as features (nunca descartar cegamente `ours` ou `theirs`) e deve ser coordenada pelo supervisor técnico, não decidida unilateralmente pelo agente;
6. **smoke local pós-integração:** após esta branch sincronizar com a `main`, repetir `npm run lint`, `npm run build`, `git diff --check` e o smoke visual, confirmando que ambas as abas (Pull Requests e Code Review) continuam funcionando;
7. nenhuma das duas features deve ser bloqueante da outra para abertura de PR — ambas podem ter PR aberto de forma independente, mas o merge deve ser sequencial, não simultâneo;
8. esta SPEC só deve ser executada após o encerramento controlado da Rodada 2A (SDD-003 e SDD-004 mergeadas), salvo nova autorização explícita.

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
8. riscos e pendências, incluindo status da sincronização com `feat/pull-requests` caso o merge sequencial já tenha ocorrido;
9. confirmação explícita de que não houve merge, deploy, alteração de secrets, comandos destrutivos, nem alterações em `src/features/pull-requests/`, `src/features/branches/`, `src/features/commits/`, `src/features/fundamentos-git/` ou `src/features/github-flow/`.

---

## 19. Próxima fase

Após o merge desta feature (e da SDD-005), a Fase 3 do roadmap (Primeiro conflito controlado) pode ser iniciada, mediante nova autorização explícita, conforme [ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](../ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md), seção 11, Fase 3.
