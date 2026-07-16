import { useState } from 'react'
import './pull-requests.css'

interface Commit {
  hash: string
  message: string
  author: string
  date: string
}

interface TimelineEvent {
  type: 'creation' | 'commit' | 'comment' | 'status-change' | 'merge' | 'review'
  id: string
  time: string
  user: string
  text: string
  icon?: string
}

interface DiffLine {
  text: string
  type: 'added' | 'removed' | 'neutral'
}

interface MockFileDiff {
  filename: string
  additions: number
  deletions: number
  lines: DiffLine[]
}

export default function PullRequestsPage() {
  // Simulator states
  const [isPrCreated, setIsPrCreated] = useState<boolean>(false)
  const [prTitle, setPrTitle] = useState<string>('feat: adicionar suporte a internacionalizacao')
  const [prDescription, setPrDescription] = useState<string>(
    'Adiciona suporte basico a multi-idiomas usando arquivos JSON de traducao e um hook customizado. Refs #13, Spec SDD-005.'
  )
  const [headBranch, setHeadBranch] = useState<string>('feat/internacionalizacao')
  const [isDraft, setIsDraft] = useState<boolean>(false)
  const [activeSubTab, setActiveSubTab] = useState<'conversation' | 'commits' | 'files'>('conversation')

  // PR Live Cycles
  const [commits, setCommits] = useState<Commit[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [ciStatus, setCiStatus] = useState<'none' | 'running' | 'passed' | 'failed'>('none')
  const [reviewStatus, setReviewStatus] = useState<'none' | 'requested' | 'commented' | 'approved'>('none')
  const [hasConflict, setHasConflict] = useState<boolean>(false)
  const [isMerged, setIsMerged] = useState<boolean>(false)
  const [mergeStrategy, setMergeStrategy] = useState<'merge-commit' | 'squash'>('squash')
  const [isBranchDeleted, setIsBranchDeleted] = useState<boolean>(false)

  // Simulation step logging / helper message
  const [guideMsg, setGuideMsg] = useState<string>(
    'Bem-vindo ao Simulador! Configure os dados do seu Pull Request ao lado e clique em "Criar Pull Request" para começar.'
  )

  // Initial setup when PR is created
  const handleCreatePr = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prTitle.trim()) {
      alert('Por favor, informe o título do Pull Request.')
      return
    }
    if (!headBranch.trim()) {
      alert('Por favor, informe a branch de origem.')
      return
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const initialCommits: Commit[] = [
      {
        hash: 'a7b3c29',
        message: 'feat: criar hook useTranslation e prover contexto',
        author: 'Diego Santos <diego@example.com>',
        date: now
      },
      {
        hash: 'b1e4f92',
        message: 'docs: registrar termos de traducao em pt-BR e en-US',
        author: 'Diego Santos <diego@example.com>',
        date: now
      }
    ]

    const initialTimeline: TimelineEvent[] = [
      {
        type: 'creation',
        id: 't-creation',
        time: now,
        user: 'Diego Santos',
        text: `abriu este Pull Request ${isDraft ? 'como Draft (Rascunho)' : ''}`
      },
      {
        type: 'commit',
        id: 't-c1',
        time: now,
        user: 'Diego Santos',
        text: 'a7b3c29 feat: criar hook useTranslation e prover contexto'
      },
      {
        type: 'commit',
        id: 't-c2',
        time: now,
        user: 'Diego Santos',
        text: 'b1e4f92 docs: registrar termos de traducao em pt-BR e en-US'
      }
    ]

    setCommits(initialCommits)
    setTimeline(initialTimeline)
    setIsPrCreated(true)
    setIsMerged(false)
    setIsBranchDeleted(false)
    setCiStatus('none')
    setReviewStatus(isDraft ? 'none' : 'requested')
    setHasConflict(false)
    setActiveSubTab('conversation')

    if (isDraft) {
      setGuideMsg(
        'Pull Request criado como DRAFT! PRs em rascunho servem para mostrar trabalho em andamento. Eles não podem ser mesclados. Quando estiver pronto, clique em "Ready for review" (Pronto para Revisão) no mockup ou no painel de controle.'
      )
    } else {
      setGuideMsg(
        'Pull Request aberto! Agora, clique em "Executar Validação de CI" no painel de controle para rodar os testes de build/lint automatizados.'
      )
    }
  }

  // Simulator actions
  const handleReadyForReview = () => {
    setIsDraft(false)
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setTimeline(prev => [
      ...prev,
      {
        type: 'status-change',
        id: `t-ready-${Date.now()}`,
        time: now,
        user: 'Diego Santos',
        text: 'marcou o Pull Request como pronto para revisão (Ready for Review)',
        icon: '🟢'
      }
    ])
    setReviewStatus('requested')
    setGuideMsg(
      'O Pull Request agora está aberto para revisão! Próximo passo recomendado: clique em "Executar Validação de CI" para rodar as verificações automatizadas.'
    )
  }

  const handleRunCI = () => {
    if (ciStatus === 'passed') return
    setCiStatus('running')
    setGuideMsg('Executando testes automatizados (lint, TypeScript compiler, build)...')

    setTimeout(() => {
      setCiStatus('passed')
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setTimeline(prev => [
        ...prev,
        {
          type: 'status-change',
          id: `t-ci-${Date.now()}`,
          time: now,
          user: 'GitHub Actions CI',
          text: '✅ Todas as verificações passaram com sucesso (lint, build, tests)',
          icon: '✔'
        }
      ])
      setGuideMsg(
        'Checks verdes! Todas as validações automáticas passaram. Clique em "Solicitar Revisão Técnica (Code Review)" para simular o feedback da equipe.'
      )
    }, 1500)
  }

  const handleRequestReview = () => {
    if (reviewStatus === 'approved') return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    // If the user already pushed the fix commit (3 commits total), approve it.
    // Otherwise, request changes asking for tests.
    if (commits.length >= 3) {
      setReviewStatus('approved')
      setTimeline(prev => [
        ...prev,
        {
          type: 'review',
          id: `t-rev-approve-${Date.now()}`,
          time: now,
          user: 'Alex (Supervisor Técnico)',
          text: 'aprovou estas alterações',
          icon: '✅'
        },
        {
          type: 'comment',
          id: `t-comm-approve-${Date.now()}`,
          time: now,
          user: 'Alex (Supervisor Técnico)',
          text: 'Excelente! O commit de testes ficou ótimo e passou no CI. O código está limpo e atende 100% aos critérios da SPEC. Aprovado para merge!'
        }
      ])
      setGuideMsg(
        'Aprovado! O revisor deu "Approve" após verificar as correções. Com CI verde e aprovação, você está liberado para realizar o Merge no final do mockup!'
      )
    } else {
      setReviewStatus('commented')
      setTimeline(prev => [
        ...prev,
        {
          type: 'review',
          id: `t-rev-changes-${Date.now()}`,
          time: now,
          user: 'Alex (Supervisor Técnico)',
          text: 'solicitou alterações no código',
          icon: '⚠️'
        },
        {
          type: 'comment',
          id: `t-comm-changes-${Date.now()}`,
          time: now,
          user: 'Alex (Supervisor Técnico)',
          text: 'O código está bom, mas notei que falta cobrir o hook useTranslation com testes unitários. Por favor, adicione testes para garantir a estabilidade. Lembre-se: não crie um novo PR, envie as correções nesta mesma branch!'
        }
      ])
      setGuideMsg(
        'Alterações solicitadas! O revisor pediu testes unitários. Clique em "Adicionar Commit de Correção" no painel de controle para enviar essa modificação na mesma branch e atualizar o PR.'
      )
    }
  }

  const handleAddFixCommit = () => {
    if (commits.some(c => c.hash === 'c3f4e18')) {
      alert('Commit de correção já adicionado.')
      return
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newCommit: Commit = {
      hash: 'c3f4e18',
      message: 'test: adicionar testes unitários para useTranslation',
      author: 'Diego Santos <diego@example.com>',
      date: now
    }

    setCommits(prev => [...prev, newCommit])
    setTimeline(prev => [
      ...prev,
      {
        type: 'commit',
        id: `t-c3-${Date.now()}`,
        time: now,
        user: 'Diego Santos',
        text: 'c3f4e18 test: adicionar testes unitários para useTranslation'
      },
      {
        type: 'status-change',
        id: `t-push-${Date.now()}`,
        time: now,
        user: 'Diego Santos',
        text: 'enviou 1 novo commit de correção na mesma branch. O PR foi atualizado automaticamente.',
        icon: '🔄'
      }
    ])

    // When a new commit is pushed, CI resets to none to validate the new code!
    setCiStatus('none')
    setGuideMsg(
      'Novo commit enviado para o mesmo Pull Request! Note que os commits antigos continuam aqui e a aba "Files Changed" ganhou o arquivo de testes. Como o código mudou, as validações de CI foram resetadas. Clique em "Executar Validação de CI" novamente.'
    )
  }

  const handleToggleConflict = () => {
    setHasConflict(prev => !prev)
    if (!hasConflict) {
      setGuideMsg(
        'Conflito injetado! Isso acontece quando outro desenvolvedor alterou e mergeou linhas no mesmo arquivo na main. Note que o botão de merge foi desabilitado e um aviso vermelho apareceu. Clique em "Resolver Conflito" para simular a resolução local.'
      )
    } else {
      setGuideMsg('Conflito removido.')
    }
  }

  const handleResolveConflict = () => {
    if (!hasConflict) return
    setHasConflict(false)
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setTimeline(prev => [
      ...prev,
      {
        type: 'status-change',
        id: `t-conflict-resolved-${Date.now()}`,
        time: now,
        user: 'Diego Santos',
        text: 'resolveu conflito de mesclagem localmente e fez push da atualização',
        icon: '🛡️'
      }
    ])
    setGuideMsg(
      'Conflito resolvido com sucesso! Você fez checkout local na main, deu pull, mesclou na sua branch de feature, resolveu as linhas conflitantes, commitou e enviou o push. A mesclagem agora está liberada.'
    )
  }

  const handleMerge = () => {
    if (isDraft) return
    if (ciStatus !== 'passed') return
    if (reviewStatus !== 'approved') return
    if (hasConflict) return

    setIsMerged(true)
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setTimeline(prev => [
      ...prev,
      {
        type: 'merge',
        id: `t-merge-${Date.now()}`,
        time: now,
        user: 'Diego Santos',
        text: `mesclou com sucesso esta branch na main usando estratégia de ${
          mergeStrategy === 'squash' ? 'Squash e Merge' : 'Criar um Merge Commit'
        }`,
        icon: '💜'
      }
    ])
    setGuideMsg(
      'PR Mesclado com sucesso! Suas alterações agora fazem parte oficial da main. Para manter o repositório organizado, delete a branch de feature no final do painel do PR.'
    )
  }

  const handleDeleteBranch = () => {
    setIsBranchDeleted(true)
    setGuideMsg(
      'Branch de feature deletada! O ciclo de vida desse Pull Request está completo. Você pode clicar em "Reiniciar Simulador" para treinar novamente ou ler as seções de comparação conceitual abaixo.'
    )
  }

  const handleResetSimulator = () => {
    setIsPrCreated(false)
    setPrTitle('feat: adicionar suporte a internacionalizacao')
    setPrDescription(
      'Adiciona suporte basico a multi-idiomas usando arquivos JSON de traducao e um hook customizado. Refs #13, Spec SDD-005.'
    )
    setHeadBranch('feat/internacionalizacao')
    setIsDraft(false)
    setCommits([])
    setTimeline([])
    setCiStatus('none')
    setReviewStatus('none')
    setHasConflict(false)
    setIsMerged(false)
    setIsBranchDeleted(false)
    setGuideMsg(
      'Simulador reiniciado. Configure os dados do Pull Request ao lado e clique em "Criar Pull Request" para começar novamente.'
    )
  }

  // Mock Files Diff lists based on commits length
  const getMockFiles = (): MockFileDiff[] => {
    const files: MockFileDiff[] = [
      {
        filename: 'src/hooks/useTranslation.ts',
        additions: 15,
        deletions: 0,
        lines: [
          { text: '@@ -0,0 +1,15 @@', type: 'neutral' },
          { text: '+ import { useContext } from "react";', type: 'added' },
          { text: '+ import { TranslationContext } from "../context/TranslationContext";', type: 'added' },
          { text: '+', type: 'neutral' },
          { text: '+ export function useTranslation() {', type: 'added' },
          { text: '+   const context = useContext(TranslationContext);', type: 'added' },
          { text: '+   if (!context) {', type: 'added' },
          { text: '+     throw new Error("useTranslation must be used within Provider");', type: 'added' },
          { text: '+   }', type: 'neutral' },
          { text: '+   return {', type: 'added' },
          { text: '+     t: (key: string) => context.translations[key] || key,', type: 'added' },
          { text: '+     locale: context.locale,', type: 'added' },
          { text: '+     setLocale: context.setLocale', type: 'added' },
          { text: '+   };', type: 'added' },
          { text: '+ }', type: 'added' }
        ]
      },
      {
        filename: 'src/locales/pt-BR.json',
        additions: 5,
        deletions: 0,
        lines: [
          { text: '@@ -0,0 +1,5 @@', type: 'neutral' },
          { text: '+ {', type: 'added' },
          { text: '+   "welcome.title": "Bem-vindo ao Guia de Desenvolvimento",', type: 'added' },
          { text: '+   "welcome.subtitle": "Aprenda Git e GitHub na prática.",', type: 'added' },
          { text: '+   "nav.pull_requests": "Pull Requests"', type: 'added' },
          { text: '+ }', type: 'added' }
        ]
      }
    ]

    // If the correction commit was added
    if (commits.length >= 3) {
      files.push({
        filename: 'src/hooks/useTranslation.test.ts',
        additions: 12,
        deletions: 0,
        lines: [
          { text: '@@ -0,0 +1,12 @@', type: 'neutral' },
          { text: '+ import { renderHook } from "@testing-library/react-hooks";', type: 'added' },
          { text: '+ import { useTranslation } from "./useTranslation";', type: 'added' },
          { text: '+', type: 'neutral' },
          { text: '+ describe("useTranslation hook", () => {', type: 'added' },
          { text: '+   it("should return the correct translation key value", () => {', type: 'added' },
          { text: '+     const { result } = renderHook(() => useTranslation());', type: 'added' },
          { text: '+     expect(result.current.t("welcome.title")).toBe("Bem-vindo ao Guia de Desenvolvimento");', type: 'added' },
          { text: '+   });', type: 'added' },
          { text: '+ });', type: 'added' }
        ]
      })
    }

    // If conflict is injected, show conflict lines in pt-BR.json file
    if (hasConflict) {
      const ptBrIndex = files.findIndex(f => f.filename === 'src/locales/pt-BR.json')
      if (ptBrIndex !== -1) {
        files[ptBrIndex] = {
          filename: 'src/locales/pt-BR.json',
          additions: 12,
          deletions: 1,
          lines: [
            { text: '@@ -3,3 +3,12 @@', type: 'neutral' },
            { text: '    "welcome.subtitle": "Aprenda Git e GitHub na prática.",', type: 'neutral' },
            { text: '<<<<<<< HEAD (Sua branch de feature)', type: 'removed' },
            { text: '+   "nav.pull_requests": "Pull Requests"', type: 'added' },
            { text: '=======', type: 'neutral' },
            { text: '+   "nav.pull_requests": "Aba de Pull Requests no Menu"', type: 'added' },
            { text: '>>>>>>> main (Alterações remotas integradas)', type: 'removed' },
            { text: '  }', type: 'neutral' }
          ]
        }
      }
    }

    return files
  }

  return (
    <div className="pull-requests-page">
      {/* Hero Section */}
      <section className="pr-header">
        <h1 className="pr-title">Pull Requests (PRs)</h1>
        <p className="pr-subtitle">
          Entenda o mecanismo do GitHub pelo qual desenvolvedores propõem a inclusão de código de uma branch de feature
          para a branch principal, permitindo revisão cruzada, testes automáticos e integração segura.
        </p>
      </section>

      {/* Intro Cards Grid */}
      <section className="pr-intro-grid">
        <div className="card">
          <div className="card-icon">🌉</div>
          <h3 className="card-title">O que é um Pull Request?</h3>
          <p className="card-text">
            Um Pull Request **não é um comando do Git**, mas um **recurso de plataformas de colaboração** (como GitHub, GitLab ou Bitbucket).
            Ele funciona como uma ponte para propor que o histórico de commits de uma branch temporária (chamada **Head Branch**) 
            seja incorporado (puxado) para uma branch de destino estável (chamada **Base Branch**, como a `main`).
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🛡️</div>
          <h3 className="card-title">Por que usamos Pull Requests?</h3>
          <p className="card-text">
            Usar PRs impede alterações diretas e desprotegidas no ambiente de produção. Ele concentra em uma única tela:
            <br />
            • **Transparência**: Mostra exatamente quais arquivos foram criados, excluídos ou modificados.
            <br />
            • **Automação (CI)**: Executa checagens de build, lint e testes automáticos antes de permitir o merge.
            <br />
            • **Code Review**: Permite que colegas façam revisão cruzada, comentem linhas específicas e deem aprovação técnica.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🧬</div>
          <h3 className="card-title">A Regra do "Mesmo PR"</h3>
          <p className="card-text">
            **Uma das dúvidas mais comuns de iniciantes**: Se o revisor pedir modificações ou correções, **você não deve abrir um novo Pull Request**.
            Basta fazer as alterações na mesma branch localmente, realizar novos commits e fazer `git push`.
            O GitHub atualiza automaticamente o PR aberto com os novos commits e diffs!
          </p>
        </div>

        <div className="card">
          <div className="card-icon">⚙️</div>
          <h3 className="card-title">Mecanismos Essenciais</h3>
          <p className="card-text">
            • **Draft PR (Rascunho)**: Permite abrir o PR mais cedo para pedir feedback de design sem acionar alertas de revisão e sem liberar a mesclagem.
            <br />
            • **Checks**: Scripts automáticos configurados via CI/CD. Se falharem, o merge pode ser bloqueado.
            <br />
            • **Mergeability**: Verificação se a fusão é direta ou se existem **conflitos de mesclagem** a resolver.
          </p>
        </div>
      </section>

      {/* Interactive Diagram of the Flow */}
      <section className="pr-flow-container">
        <h2 className="pr-flow-title">
          <span>🔄</span> O Ciclo de Vida do Pull Request
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          O caminho estruturado que uma modificação de código percorre até se tornar parte do repositório principal:
        </p>
        <div className="pr-flow-scroll-wrapper">
          <div className="pr-flow-node highlight">
            <span className="node-step">Etapa 1</span>
            <span className="node-name">Issue & SPEC</span>
          </div>
          <span className="pr-flow-arrow">➔</span>
          
          <div className="pr-flow-node">
            <span className="node-step">Etapa 2</span>
            <span className="node-name">Feature Branch</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node">
            <span className="node-step">Etapa 3</span>
            <span className="node-name">Implementar & Commit</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node">
            <span className="node-step">Etapa 4</span>
            <span className="node-name">Push para o GitHub</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node highlight" style={{ borderColor: 'var(--brand-secondary)' }}>
            <span className="node-step">Etapa 5</span>
            <span className="node-name">Abertura de PR</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node">
            <span className="node-step">Etapa 6</span>
            <span className="node-name">Validação de CI (Tests)</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node">
            <span className="node-step">Etapa 7</span>
            <span className="node-name">Code Review</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node">
            <span className="node-step">Etapa 8</span>
            <span className="node-name">Correções (Se pedidas)</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="pr-flow-node highlight">
            <span className="node-step">Etapa 9</span>
            <span className="node-name">Approve & Merge</span>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="pr-simulator-container">
        <h2 className="pr-simulator-title">Simulador de Ciclo de Vida de Pull Request</h2>
        <p className="pr-simulator-subtitle">
          Crie um Pull Request e gerencie suas etapas (checks, revisões, novos commits e resolução de conflitos) de forma visual e guiada.
        </p>

        {/* Guide helper box */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '1rem 1.5rem',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          color: '#e0e7ff',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <div>
            <strong>Instruções do Simulador:</strong> {guideMsg}
          </div>
        </div>

        {!isPrCreated ? (
          /* Initial Configuration Form */
          <form className="simulator-setup-form" onSubmit={handleCreatePr}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Abrir um Pull Request
            </h3>
            
            <div className="form-group">
              <label>Título do PR *</label>
              <input
                type="text"
                className="form-input"
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                placeholder="Ex: feat: adicionar modulo de pull requests"
              />
            </div>

            <div className="form-group">
              <label>Descrição do PR</label>
              <textarea
                className="form-input"
                style={{ minHeight: '80px', resize: 'vertical' }}
                value={prDescription}
                onChange={(e) => setPrDescription(e.target.value)}
                placeholder="Explique o que esta alteração resolve e o contexto técnico."
              />
            </div>

            <div className="form-group">
              <label>Relação de Branches</label>
              <div className="branch-select-row">
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Base branch</span>
                  <input type="text" className="form-input branch-badge-input" value="main" disabled />
                </div>
                <span className="branch-arrow">➔</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Compare/Compare branch</span>
                  <input
                    type="text"
                    className="form-input branch-badge-input"
                    value={headBranch}
                    onChange={(e) => setHeadBranch(e.target.value)}
                    placeholder="Ex: feat/pull-requests"
                  />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <input
                type="checkbox"
                id="draft-checkbox"
                checked={isDraft}
                onChange={(e) => setIsDraft(e.target.checked)}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
              />
              <label htmlFor="draft-checkbox" style={{ margin: 0, cursor: 'pointer', fontSize: '0.9rem' }}>
                Criar como **Draft (Rascunho)**
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
              🚀 Criar Pull Request
            </button>
          </form>
        ) : (
          /* Live Mock PR Interface */
          <div>
            <div className="github-pr-mock">
              {/* Top Meta Info */}
              <div className="pr-mock-header">
                <div className="pr-mock-title-row">
                  <div>
                    <span className="pr-mock-title">{prTitle}</span>{' '}
                    <span className="pr-mock-id">#1</span>
                  </div>
                  {isMerged && (
                    <span className="pr-status-badge merged">
                      <span>🔮</span> Merged
                    </span>
                  )}
                  {!isMerged && isDraft && (
                    <span className="pr-status-badge draft">
                      <span>📝</span> Draft
                    </span>
                  )}
                  {!isMerged && !isDraft && (
                    <span className="pr-status-badge open">
                      <span>🟢</span> Open
                    </span>
                  )}
                </div>

                <div className="pr-mock-meta-row">
                  <span className="pr-branch-flow">
                    <span className="branch-ref">{headBranch}</span> 
                    <span style={{ color: 'var(--text-muted)' }}>into</span> 
                    <span className="branch-ref" style={{ color: '#4ade80' }}>main</span>
                  </span>
                  <span>•</span>
                  <span>Diego Santos quer integrar {commits.length} commits</span>
                </div>
              </div>

              {/* Sub-tabs menu */}
              <div className="pr-mock-tabs">
                <button
                  className={`pr-mock-tab-btn ${activeSubTab === 'conversation' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('conversation')}
                >
                  💬 Conversation <span className="tab-badge">{timeline.filter(t => t.type === 'comment' || t.type === 'review').length}</span>
                </button>
                <button
                  className={`pr-mock-tab-btn ${activeSubTab === 'commits' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('commits')}
                >
                  📁 Commits <span className="tab-badge">{commits.length}</span>
                </button>
                <button
                  className={`pr-mock-tab-btn ${activeSubTab === 'files' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('files')}
                >
                  📝 Files Changed <span className="tab-badge">{getMockFiles().length}</span>
                </button>
              </div>

              {/* Inner Tab contents */}
              <div className="pr-mock-content">
                
                {activeSubTab === 'conversation' && (
                  <div>
                    {/* PR Initial Description */}
                    <div className="pr-description-box">
                      <div className="description-header">
                        <div className="author-info">
                          <div className="avatar">DS</div>
                          <span>Diego Santos (Autor)</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>aberto hoje</span>
                      </div>
                      <div className="description-body">
                        {prDescription || '*Nenhuma descrição fornecida.*'}
                      </div>
                    </div>

                    {/* Timeline of events */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)', marginLeft: '1rem' }}>
                      {timeline.map((event) => (
                        <div key={event.id} style={{ display: 'flex', gap: '0.75rem', position: 'relative', marginLeft: '-1.75rem', alignItems: 'center' }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: event.type === 'commit' ? 'var(--bg-card)' : 'var(--bg-secondary)',
                            border: '2px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            color: 'white',
                            zIndex: 2
                          }}>
                            {event.type === 'commit' && '📌'}
                            {event.type === 'creation' && '🚀'}
                            {event.type === 'comment' && '💬'}
                            {event.type === 'review' && (event.icon || '👁️')}
                            {event.type === 'status-change' && (event.icon || '⚙️')}
                            {event.type === 'merge' && '🔮'}
                          </div>

                          <div style={{ flexGrow: 1, padding: event.type === 'comment' ? '0.75rem 1rem' : '0', background: event.type === 'comment' ? 'var(--bg-card)' : 'transparent', borderRadius: '6px', border: event.type === 'comment' ? '1px solid var(--border-color)' : 'none' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{event.user}</span>{' '}
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{event.text}</span>
                            <span style={{ float: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSubTab === 'commits' && (
                  <div className="commits-timeline">
                    {commits.map((c) => (
                      <div key={c.hash} className="commit-row-mock">
                        <div className="commit-info-mock">
                          <span className="commit-icon-mock">📁</span>
                          <div>
                            <div className="commit-message-mock">{c.message}</div>
                            <div className="commit-author-mock">{c.author} • {c.date}</div>
                          </div>
                        </div>
                        <span className="commit-hash-mock">{c.hash}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeSubTab === 'files' && (
                  <div className="files-changed-list">
                    {getMockFiles().map((file) => (
                      <div key={file.filename} className="file-diff-box">
                        <div className="file-diff-header">
                          📄 {file.filename} 
                          <span style={{ float: 'right', color: '#2ea043' }}>+{file.additions} lines</span>
                        </div>
                        <div className="file-diff-body">
                          {file.lines.map((line, idx) => (
                            <span key={idx} className={`diff-line ${line.type}`}>
                              {line.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Merge Section Footer */}
              <div className="pr-merge-section">
                <div className="merge-status-box">
                  <div className="merge-status-icon-container">
                    {isMerged ? (
                      <div className="merge-circle-icon merged">🔮</div>
                    ) : hasConflict ? (
                      <div className="merge-circle-icon error">❌</div>
                    ) : ciStatus === 'none' || ciStatus === 'running' ? (
                      <div className="merge-circle-icon pending">⏳</div>
                    ) : reviewStatus === 'none' || reviewStatus === 'requested' || reviewStatus === 'commented' ? (
                      <div className="merge-circle-icon pending">💬</div>
                    ) : isDraft ? (
                      <div className="merge-circle-icon pending">📝</div>
                    ) : (
                      <div className="merge-circle-icon success">✔</div>
                    )}
                  </div>

                  <div className="merge-status-details">
                    {/* Title and descriptions based on state */}
                    {isMerged ? (
                      <>
                        <h4 className="merge-status-title">Pull Request integrado e fechado!</h4>
                        <p className="merge-status-desc">
                          Os commits desta branch foram mesclados na main. Suas alterações foram consolidadas.
                        </p>
                        {!isBranchDeleted ? (
                          <button className="btn btn-secondary" onClick={handleDeleteBranch} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                            🗑️ Deletar branch {headBranch}
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', fontStyle: 'italic' }}>
                            Branch deletada com sucesso (limpeza de branches remotas).
                          </span>
                        )}
                      </>
                    ) : isDraft ? (
                      <>
                        <h4 className="merge-status-title">Este Pull Request está em modo Draft (Rascunho)</h4>
                        <p className="merge-status-desc" style={{ marginBottom: 0 }}>
                          PRs em rascunho impedem a fusão técnica. Marque-o como pronto para habilitar a revisão oficial e o merge.
                        </p>
                        <button className="btn btn-primary" onClick={handleReadyForReview} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', marginTop: '0.75rem' }}>
                          🟢 Ready for review
                        </button>
                      </>
                    ) : hasConflict ? (
                      <>
                        <h4 className="merge-status-title" style={{ color: '#ef4444' }}>Conflito de mesclagem detectado!</h4>
                        <p className="merge-status-desc" style={{ marginBottom: 0 }}>
                          Existem alterações conflitantes em <code>src/locales/pt-BR.json</code>. Resolva os conflitos antes de prosseguir com a mesclagem.
                        </p>
                      </>
                    ) : ciStatus === 'none' || ciStatus === 'running' ? (
                      <>
                        <h4 className="merge-status-title">Verificações de CI pendentes</h4>
                        <p className="merge-status-desc" style={{ marginBottom: 0 }}>
                          Aguarde ou execute as validações automatizadas de CI para validar se a build e o lint estão corretos.
                        </p>
                      </>
                    ) : reviewStatus === 'none' || reviewStatus === 'requested' || reviewStatus === 'commented' ? (
                      <>
                        <h4 className="merge-status-title">Aprovação técnica pendente</h4>
                        <p className="merge-status-desc" style={{ marginBottom: 0 }}>
                          Este repositório exige a revisão de um colega (Code Review) e aprovação técnica ("Approve") antes do merge.
                        </p>
                      </>
                    ) : (
                      <>
                        <h4 className="merge-status-title">Pronto para mesclagem!</h4>
                        <p className="merge-status-desc">
                          Todas as checagens automatizadas passaram e a alteração foi aprovada por um revisor humano.
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                          <button className="btn btn-primary" onClick={handleMerge}>
                            💜 Confirmar Merge ({mergeStrategy === 'squash' ? 'Squash & Merge' : 'Merge Commit'})
                          </button>
                          
                          <select
                            className="form-input"
                            style={{ width: 'auto', padding: '0.5rem', fontSize: '0.85rem' }}
                            value={mergeStrategy}
                            onChange={(e) => setMergeStrategy(e.target.value as 'merge-commit' | 'squash')}
                          >
                            <option value="squash">Squash and Merge</option>
                            <option value="merge-commit">Create a Merge Commit</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulator Control Panel */}
            <div className="simulator-control-panel">
              <h3 className="control-panel-title">🎛️ Painel de Controle do Simulador</h3>
              <div className="control-buttons-grid">
                <button
                  className="simulator-action-btn"
                  onClick={handleRunCI}
                  disabled={isMerged || isDraft || ciStatus === 'passed' || ciStatus === 'running'}
                >
                  ⚙️ {ciStatus === 'running' ? 'Validando CI...' : ciStatus === 'passed' ? 'CI Validado' : 'Validar CI'}
                </button>

                <button
                  className="simulator-action-btn"
                  onClick={handleRequestReview}
                  disabled={isMerged || isDraft || reviewStatus === 'approved'}
                >
                  👁️ Solicitar Code Review
                </button>

                <button
                  className="simulator-action-btn"
                  onClick={handleAddFixCommit}
                  disabled={isMerged || commits.some(c => c.hash === 'c3f4e18')}
                >
                  🔧 Adicionar Commit de Correção
                </button>

                <button
                  className="simulator-action-btn"
                  onClick={handleToggleConflict}
                  disabled={isMerged || isDraft}
                >
                  💥 {hasConflict ? 'Remover Conflito' : 'Injetar Conflito'}
                </button>

                {hasConflict && (
                  <button
                    className="simulator-action-btn"
                    onClick={handleResolveConflict}
                    style={{ borderColor: '#10b981', color: '#10b981' }}
                  >
                    🛡️ Resolver Conflito
                  </button>
                )}

                <button
                  className="simulator-action-btn"
                  onClick={handleResetSimulator}
                  style={{ marginLeft: 'auto', borderColor: '#ef4444', color: '#ef4444' }}
                >
                  🔄 Reiniciar Simulador
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Concept Comparison Section */}
      <section className="pr-merge-comparison">
        <h2 className="comparison-title">Estratégias de Integração (Merge)</h2>
        <div className="comparison-grid">
          
          <div className="comparison-card">
            <h3 className="comparison-card-title">Squash and Merge</h3>
            <p className="comparison-card-text">
              Condensa todos os commits da branch de feature em um **único commit** novo na main. 
              Garante um histórico limpo e linear na main, eliminando commits temporários ou de testes.
              <br />
              <strong style={{ color: '#ffd214' }}>Ideal para:</strong> Features isoladas ou branches curtas.
            </p>
            <div className="git-tree-mock">
              <span className="git-tree-line">main: A ➔ B ➔ <span className="commit-tag">C (feat total)</span> <span className="tag-main">[HEAD]</span></span>
              <span className="git-tree-line" style={{ textDecoration: 'line-through', opacity: 0.5 }}>feat: a1 ➔ a2 (descartados)</span>
            </div>
          </div>

          <div className="comparison-card">
            <h3 className="comparison-card-title">Create a Merge Commit</h3>
            <p className="comparison-card-text">
              Preserva todo o histórico de commits da branch de feature e insere um **commit de mesclagem** na main que aponta 
              para ambas as ramificações. Mantém a rastreabilidade completa.
              <br />
              <strong style={{ color: '#ffd214' }}>Ideal para:</strong> Projetos grandes onde o histórico interno da feature é relevante.
            </p>
            <div className="git-tree-mock">
              <span className="git-tree-line">main: A ➔ B ➔ ➔ ➔ ➔ <span className="commit-tag">Merge Commit</span> <span className="tag-main">[HEAD]</span></span>
              <span className="git-tree-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\➔ <span className="commit-tag">a1</span> ➔ <span className="commit-tag">a2</span> ➔/ (histórico mantido)</span>
            </div>
          </div>

          <div className="comparison-card">
            <h3 className="comparison-card-title">Rebase and Merge</h3>
            <p className="comparison-card-text">
              Reaplica cada commit individual da branch de feature diretamente no topo da main. 
              Diferente do Squash, mantém os commits individuais, mas reescreve a árvore sem criar um commit de merge.
              <br />
              <strong style={{ color: '#ffd214' }}>Ideal para:</strong> Manter histórico linear completo sem ramificações visuais.
            </p>
            <div className="git-tree-mock">
              <span className="git-tree-line">main: A ➔ B ➔ <span className="commit-tag">a1*</span> ➔ <span className="commit-tag">a2*</span> <span className="tag-main">[HEAD]</span></span>
              <span className="git-tree-line" style={{ color: 'var(--text-muted)' }}>* commits reaplicados linearmente</span>
            </div>
          </div>

        </div>
      </section>

      {/* Educational Footer Warnings */}
      <section style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>⚠️ Por que não devemos criar outro PR para correções?</h4>
        <p>
          Muitos desenvolvedores novatos fecham o PR anterior e abrem um novo quando recebem feedbacks como "falta testes" ou "corrija o lint".
          Isso é considerado uma **má prática** grave, pois apaga discussões anteriores, espalha o histórico e gera ruído nas ferramentas.
          A regra de ouro é: **Um PR representa um objetivo de produto. Mantenha os novos commits na mesma branch até atingi-lo.**
        </p>
      </section>
    </div>
  )
}
