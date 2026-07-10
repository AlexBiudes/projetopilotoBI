# Projeto Piloto BI — Desenvolvimento em Equipe com IA e SDD

Laboratório prático de desenvolvimento colaborativo entre Diego e Alex, utilizando GitHub, agentes de IA (Antigravity/Claude) e a metodologia Spec-Driven Development (SDD).

---

## 🎯 Objetivo

Construir uma aplicação web educacional que ensina desenvolvimento de software em equipe, ao mesmo tempo em que o próprio projeto é desenvolvido seguindo as boas práticas da engenharia de software real:

`Ideia → Issue → SPEC → Branch → Implementação → Testes → Pull Request → Code Review → Merge → Deploy`

## 💡 Princípio Central

**O próprio projeto deve praticar o processo que ensina.** Cada funcionalidade é desenvolvida em uma branch dedicada, partindo de uma especificação (SDD) pré-aprovada, passando por revisão humana cruzada e validação de qualidade antes de ser integrada à branch principal (`main`).

---

## 👥 Participantes e Papéis

- **Diego:** Desenvolvedor, autor de features e revisor de código.
- **Alex:** Desenvolvedor, autor de features e revisor de código.
- **Agentes de IA (Antigravity/Claude):** Executores técnicos subordinados às especificações, restritos ao escopo autorizado e a branches designadas.
- **Supervisor Técnico:** Responsável por manter a governança, criar especificações técnicas (SPECs), gerenciar conflitos e auditar a qualidade antes dos merges.

---

## 🛠️ Stack Tecnológica

- **Core:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Ferramenta de Build:** [Vite](https://vite.dev/)
- **Estilização:** Vanilla CSS
- **Qualidade de Código:** [ESLint](https://eslint.org/)

---

## 🚀 Como Iniciar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes padrão)

### 1. Clonar o Repositório
```bash
git clone https://github.com/AlexBiudes/projetopilotoBI.git
cd projetopilotoBI
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
O servidor estará disponível por padrão em: `http://localhost:5173`

---

## 🧪 Comandos Locais de Validação

Seguindo o contrato de qualidade do projeto, antes de enviar qualquer alteração, certifique-se de executar localmente:

### Lint (Análise Estática de Código)
Para verificar problemas de estilo ou erros de sintaxe no código:
```bash
npm run lint
```

### Build (Compilação para Produção)
Para garantir que a aplicação compila sem erros de tipagem ou importação:
```bash
npm run build
```

### Testes Automatizados
*Nota: Não existem testes automatizados configurados na fundação inicial do projeto. Serão configurados nas fases posteriores do Roadmap.*

### Checagem de Espaços e Formatação Git
Para evitar formatações incorretas ou caracteres invisíveis indesejados no histórico:
```bash
git diff --check
```

---

## 🔄 Fluxo de Contribuição Resumido

1. Certifique-se de que a `main` local está atualizada.
2. Crie uma branch de trabalho com a convenção de nome (ex: `feat/minha-feature`).
3. Consulte a Issue correspondente no painel do GitHub.
4. Leia atentamente a especificação da feature em [docs/specs/](file:///docs/specs/).
5. Implemente o código limitando-se estritamente ao escopo definido na SPEC.
6. Execute as validações locais (`npm run lint`, `npm run build`, `git diff --check`).
7. Faça commits com mensagens semânticas (`feat: ...`, `fix: ...`).
8. Abra o Pull Request usando o template padrão e solicite a revisão cruzada do seu par (Diego revisa Alex / Alex revisa Diego).
9. Faça as correções solicitadas na mesma branch do PR.
10. Aguarde aprovação final antes de realizar o merge.

Para detalhes completos sobre a governança e padrões de codificação, consulte o [CONTRIBUTING.md](file:///CONTRIBUTING.md).

---

## 📂 Links e Documentação de Referência

- **Roadmap do Projeto:** [docs/ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md](file:///docs/ROADMAP_DESENVOLVIMENTO_EQUIPE_IA_SDD.md)
- **Especificação Técnica da Fundação (Fase 0):** [docs/specs/SDD-000_FUNDACAO_DO_PROJETO.md](file:///docs/specs/SDD-000_FUNDACAO_DO_PROJETO.md)
