# Roadmap Mestre — Projeto Piloto de Desenvolvimento em Equipe com IA e SDD

**Projeto:** Projeto Piloto BI  
**Repositório:** `AlexBiudes/projetopilotoBI`  
**Participantes humanos:** Diego e Alex  
**Agentes de IA:** Antigravity / Claude  
**Metodologia:** Spec-Driven Development (SDD)  
**Status:** Fundação inicial  
**Documento vivo:** sim

---

## 1. Visão do projeto

Este projeto tem dois objetivos simultâneos:

1. construir um site que ensine o processo real de desenvolvimento de software em equipe utilizando Git e GitHub;
2. usar o próprio desenvolvimento do site como laboratório prático do processo que está sendo ensinado.

A aplicação deve ensinar e demonstrar, na prática, o seguinte ciclo:

`Ideia → Backlog → Issue → SPEC → Branch → Implementação → Testes → Pull Request → Code Review → Correção → Aprovação → Merge → Deploy → Produção`

O projeto não deve ser tratado como um simples exercício de Git. Ele será conduzido como um pequeno produto real, com rastreabilidade, escopo controlado, trabalho paralelo, revisão cruzada, testes e releases.

---

## 2. Princípio central

> O próprio projeto deve praticar o processo que ensina.

Se o site explicar branches, a página sobre branches deverá ter sido construída em uma branch própria.

Se o site explicar Pull Requests, essa feature deverá ter chegado à `main` por Pull Request.

Se o site explicar code review, Diego e Alex deverão revisar código um do outro.

Se o site explicar conflitos, em uma fase controlada será criado e resolvido um conflito proposital.

---

## 3. Objetivos de aprendizagem

Ao final do piloto, Diego e Alex devem compreender e ter praticado:

### 3.1 Desenvolvimento individual

- clonar e configurar um repositório;
- compreender working tree, staging area e commit;
- trabalhar em branch própria;
- produzir commits pequenos e explicativos;
- testar localmente;
- atualizar uma branch com mudanças recentes da `main`.

### 3.2 Desenvolvimento simultâneo

- duas pessoas trabalhando no mesmo produto ao mesmo tempo;
- features independentes em branches diferentes;
- prevenção de colisões de escopo;
- identificação de dependências entre features;
- sincronização com a `main`;
- resolução de conflitos.

### 3.3 Governança

- backlog;
- Issues;
- SPECs;
- critérios de aceite;
- branches;
- Pull Requests;
- revisão cruzada;
- aprovação;
- merge;
- histórico de decisões.

### 3.4 Qualidade e entrega

- lint;
- testes automatizados;
- build;
- CI;
- deploy de preview;
- produção;
- releases;
- rollback e hotfix em fase posterior.

### 3.5 Trabalho com agentes de IA

- transformar objetivo em SPEC;
- limitar o agente ao escopo autorizado;
- impedir alterações oportunistas fora da feature;
- exigir preflight antes de modificar código;
- auditar diff, testes e arquivos alterados;
- separar implementação, revisão e aprovação;
- preservar rastreabilidade humana mesmo quando a IA executa o código.

---

## 4. Papéis e responsabilidades

### 4.1 Diego

Atua alternadamente como:

- desenvolvedor;
- autor de feature;
- revisor de PR do Alex;
- responsável por validar comportamento funcional quando for o dono da feature.

Diego não deve aprovar automaticamente sua própria implementação apenas porque foi executada por seu agente.

### 4.2 Alex

Atua alternadamente como:

- desenvolvedor;
- autor de feature;
- revisor de PR do Diego;
- responsável por validar comportamento funcional quando for o dono da feature.

Alex não deve aprovar automaticamente sua própria implementação apenas porque foi executada por seu agente.

### 4.3 Agentes de IA

Cada agente é um executor técnico, não o dono do produto.

O agente deve:

- trabalhar somente na branch atribuída;
- ler a SPEC antes de implementar;
- fazer preflight do estado Git;
- respeitar hard stops;
- não ampliar escopo por iniciativa própria;
- não fazer merge;
- não fazer deploy sem autorização explícita;
- não alterar secrets;
- não apagar arquivos preexistentes fora do escopo;
- não usar `git reset --hard`, `git clean -fd` ou equivalentes destrutivos sem autorização explícita;
- reportar arquivos alterados, testes executados, resultados e pendências.

### 4.4 Supervisor técnico

Responsável por:

- manter visão global do roadmap;
- quebrar objetivos em SDDs pequenas;
- definir fronteiras de escopo;
- detectar colisões entre Diego e Alex;
- determinar se duas features podem correr em paralelo;
- auditar branches, commits, diffs e PRs;
- orientar a ordem de merge;
- preservar a governança;
- atuar como prompt writer para os agentes.

---

## 5. Fonte da verdade

A fonte da verdade do projeto será o próprio repositório.

A conversa com agentes de IA ajuda na execução, mas não substitui documentação versionada.

Devem ser registrados no GitHub:

- Issues;
- SPECs;
- branches;
- commits;
- Pull Requests;
- comentários de review;
- decisões relevantes;
- releases.

---

## 6. Fluxo oficial do projeto

Toda feature funcional deve seguir este fluxo:

### Etapa 1 — Necessidade

Existe um problema, objetivo ou oportunidade.

Ainda não se começa a programar.

### Etapa 2 — Issue

A Issue registra:

- contexto;
- problema;
- objetivo;
- escopo;
- fora de escopo;
- critérios de aceite;
- dependências;
- riscos conhecidos.

### Etapa 3 — SPEC

A SPEC transforma a intenção em contrato executável.

Cada SPEC deve conter, no mínimo:

1. contexto;
2. estado atual;
3. objetivo;
4. escopo autorizado;
5. fora de escopo;
6. comportamento esperado;
7. arquivos ou áreas permitidas, quando previsíveis;
8. requisitos de UX, se aplicável;
9. critérios de aceite;
10. plano de testes;
11. hard stops;
12. evidências exigidas;
13. estratégia de rollback, quando aplicável.

### Etapa 4 — Branch

A implementação ocorre em branch própria.

Convenções:

- `feat/...` — nova funcionalidade;
- `fix/...` — correção;
- `docs/...` — documentação;
- `test/...` — testes;
- `refactor/...` — refatoração sem mudança funcional;
- `chore/...` — manutenção técnica.

Exemplos:

- `feat/fundamentos-git`
- `feat/github-flow`
- `docs/roadmap-sdd`
- `fix/menu-mobile`

### Etapa 5 — Preflight do agente

Antes de alterar arquivos, o agente deve informar:

- repositório atual;
- branch atual;
- HEAD atual;
- relação com `origin/main`;
- `git status`;
- arquivos tracked modificados;
- arquivos untracked preexistentes;
- escopo autorizado;
- riscos de colisão.

Nenhum agente deve começar implementação séria sem esse diagnóstico.

### Etapa 6 — Implementação

O agente implementa apenas o que a SPEC autoriza.

Mudanças descobertas fora do escopo devem ser reportadas, não incorporadas silenciosamente.

### Etapa 7 — Testes locais

Antes do PR:

- lint;
- testes relevantes;
- build;
- smoke local quando houver interface;
- `git diff --check`;
- revisão dos arquivos alterados.

### Etapa 8 — Commit e push

Commits devem representar unidades lógicas.

Formato sugerido:

- `feat: adicionar modulo de pull requests`
- `fix: corrigir navegacao mobile`
- `docs: registrar roadmap mestre do projeto`
- `test: cobrir navegacao entre modulos`

### Etapa 9 — Pull Request

O PR deve conter:

- problema;
- solução;
- escopo realizado;
- arquivos principais;
- como testar;
- testes executados;
- evidências;
- riscos;
- fora de escopo;
- vínculo com a Issue.

### Etapa 10 — Code review cruzado

Regra pedagógica do piloto:

- feature do Diego → Alex revisa;
- feature do Alex → Diego revisa.

O reviewer verifica:

- aderência à SPEC;
- legibilidade;
- duplicação;
- regressões;
- segurança;
- arquivos fora de escopo;
- testes;
- documentação;
- experiência do usuário.

### Etapa 11 — Correções no mesmo PR

Mudanças solicitadas entram na mesma branch e atualizam o mesmo PR.

Não se abre um novo PR para cada rodada de review.

### Etapa 12 — Aprovação e merge

Somente após:

- critérios de aceite atendidos;
- testes verdes;
- review concluído;
- nenhum achado crítico bloqueante;
- ausência de conflito pendente.

### Etapa 13 — Pós-merge

Após o merge:

- atualizar `main` local;
- remover branch concluída quando apropriado;
- validar o estado integrado;
- registrar release ou deploy quando aplicável.

---

## 7. Regra de ouro para não se atropelar

Duas features podem ser desenvolvidas em paralelo somente quando houver clareza sobre suas fronteiras.

Antes de iniciar trabalho paralelo, responder:

1. cada feature possui Issue própria?
2. cada feature possui SPEC própria?
3. cada feature possui branch própria?
4. os arquivos esperados são majoritariamente diferentes?
5. existe dependência entre elas?
6. alguma precisa ser mergeada primeiro?
7. ambas modificam arquivos centrais como router, menu, tema, configuração ou package lock?
8. existe risco de um agente reformatar ou refatorar código fora de sua feature?

Se a resposta indicar alta colisão, as features devem ser sequenciadas ou ter integração coordenada.

---

## 8. Regras específicas para uso de agentes de IA

### 8.1 Um agente, uma branch, uma missão

Um agente não deve trabalhar simultaneamente em múltiplas branches no mesmo diretório de trabalho.

### 8.2 Nunca usar a `main` como área de implementação

A `main` representa código integrado.

Implementações devem ocorrer em branches.

### 8.3 Sem escopo invisível

O agente deve dizer o que pretende alterar antes de alterar.

### 8.4 Sem limpeza destrutiva

Arquivos untracked ou modificações preexistentes devem ser preservados.

### 8.5 Sem “melhorias oportunistas”

Se a feature é sobre página de Pull Requests, o agente não deve, por conta própria:

- trocar framework;
- refatorar toda a navegação;
- alterar design global;
- atualizar dependências sem necessidade;
- mexer em outra feature.

### 8.6 Evidência obrigatória

A devolutiva do agente deve incluir:

- branch;
- HEAD;
- commits;
- arquivos alterados;
- resumo do diff;
- testes executados;
- resultado dos testes;
- limitações;
- itens não realizados.

### 8.7 Agente executor não é aprovador final

A IA pode implementar e revisar tecnicamente, mas o gate final de produto continua humano.

---

## 9. Arquitetura inicial recomendada

Para reduzir complexidade no piloto:

- frontend web;
- React;
- TypeScript;
- Vite;
- CSS modular ou estratégia simples equivalente;
- ESLint;
- testes automatizados;
- GitHub Actions em fase posterior;
- deploy em plataforma simples em fase posterior.

Não iniciar com:

- banco de dados;
- autenticação;
- backend;
- filas;
- microserviços.

Esses elementos podem ser adicionados futuramente como novas trilhas educacionais.

---

## 10. Estrutura de diretórios proposta

```text
projetopilotoBI/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
├── docs/
│   ├── decisions/
│   ├── playbooks/
│   ├── architecture/
│   └── specs/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── fundamentos-software/
│   │   ├── git-basics/
│   │   ├── github-flow/
│   │   ├── branches/
│   │   ├── commits/
│   │   ├── pull-requests/
│   │   ├── code-review/
│   │   ├── conflicts/
│   │   ├── ci-cd/
│   │   └── deploy/
│   ├── pages/
│   └── styles/
├── CONTRIBUTING.md
├── README.md
└── package.json
```

A estrutura final pode ser ajustada pela SDD de fundação. O importante é preservar fronteiras claras entre features.

---

## 11. Roadmap por fases

# Fase 0 — Fundação do laboratório

**Objetivo:** criar a base compartilhada e o processo de trabalho.

Entregas:

- repositório inicializado;
- README;
- roadmap mestre;
- primeira SPEC;
- aplicação frontend criada;
- estrutura mínima;
- lint;
- build;
- guia de contribuição;
- template de PR;
- template de Issue;
- convenções Git documentadas.

**Aprendizado principal:** como um projeto nasce e como uma mudança chega à `main`.

---

# Fase 1 — Primeiras duas features paralelas

Primeira rodada de trabalho simultâneo real.

### Diego

**Feature sugerida:** Fundamentos de Git.

Escopo:

- o que é Git;
- repositório;
- working tree;
- staging area;
- commit;
- local x remoto.

### Alex

**Feature sugerida:** GitHub Flow.

Escopo:

- Issue;
- branch;
- commit;
- push;
- Pull Request;
- review;
- merge.

Cada feature terá:

- Issue;
- SPEC;
- branch;
- agente próprio;
- PR próprio;
- review cruzado.

**Aprendizado principal:** trabalho paralelo sem colisão.

---

# Fase 2 — Expansão do conteúdo e revisão cruzada

Features sugeridas:

- Branches;
- Commits;
- Pull Requests;
- Code Review.

Distribuição alternada para que ambos pratiquem autoria e revisão.

**Aprendizado principal:** qualidade, feedback e evolução de um PR.

---

# Fase 3 — Primeiro conflito controlado

Depois de dominar o fluxo normal, será criado um conflito proposital e pequeno.

Exemplo:

- Diego altera um trecho do Header;
- Alex altera o mesmo trecho em outra branch;
- o primeiro PR entra;
- o segundo precisa sincronizar e resolver o conflito.

**Aprendizado principal:** entender por que conflitos acontecem e como resolvê-los.

Não antecipar esta fase antes do domínio do fluxo básico.

---

# Fase 4 — Governança real

Introduzir:

- labels;
- backlog;
- prioridades;
- tipos de Issue;
- definição de pronto;
- critérios de aceite consistentes;
- decisões arquiteturais registradas.

Fluxo:

`BACKLOG → READY → EM DESENVOLVIMENTO → EM REVIEW → APROVADO → MERGED → PRODUÇÃO`

---

# Fase 5 — Proteção da `main`

Após o fluxo estar funcionando:

- bloquear push direto na `main`, se o plano/permissões do GitHub permitirem;
- exigir Pull Request;
- exigir review;
- exigir checks verdes;
- bloquear force push;
- impedir exclusão da branch principal.

**Aprendizado principal:** políticas técnicas protegendo o processo.

---

# Fase 6 — CI automático

Criar workflow para executar em PR:

```bash
npm ci
npm run lint
npm run test
npm run build
```

**Aprendizado principal:** validação automática antes do merge.

---

# Fase 7 — Deploy e ambientes

Introduzir:

- preview por PR, quando disponível;
- ambiente de produção;
- validação pós-deploy;
- diferenciação entre merge e deploy;
- rollback.

**Aprendizado principal:** código integrado não é automaticamente sinônimo de entrega validada.

---

# Fase 8 — Releases e manutenção

Criar versões:

- `v0.1.0` — Fundação;
- `v0.2.0` — Git e GitHub Flow;
- `v0.3.0` — Branches e Commits;
- `v0.4.0` — Pull Requests e Reviews;
- `v0.5.0` — Conflitos;
- `v0.6.0` — CI/CD;
- `v1.0.0` — Primeira versão educacional completa.

Introduzir:

- bugfix;
- hotfix;
- changelog;
- release notes.

---

## 12. Conteúdo educacional planejado

### Módulo 1 — Antes do código

- produto x projeto;
- feature;
- bug;
- requisito;
- critério de aceite;
- definição de pronto.

### Módulo 2 — Git

- repositório;
- working tree;
- staging;
- commit;
- histórico.

### Módulo 3 — GitHub

- repositório remoto;
- clone;
- fetch;
- pull;
- push.

### Módulo 4 — Branches

- branch principal;
- feature branch;
- isolamento;
- convenções.

### Módulo 5 — Desenvolvimento simultâneo

- duas pessoas;
- arquivos diferentes;
- mesmo arquivo;
- sincronização;
- dependências.

### Módulo 6 — Pull Requests

- abertura;
- descrição;
- Draft PR;
- critérios;
- atualização do mesmo PR.

### Módulo 7 — Code Review

- o que revisar;
- como pedir mudanças;
- como receber feedback;
- aprovação.

### Módulo 8 — Conflitos

- origem;
- prevenção;
- resolução;
- validação pós-conflito.

### Módulo 9 — Qualidade

- lint;
- testes;
- build;
- CI.

### Módulo 10 — Deploy

- preview;
- produção;
- release;
- rollback.

---

## 13. Backlog inicial proposto

| Ordem | Item |
|---|---|
| 1 | DOC-001 — Registrar roadmap mestre e metodologia SDD |
| 2 | SDD-000 — Fundação do projeto e bootstrap inicial |
| 3 | FEAT-001 — Criar página inicial do guia |
| 4 | FEAT-002 — Criar módulo Fundamentos de Software |
| 5 | FEAT-003 — Criar módulo Fundamentos de Git |
| 6 | FEAT-004 — Criar módulo GitHub Flow |
| 7 | FEAT-005 — Criar módulo Branches |
| 8 | FEAT-006 — Criar módulo Commits |
| 9 | FEAT-007 — Criar módulo Pull Requests |
| 10 | FEAT-008 — Criar módulo Code Review |
| 11 | FEAT-009 — Criar módulo Conflitos |
| 12 | QA-001 — Adicionar testes automatizados |
| 13 | CI-001 — Configurar GitHub Actions |
| 14 | GOV-001 — Proteger a `main` |
| 15 | REL-001 — Configurar primeiro deploy |
| 16 | REL-002 — Publicar primeira release |

A numeração real das Issues será definida pelo GitHub.

---

## 14. Sprint 0 — Início efetivo

O Sprint 0 deve ser curto e focado em criar a base compartilhada.

### Objetivo

Sair de um repositório vazio para um projeto executável, documentado e pronto para duas features paralelas.

### Entregas

1. inicializar aplicação React + TypeScript + Vite;
2. criar estrutura mínima de diretórios;
3. adicionar README;
4. adicionar CONTRIBUTING;
5. adicionar roadmap;
6. criar template de PR;
7. criar template de Issue;
8. configurar lint;
9. validar build;
10. documentar comandos locais.

### Fora de escopo

- banco de dados;
- backend;
- autenticação;
- deploy;
- CI completo;
- conteúdo final de todos os módulos;
- design sofisticado;
- trabalho paralelo antes da fundação estar estável.

### Resultado esperado

Ao final do Sprint 0:

- qualquer um dos dois consegue clonar;
- instalar dependências;
- executar localmente;
- rodar lint;
- rodar build;
- entender a estrutura;
- criar uma branch de feature a partir da `main`.

---

## 15. Primeira rodada de desenvolvimento paralelo

Somente após a fundação ser mergeada.

### Diego

- Issue: Fundamentos de Git;
- SPEC própria;
- branch própria;
- agente próprio.

### Alex

- Issue: GitHub Flow;
- SPEC própria;
- branch própria;
- agente próprio.

Antes de liberar as duas implementações, o supervisor técnico deve auditar se:

- ambas partem da mesma `main`;
- os escopos estão separados;
- não há colisão estrutural relevante;
- os arquivos centrais foram previamente estabilizados.

---

## 16. Definição de pronto de uma feature

Uma feature só pode ser considerada pronta quando:

- a Issue existe;
- a SPEC existe e foi lida;
- a branch está correta;
- o escopo foi respeitado;
- testes locais relevantes passaram;
- build passou;
- não existem arquivos inesperados no diff;
- o PR explica a mudança;
- o reviewer cruzado aprovou;
- eventuais mudanças solicitadas foram resolvidas;
- o merge foi realizado;
- a integração foi validada.

Deploy só é exigido quando a fase do projeto já possuir ambiente de produção.

---

## 17. Hard stops globais

Sem autorização explícita, agentes não podem:

- fazer merge;
- fazer deploy;
- modificar secrets;
- remover proteção de branch;
- apagar histórico;
- usar comandos Git destrutivos;
- alterar dependências sem justificativa;
- refatorar áreas fora da SPEC;
- sobrescrever trabalho preexistente;
- promover uma mudança para produção.

---

## 18. Comandos mínimos que Diego e Alex devem compreender

Mesmo usando agentes de IA, ambos devem saber interpretar:

```bash
git status
git branch --show-current
git log --oneline --decorate -n 10
git fetch origin
git checkout main
git pull origin main
git checkout -b feat/minha-feature
git diff
git diff --check
git add .
git commit -m "feat: descrever mudanca"
git push -u origin feat/minha-feature
```

A IA pode executar os comandos, mas os humanos devem entender o efeito de cada um.

---

## 19. Próximo passo oficial

O próximo passo é executar a:

`docs/specs/SDD-000_FUNDACAO_DO_PROJETO.md`

Essa SPEC cria a fundação do projeto e prepara o primeiro PR técnico real.

Após o merge da fundação, serão abertas duas frentes paralelas:

- Diego: Fundamentos de Git;
- Alex: GitHub Flow.

---

## 20. Princípio final

> Velocidade não vem de colocar dois agentes para editar tudo ao mesmo tempo. Velocidade sustentável vem de dividir bem o problema, isolar escopos, tornar o estado visível e integrar mudanças pequenas com segurança.

Este documento deve evoluir conforme o projeto amadurecer, mas qualquer mudança relevante de processo deve ser deliberada, documentada e versionada.
