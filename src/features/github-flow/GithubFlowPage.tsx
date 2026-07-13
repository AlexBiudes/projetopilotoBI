import { useState } from 'react'
import './github-flow.css'

interface StepInfo {
  id: string;
  stepNumber: number;
  name: string;
  badge: string;
  description: string;
  extraInfo: string;
}

const FLOW_STEPS: StepInfo[] = [
  {
    id: 'issue',
    stepNumber: 1,
    name: 'Issue',
    badge: 'Planejamento',
    description: 'Tudo começa com uma Issue no GitHub. Ela descreve um problema a ser resolvido, um bug ou uma nova funcionalidade que precisa ser implementada. Serve como o registro histórico do porquê aquela alteração é necessária.',
    extraInfo: 'Exemplo: "Issue #7 — SDD-002 — GitHub Flow" registra o escopo inicial e o responsável humano.'
  },
  {
    id: 'spec',
    stepNumber: 2,
    name: 'SPEC',
    badge: 'Design Técnico',
    description: 'A especificação técnica (SPEC) define o contrato de implementação. Ela detalha a estrutura de arquivos, escopo autorizado, regras de isolamento e critérios de aceite antes de escrever qualquer linha de código. Garante alinhamento completo entre humanos e agentes de IA.',
    extraInfo: 'Arquivos de SPEC geralmente ficam em "docs/specs/" e servem como a verdade técnica a ser seguida.'
  },
  {
    id: 'branch',
    stepNumber: 3,
    name: 'Branch',
    badge: 'Isolamento',
    description: 'Uma branch é um espaço de trabalho isolado criado a partir da branch principal (main). Desenvolver em uma branch dedicada garante que o código em produção (main) permaneça sempre estável e limpo.',
    extraInfo: 'Comando típico: "git checkout -b feat/github-flow". Nunca codifique diretamente na main!'
  },
  {
    id: 'implementacao',
    stepNumber: 4,
    name: 'Implementação',
    badge: 'Desenvolvimento',
    description: 'Esta é a fase onde as alterações de código são efetivamente feitas no diretório proprietário da feature, respeitando as regras estabelecidas na SPEC e as diretrizes visuais da aplicação.',
    extraInfo: 'Regra de ouro: Mantenha as alterações estritamente no escopo autorizado pela SPEC para evitar conflitos.'
  },
  {
    id: 'commit',
    stepNumber: 5,
    name: 'Commit',
    badge: 'Ponto de Controle',
    description: 'O commit grava suas alterações locais no histórico do Git. Cada commit deve ter uma mensagem clara, objetiva e que explique resumidamente o que foi feito.',
    extraInfo: 'Comando típico: "git commit -m \'feat: adicionar modulo educacional github flow\'".'
  },
  {
    id: 'push',
    stepNumber: 6,
    name: 'Push',
    badge: 'Sincronização',
    description: 'O comando push envia seus commits locais da branch de feature para o repositório remoto hospedado no GitHub. Isso torna o seu código acessível para outros membros da equipe.',
    extraInfo: 'Comando típico: "git push origin feat/github-flow".'
  },
  {
    id: 'pr',
    stepNumber: 7,
    name: 'Pull Request',
    badge: 'Revisão Proposta',
    description: 'Um Pull Request (PR) é uma solicitação formal para integrar as alterações da sua branch de feature na branch principal (main). É no PR que ocorre a discussão técnica e a validação final da entrega.',
    extraInfo: 'O PR deve descrever claramente o que muda e fazer referência direta à Issue relacionada (ex: "Refs #7").'
  },
  {
    id: 'review',
    stepNumber: 8,
    name: 'Review',
    badge: 'Garantia de Qualidade',
    description: 'Membros da equipe (humanos e/ou agentes de IA) revisam o código do Pull Request. Eles buscam bugs, problemas de arquitetura, inconsistências de estilo e validam se todos os critérios de aceite foram atendidos.',
    extraInfo: 'A revisão cruzada é essencial: um desenvolvedor nunca deve aprovar o seu próprio código.'
  },
  {
    id: 'correcao',
    stepNumber: 9,
    name: 'Correção',
    badge: 'Iteração',
    description: 'Caso os revisores encontrem problemas ou sugiram melhorias, o autor faz os ajustes necessários na mesma branch de feature localmente, realiza novos commits e faz o push. O Pull Request é atualizado automaticamente.',
    extraInfo: 'Não é preciso abrir outro PR! Basta enviar novos commits para a mesma branch e eles aparecerão no PR aberto.'
  },
  {
    id: 'approve',
    stepNumber: 10,
    name: 'Approve',
    badge: 'Aprovação',
    description: 'Quando o código está correto, limpo e atende a todos os requisitos, os revisores dão o "Approve" (Aprovação). O PR agora está pronto e autorizado para ser integrado.',
    extraInfo: 'A maioria dos projetos exige pelo menos uma aprovação de outro desenvolvedor antes de permitir o merge.'
  },
  {
    id: 'merge',
    stepNumber: 11,
    name: 'Merge',
    badge: 'Integração',
    description: 'O merge combina o histórico da sua branch de feature com a branch main. No GitHub, costuma-se usar o "Squash and Merge" para condensar todos os commits da feature em um único commit limpo na main.',
    extraInfo: 'O merge fecha o Pull Request e atualiza a base de código principal oficial.'
  },
  {
    id: 'atualizar-main',
    stepNumber: 12,
    name: 'Atualizar Main',
    badge: 'Sincronização Final',
    description: 'Após o merge, a branch de feature remota e local devem ser deletadas para manter o repositório organizado. Em seguida, todos os desenvolvedores atualizam suas branches main locais para receber a nova funcionalidade.',
    extraInfo: 'Comandos: "git checkout main", "git pull origin main" e "git branch -d feat/github-flow".'
  }
];

export default function GithubFlowPage() {
  const [activeStep, setActiveStep] = useState<StepInfo>(FLOW_STEPS[0]);
  const [reviewType, setReviewType] = useState<'comment' | 'approve' | 'changes'>('comment');

  const getReviewDetails = () => {
    switch (reviewType) {
      case 'comment':
        return {
          title: 'Comment (Comentário)',
          badgeClass: 'sim-badge-comment',
          reviewer: 'Diego (Supervisor Técnico)',
          content: 'O código está muito bem estruturado e modularizado! Notei apenas um pequeno detalhe: você usou uma margem fixa no container que pode quebrar em telas ultra-wide. O que acha de trocar por uma margem percentual ou usar flexbox?',
          hint: '💡 Comentários servem para fazer perguntas, sugerir melhorias opcionais ou elogiar o código. Não bloqueiam o merge.'
        };
      case 'approve':
        return {
          title: 'Approve (Aprovação)',
          badgeClass: 'sim-badge-approve',
          reviewer: 'Diego (Supervisor Técnico)',
          content: 'Excelente implementação. Todos os requisitos da SPEC SDD-002 foram atendidos com rigor, a responsividade está impecável e os testes passaram sem problemas. Aprovado!',
          hint: '✅ A aprovação indica que o código está pronto para produção. O merge agora está autorizado.'
        };
      case 'changes':
        return {
          title: 'Request Changes (Solicitar Alterações)',
          badgeClass: 'sim-badge-changes',
          reviewer: 'Diego (Supervisor Técnico)',
          content: 'A rota "/github-flow" foi criada, mas está apontando para o componente errado no arquivo App.tsx, impedindo que a página renderize. Por favor, ajuste o import e a renderização condicional.',
          hint: '⚠️ Solicitar alterações é um bloqueio rígido. O autor precisa corrigir os problemas e subir novos commits antes que o PR possa ser aprovado.'
        };
    }
  };

  const review = getReviewDetails();

  return (
    <div className="github-flow-page">
      <header className="github-flow-header">
        <h1 className="github-flow-title">GitHub Flow</h1>
        <p className="github-flow-subtitle">
          Entenda o ciclo de vida do desenvolvimento colaborativo utilizado por equipes profissionais de engenharia de software e agentes de Inteligência Artificial.
        </p>
      </header>

      {/* Sequential Flow Diagram */}
      <section className="diagram-container">
        <h2 className="diagram-title">
          <span>🔄</span> O Fluxo Sequencial de Desenvolvimento
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Clique em cada etapa do fluxo para ler a explicação detalhada do seu papel no ciclo.
        </p>
        <div className="diagram-scroll-wrapper">
          {FLOW_STEPS.map((step, index) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                className={`diagram-node ${activeStep.id === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step)}
                aria-label={`Etapa ${step.stepNumber}: ${step.name}`}
              >
                <span className="node-step">Passo {step.stepNumber}</span>
                <span className="node-name">{step.name}</span>
              </button>
              {index < FLOW_STEPS.length - 1 && (
                <span className="diagram-arrow" aria-hidden="true">➔</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Detail Card of Selected Node */}
      <section className="node-detail-card" aria-live="polite">
        <div className="detail-header">
          <span className="detail-badge">{activeStep.badge}</span>
          <h2 className="detail-title">{activeStep.name}</h2>
        </div>
        <p className="detail-description">{activeStep.description}</p>
        <div className="detail-extra-info">
          <strong>💡 Dica / Detalhe Técnico:</strong> <span dangerouslySetInnerHTML={{ __html: activeStep.extraInfo }} />
        </div>
      </section>

      {/* Code Review Simulator */}
      <section className="simulator-container">
        <h2 className="simulator-title">Simulador de Code Review</h2>
        <p className="simulator-subtitle">
          Durante a fase de <strong>Review (Passo 8)</strong>, os revisores avaliam o Pull Request e escolhem uma das três ações abaixo. Clique nas opções para simular cada cenário:
        </p>

        <div className="simulator-options">
          <button
            className={`sim-btn sim-btn-comment ${reviewType === 'comment' ? 'active' : ''}`}
            onClick={() => setReviewType('comment')}
          >
            💬 Comment
          </button>
          <button
            className={`sim-btn sim-btn-approve ${reviewType === 'approve' ? 'active' : ''}`}
            onClick={() => setReviewType('approve')}
          >
            ✅ Approve
          </button>
          <button
            className={`sim-btn sim-btn-changes ${reviewType === 'changes' ? 'active' : ''}`}
            onClick={() => setReviewType('changes')}
          >
            ⚠️ Request Changes
          </button>
        </div>

        <div className="simulator-screen" aria-live="polite">
          <div className="sim-review-header">
            <span className="sim-reviewer">
              👤 {review.reviewer}
            </span>
            <span className={`sim-badge ${review.badgeClass}`}>
              {review.title}
            </span>
          </div>
          <p className="sim-review-content">"{review.content}"</p>
          <div className="sim-action-hint">{review.hint}</div>
        </div>
      </section>

      {/* Frequently Asked Questions / Concepts Grid */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>
          Perguntas Frequentes & Boas Práticas
        </h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h3 className="faq-question">Por que não desenvolver diretamente na main?</h3>
            <p className="faq-answer">
              A branch `main` representa o código em produção. Codificar diretamente nela aumenta drasticamente o risco de introduzir bugs para os usuários finais e impede a realização de testes e revisões sistemáticas em equipe.
            </p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Por que cada feature deve ter sua própria branch?</h3>
            <p className="faq-answer">
              O uso de branches isoladas (ex: `feat/github-flow`) permite que múltiplos desenvolvedores (ou IAs) trabalhem simultaneamente no mesmo projeto sem sobrescrever ou interferir no código uns dos outros.
            </p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Para que serve um Pull Request (PR)?</h3>
            <p className="faq-answer">
              O Pull Request é o ponto focal da colaboração. Além de propor as mudanças de código, ele serve como um fórum para debater a implementação, documentar decisões arquiteturais, rodar builds automatizados e revisar a qualidade do código.
            </p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">O que acontece quando o PR é atualizado?</h3>
            <p className="faq-answer">
              Se você enviar novos commits para o GitHub na mesma branch de feature, o Pull Request atualiza instantaneamente com o novo diff. Todos os testes automatizados rodam novamente sobre o código atualizado.
            </p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Qual a diferença entre Merge e Squash?</h3>
            <p className="faq-answer">
              Um <strong>Merge</strong> clássico junta o histórico mantendo todos os micro-commits da branch. O <strong>Squash</strong> compacta todos os commits da sua branch em um único commit consolidado e limpo antes de mesclá-lo na `main`, mantendo o histórico da `main` fácil de ler.
            </p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Por que deletar a branch após o merge?</h3>
            <p className="faq-answer">
              Uma vez que as alterações foram mescladas com sucesso na `main`, a branch de feature torna-se obsoleta. Deletá-la (tanto local quanto remotamente) evita poluição no repositório e confusões futuras.
            </p>
          </div>

          <div className="faq-card">
            <h3 className="faq-question">Como outro desenvolvedor recebe a mudança?</h3>
            <p className="faq-answer">
              Após o merge na `main` remota, outros desenvolvedores sincronizam seu ambiente local executando `git checkout main` e depois `git pull origin main`. Isso atualiza suas bases de código locais com a nova feature integrada.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
