# Guia de Contribuição — Projeto Piloto BI

Este documento define o processo de trabalho colaborativo e as convenções que Diego e Alex (e seus respectivos agentes de IA) devem seguir rigorosamente.

## 1. Fluxo de Trabalho (GitHub Flow + SDD)

Todo ciclo de desenvolvimento segue as seguintes etapas obrigatórias:

1. **Atualizar a Main:** Antes de qualquer alteração, garanta que sua branch local `main` está atualizada:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Criar a Branch:** Crie uma branch de trabalho a partir da `main` utilizando os prefixos de convenção:
   ```bash
   git checkout -b tipo/nome-da-feature
   ```
3. **Ler a Issue:** Compreenda o objetivo da tarefa no painel de Issues do GitHub.
4. **Ler a SPEC:** Leia integralmente a especificação técnica em `docs/specs/SDD-XXX_NOME_DA_SPEC.md` antes de escrever qualquer código.
5. **Desenvolver:** Implemente as alterações limitando-se estritamente ao escopo da SPEC.
6. **Validar Localmente:** Execute todas as validações obrigatórias antes de commitar (Lint, Build e Testes).
7. **Commits Claros:** Faça commits semânticos e organizados.
8. **Push:** Envie a branch para o repositório remoto:
   ```bash
   git push origin tipo/nome-da-feature
   ```
9. **Abrir Pull Request:** Abra um PR contra a branch `main` utilizando o template oficial de PR.
10. **Revisão Cruzada (Code Review):** 
    - Implementações de **Diego** devem ser revisadas por **Alex**.
    - Implementações de **Alex** devem ser revisadas por **Diego**.
11. **Correções no mesmo PR:** Qualquer alteração solicitada no code review deve ser feita na mesma branch e enviada para o mesmo PR.
12. **Aprovação e Merge:** O merge na `main` só é permitido após aprovação do revisor e aprovação das validações automatizadas.

---

## 2. Convenções de Branches

Utilize nomes em minúsculas, separados por hífens. Prefixos válidos:

* `feat/` — Novas funcionalidades (ex: `feat/fundamentos-git`)
* `fix/` — Correções de bugs (ex: `fix/menu-mobile`)
* `docs/` — Documentação (ex: `docs/roadmap-sdd`)
* `test/` — Adição ou alteração de testes (ex: `test/navegacao`)
* `refactor/` — Alterações de código que não mudam comportamento (ex: `refactor/otimizar-cards`)
* `chore/` — Manutenções gerais e configurações (ex: `chore/configurar-eslint`)

---

## 3. Convenções de Commits

Seguimos a convenção de commits semânticos em português ou inglês. Exemplos:

* `feat: adicionar modulo de pull requests`
* `fix: corrigir quebra de layout no menu mobile`
* `docs: atualizar guia de contribuicao`
* `chore: configurar regras do eslint para react`

Procure criar commits lógicos e evite dezenas de commits pequenos/desorganizados com mensagens genéricas.

---

## 4. Validações Locais Obrigatórias

Antes de realizar o push, certifique-se de executar e passar sem avisos por:

```bash
npm install
npm run lint
npm run build
git diff --check
```
