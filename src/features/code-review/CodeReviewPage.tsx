import { useState } from 'react'
import './code-review.css'

interface DiffLine {
  num: number
  text: string
  type: 'added' | 'removed' | 'neutral'
}

interface InlineComment {
  id: string
  lineNum: number
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  user: string
  text: string
}

interface TimelineEvent {
  id: string
  user: string
  text: string
  time: string
  icon?: string
}

const BUGGY_DIFF: DiffLine[] = [
  { num: 1, text: 'export function calculateDiscount(price: any, discount: any) {', type: 'added' },
  { num: 2, text: '  // calcula desconto sem checar se valor é negativo', type: 'added' },
  { num: 3, text: '  const pct = discount / 100;', type: 'added' },
  { num: 4, text: '  let res = price - (price * pct);', type: 'added' },
  { num: 5, text: '  if (price > 1000) {', type: 'added' },
  { num: 6, text: '    res = res - 100; // desconto extra', type: 'added' },
  { num: 7, text: '  }', type: 'added' },
  { num: 8, text: '  return res;', type: 'added' },
  { num: 9, text: '}', type: 'added' }
]

const FIXED_DIFF: DiffLine[] = [
  { num: 1, text: 'export function calculateDiscount(price: number, discountPercentage: number): number {', type: 'added' },
  { num: 2, text: '  if (price < 0 || discountPercentage < 0) {', type: 'added' },
  { num: 3, text: '    throw new Error("Price and discount must be positive numbers");', type: 'added' },
  { num: 4, text: '  }', type: 'added' },
  { num: 5, text: '  const discountAmount = price * (discountPercentage / 100);', type: 'added' },
  { num: 6, text: '  let finalPrice = price - discountAmount;', type: 'added' },
  { num: 7, text: '  const VIP_THRESHOLD = 1000;', type: 'added' },
  { num: 8, text: '  const VIP_EXTRA_DISCOUNT = 100;', type: 'added' },
  { num: 9, text: '  if (price > VIP_THRESHOLD) {', type: 'added' },
  { num: 10, text: '    finalPrice -= VIP_EXTRA_DISCOUNT;', type: 'added' },
  { num: 11, text: '  }', type: 'added' },
  { num: 12, text: '  return finalPrice;', type: 'added' },
  { num: 13, text: '}', type: 'added' }
]

export default function CodeReviewPage() {
  // Simulator State
  const [prState, setPrState] = useState<'reviewing' | 'correcting' | 'corrected' | 'approved' | 'merged'>('reviewing')
  const [activeDiff, setActiveDiff] = useState<DiffLine[]>(BUGGY_DIFF)
  const [comments, setComments] = useState<InlineComment[]>([])
  const [editingLine, setEditingLine] = useState<number | null>(null)
  
  // Comment draft inputs
  const [commentText, setCommentText] = useState<string>('')
  const [commentSeverity, setCommentSeverity] = useState<'critical' | 'high' | 'medium' | 'low' | 'info'>('medium')
  
  // Review submission
  const [reviewType, setReviewType] = useState<'comment' | 'approve' | 'request-changes'>('comment')
  const [reviewMsg, setReviewMsg] = useState<string>('')

  // Timeline
  const nowStr = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      id: 't1',
      user: 'Diego Santos (Autor)',
      text: 'abriu o Pull Request #12: "feat: adicionar calculadora de descontos"',
      time: nowStr(),
      icon: '🚀'
    },
    {
      id: 't2',
      user: 'GitHub Actions CI',
      text: '✅ Todas as checagens automatizadas passaram (lint, build)',
      time: nowStr(),
      icon: '✔'
    }
  ])

  // Guide messages
  const [guideMsg, setGuideMsg] = useState<string>(
    'Você é o revisor técnico! Analise o código abaixo na calculadora de desconto e clique no botão "+" ao passar o mouse sobre a linha para adicionar comentários de revisão.'
  )

  const handleOpenCommentEditor = (lineNum: number) => {
    setEditingLine(lineNum)
    setCommentText('')
    setCommentSeverity('medium')
  }

  const handleSaveComment = () => {
    if (!commentText.trim()) return
    const newComment: InlineComment = {
      id: `c-${Date.now()}`,
      lineNum: editingLine!,
      severity: commentSeverity,
      user: 'Alex (Você - Revisor)',
      text: commentText
    }
    setComments(prev => [...prev, newComment])
    setEditingLine(null)
    setCommentText('')
    setGuideMsg(
      `Comentário inline adicionado na Linha ${editingLine} com severidade ${commentSeverity.toUpperCase()}. Continue analisando ou envie sua decisão no painel de revisão ao final da página.`
    )
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const now = nowStr()

    if (reviewType === 'approve') {
      // Check if there are critical comments that haven't been corrected yet
      const hasCriticalComments = comments.some(c => c.severity === 'critical' || c.severity === 'high')
      if (activeDiff === BUGGY_DIFF && (hasCriticalComments || comments.length === 0)) {
        alert(
          'Atenção: Não é recomendado dar "Approve" (Aprovar) se o código possui problemas críticos/altos não resolvidos, ou se você ainda não revisou os pontos fracos!'
        )
        return
      }

      setPrState('approved')
      setTimeline(prev => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          user: 'Alex (Você - Revisor)',
          text: 'aprovou estas alterações (Approve)',
          time: now,
          icon: '✅'
        }
      ])
      setGuideMsg(
        'PR Aprovado com sucesso! Agora o autor está liberado para fazer o merge. Clique em "Confirmar Merge" para integrar na main.'
      )
    } else if (reviewType === 'request-changes') {
      if (comments.length === 0) {
        alert('Por favor, adicione pelo menos um comentário no diff apontando o que precisa mudar antes de solicitar alterações.')
        return
      }

      setPrState('correcting')
      setTimeline(prev => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          user: 'Alex (Você - Revisor)',
          text: `solicitou alterações no código (Request Changes) com a nota: "${reviewMsg || 'Ajustar problemas descritos no diff.'}"`,
          time: now,
          icon: '⚠️'
        }
      ])
      setGuideMsg('Enviando solicitação de alterações... O autor está corrigindo os problemas locais.')

      // Simulate author correction push
      setTimeout(() => {
        setPrState('corrected')
        setActiveDiff(FIXED_DIFF)
        setTimeline(prev => [
          ...prev,
          {
            id: `t-fix-${Date.now()}`,
            user: 'Diego Santos (Autor)',
            text: 'enviou o commit de correção: "fix: adicionar validacoes, tipagem estrita e remover magic numbers" na mesma branch',
            time: nowStr(),
            icon: '🔄'
          }
        ])
        setGuideMsg(
          'O autor enviou correções! Note que o diff abaixo foi atualizado (a tipagem do price agora é number, há validações contra números negativos e constantes VIP_THRESHOLD). Re-analise o código e marque como "Approve" no painel final.'
        )
      }, 2500)
    } else {
      // Comment only
      setTimeline(prev => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          user: 'Alex (Você - Revisor)',
          text: `deixou comentários no PR: "${reviewMsg || 'Revisado.'}"`,
          time: now,
          icon: '💬'
        }
      ])
      setGuideMsg(
        'Revisão enviada como Comentário (Comment)! Os comentários inline foram registrados, mas a aprovação ou bloqueio não foram emitidos.'
      )
    }

    setReviewMsg('')
  }

  const handleMerge = () => {
    setPrState('merged')
    setTimeline(prev => [
      ...prev,
      {
        id: `t-merge-${Date.now()}`,
        user: 'Diego Santos (Autor)',
        text: 'mesclou o PR #12 na branch main (Squash & Merge)',
        time: nowStr(),
        icon: '🔮'
      }
    ])
    setGuideMsg('Pull Request mesclado com sucesso na branch main!')
  }

  const handleResetSimulator = () => {
    setPrState('reviewing')
    setActiveDiff(BUGGY_DIFF)
    setComments([])
    setEditingLine(null)
    setCommentText('')
    setReviewType('comment')
    setReviewMsg('')
    setTimeline([
      {
        id: 't1',
        user: 'Diego Santos (Autor)',
        text: 'abriu o Pull Request #12: "feat: adicionar calculadora de descontos"',
        time: nowStr(),
        icon: '🚀'
      },
      {
        id: 't2',
        user: 'GitHub Actions CI',
        text: '✅ Todas as checagens automatizadas passaram (lint, build)',
        time: nowStr(),
        icon: '✔'
      }
    ])
    setGuideMsg(
      'Simulador resetado. Analise o código inicial com bugs abaixo e adicione seus comentários de Code Review.'
    )
  }

  return (
    <div className="code-review-page">
      {/* Hero Section */}
      <section className="cr-header">
        <h1 className="cr-title">Code Review (Revisão de Código)</h1>
        <p className="cr-subtitle">
          Aprenda a inspecionar códigos de forma colaborativa, classificar severidades e fornecer feedbacks construtivos
          para garantir qualidade técnica antes da integração oficial.
        </p>
      </section>

      {/* Intro Cards Section */}
      <section className="pr-intro-grid">
        <div className="card">
          <div className="card-icon">👁️</div>
          <h3 className="card-title">O que é Code Review?</h3>
          <p className="card-text">
            É a prática em que desenvolvedores inspecionam o código escrito por seus pares.
            Não serve para buscar erros pessoais ou fazer julgamentos, mas para **garantir a saúde coletiva do software**, 
            compartilhar conhecimento sobre a arquitetura e blindar o produto contra falhas operacionais.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🧠</div>
          <h3 className="card-title">O que devemos revisar?</h3>
          <p className="card-text">
            Revisores devem analisar pontos específicos além do simples "funciona":
            <br />
            • **Corretude e SPEC**: O código resolve o problema e obedece os critérios de aceite estabelecidos?
            <br />
            • **Segurança**: Há vazamento de memória, loops infinitos, inputs sem validação ou credenciais expostas?
            <br />
            • **Manutenibilidade**: A lógica está legível ou é excessivamente complexa (código espaguete)?
          </p>
        </div>
      </section>

      {/* Severity Levels */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="comparison-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Níveis de Severidade no Review</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Para dar clareza e prioridade nas correções, os comentários técnicos de revisão de código costumam ser classificados
          em severidades explícitas:
        </p>
        <div className="severity-grid">
          
          <div className="severity-card critical">
            <h4 className="severity-card-title">🔴 Crítico</h4>
            <p className="severity-card-desc">
              **Bloqueia o PR.** Falha grave de segurança, erro de lógica que causará travamento no sistema ou vazamento de dados. Deve ser corrigido imediatamente.
            </p>
          </div>

          <div className="severity-card high">
            <h4 className="severity-card-title">🟠 Alto</h4>
            <p className="severity-card-desc">
              Bug funcional evidente, quebra de boas práticas fundamentais ou falha grave de performance que afeta o usuário final.
            </p>
          </div>

          <div className="severity-card medium">
            <h4 className="severity-card-title">🟡 Médio</h4>
            <p className="severity-card-desc">
              Falta de testes unitários para funções centrais, código duplicado desnecessário ou pequena incoerência em relação aos critérios da SPEC.
            </p>
          </div>

          <div className="severity-card low">
            <h4 className="severity-card-title">🔵 Baixo</h4>
            <p className="severity-card-desc">
              Problema estético menor, inconsistências de formatação, nomes de variáveis confusos ou falta de clareza nos comentários do código.
            </p>
          </div>

          <div className="severity-card info">
            <h4 className="severity-card-title">🟢 Info</h4>
            <p className="severity-card-desc">
              Sugestão opcional de melhoria futura, elogio a um trecho bem escrito ou indicação de padrão mais moderno aplicável (refatoração leve).
            </p>
          </div>

        </div>
      </section>

      {/* Sequential Flow */}
      <section className="cr-flow-container">
        <h2 className="cr-flow-title">
          <span>🔄</span> O Ciclo de Feedback no Code Review
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          A interação cíclica entre o revisor e o autor do Pull Request:
        </p>
        <div className="cr-flow-scroll-wrapper">
          <div className="cr-flow-node highlight">
            <span className="node-step">Etapa 1</span>
            <span className="node-name">PR Aberto</span>
          </div>
          <span className="cr-flow-arrow">➔</span>
          
          <div className="cr-flow-node">
            <span className="node-step">Etapa 2</span>
            <span className="node-name">Análise da SPEC</span>
          </div>
          <span className="cr-flow-arrow">➔</span>

          <div className="cr-flow-node">
            <span className="node-step">Etapa 3</span>
            <span className="node-name">Análise do Diff</span>
          </div>
          <span className="cr-flow-arrow">➔</span>

          <div className="cr-flow-node highlight" style={{ borderColor: 'var(--brand-secondary)' }}>
            <span className="node-step">Etapa 4</span>
            <span className="node-name">Comentários Inline</span>
          </div>
          <span className="pr-flow-arrow">➔</span>

          <div className="cr-flow-node">
            <span className="node-step">Etapa 5</span>
            <span className="node-name">Request Changes</span>
          </div>
          <span className="cr-flow-arrow">➔</span>

          <div className="cr-flow-node">
            <span className="node-step">Etapa 6</span>
            <span className="node-name">Autor Corrige local</span>
          </div>
          <span className="cr-flow-arrow">➔</span>

          <div className="cr-flow-node">
            <span className="node-step">Etapa 7</span>
            <span className="node-name">Push na branch</span>
          </div>
          <span className="cr-flow-arrow">➔</span>

          <div className="cr-flow-node highlight">
            <span className="node-step">Etapa 8</span>
            <span className="node-name">Re-revisão & Approve</span>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="cr-simulator-container">
        <h2 className="cr-simulator-title">Simulador de Revisão de Código</h2>
        <p className="cr-simulator-subtitle">
          Inspecione as alterações de código da calculadora, aponte problemas usando comentários inline com severidade, e conduza o ciclo de aprovação.
        </p>

        {/* Instructions helper box */}
        <div style={{
          background: 'rgba(168, 85, 247, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '1rem 1.5rem',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          color: '#f3e8ff',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <div>
            <strong>Instruções do Simulador:</strong> {guideMsg}
          </div>
        </div>

        {/* PR Review Dashboard mockup */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* PR Header */}
          <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 600 }}>feat: adicionar calculadora de descontos</span>{' '}
                <span style={{ color: 'var(--text-muted)', fontSize: '1.4rem', fontWeight: 300 }}>#12</span>
              </div>
              <span className={`pr-status-badge ${
                prState === 'approved' ? 'open' : prState === 'merged' ? 'merged' : 'open'
              }`}>
                {prState === 'merged' ? '🔮 Merged' : prState === 'approved' ? '🟢 Approved' : '🟢 Open'}
              </span>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Diego Santos quer integrar commits em <code>main</code> a partir de <code>feat/calculadora</code>
            </div>
          </div>

          {/* Diff Content Box */}
          <div style={{ padding: '2rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', justifySelf: 'start' }}>
              📄 Modificado: <code>src/utils/math.ts</code>
            </h4>

            {prState === 'correcting' ? (
              /* Correction loading simulator animation */
              <div style={{
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                color: 'var(--text-secondary)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(168, 85, 247, 0.1)',
                  borderTopColor: 'var(--brand-secondary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
                <span>O autor está corrigindo os problemas e rodando o git push...</span>
              </div>
            ) : (
              /* Live Interactive Code Diff */
              <div className="code-diff-container">
                <div className="diff-header">
                  <span>Visualização do Diff (Revisão Técnica)</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Clique em + para comentar na linha</span>
                </div>
                <div className="diff-grid">
                  {activeDiff.map((line) => {
                    const lineComments = comments.filter(c => c.lineNum === line.num)
                    
                    return (
                      <div key={line.num} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* The Code Line Row */}
                        <div className={`diff-row ${line.type}`}>
                          <div className="line-number">{line.num}</div>
                          
                          {prState === 'reviewing' && (
                            <button
                              className="add-comment-btn"
                              onClick={() => handleOpenCommentEditor(line.num)}
                              title="Adicionar comentário inline nesta linha"
                              type="button"
                            >
                              +
                            </button>
                          )}

                          <div className="code-content">{line.text}</div>
                        </div>

                        {/* Inline Comments on this Line */}
                        {lineComments.map((comment) => (
                          <div key={comment.id} className={`inline-comment-display ${comment.severity}`}>
                            <div className="comment-meta">
                              <div>
                                <span className="avatar" style={{ display: 'inline-flex', width: '20px', height: '20px', fontSize: '0.6rem', marginRight: '0.35rem' }}>RX</span>
                                <strong>{comment.user}</strong>
                                <span className={`comment-severity-tag ${comment.severity}`}>{comment.severity}</span>
                              </div>
                              <div>
                                <span>há pouco</span>
                                {prState === 'reviewing' && (
                                  <button
                                    className="btn-delete-comment"
                                    onClick={() => handleDeleteComment(comment.id)}
                                    title="Remover comentário"
                                  >
                                    🗑️ Excluir
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="comment-text">{comment.text}</div>
                          </div>
                        ))}

                        {/* Comment Editor on this Line */}
                        {editingLine === line.num && (
                          <div className="inline-comment-editor">
                            <label>Comentário do Revisor</label>
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Indique o problema encontrado e uma sugestão de código limpo."
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <label style={{ display: 'inline-block', marginRight: '0.5rem', margin: 0 }}>Severidade:</label>
                                <select
                                  value={commentSeverity}
                                  onChange={(e) => setCommentSeverity(e.target.value as 'critical' | 'high' | 'medium' | 'low' | 'info')}
                                >
                                  <option value="info">Info (Informativo)</option>
                                  <option value="low">Baixa</option>
                                  <option value="medium">Média</option>
                                  <option value="high">Alta</option>
                                  <option value="critical">Crítica</option>
                                </select>
                              </div>
                              <div className="inline-comment-actions">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
                                  onClick={() => setEditingLine(null)}
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
                                  onClick={handleSaveComment}
                                >
                                  Salvar
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Submission Section */}
            {prState !== 'correcting' && prState !== 'merged' && (
              <form className="review-submit-section" onSubmit={handleSubmitReview}>
                <h3 className="review-submit-title">Submeter Revisão Formal</h3>
                
                <div className="review-options-row">
                  
                  <div
                    className={`review-option-card ${reviewType === 'comment' ? 'selected' : ''}`}
                    onClick={() => setReviewType('comment')}
                  >
                    <div className="radio-circle">
                      {reviewType === 'comment' && <div className="radio-dot" />}
                    </div>
                    <div className="review-option-details">
                      <h4>Comment (Comentar)</h4>
                      <p>Enviar feedback geral ou notas sem aprovar nem bloquear.</p>
                    </div>
                  </div>

                  <div
                    className={`review-option-card ${reviewType === 'request-changes' ? 'selected' : ''}`}
                    onClick={() => setReviewType('request-changes')}
                  >
                    <div className="radio-circle">
                      {reviewType === 'request-changes' && <div className="radio-dot" />}
                    </div>
                    <div className="review-option-details">
                      <h4>Request Changes (Bloquear)</h4>
                      <p>Bloquear a integração. Exige correção de problemas apontados.</p>
                    </div>
                  </div>

                  <div
                    className={`review-option-card ${reviewType === 'approve' ? 'selected' : ''}`}
                    onClick={() => setReviewType('approve')}
                  >
                    <div className="radio-circle">
                      {reviewType === 'approve' && <div className="radio-dot" />}
                    </div>
                    <div className="review-option-details">
                      <h4>Approve (Aprovar)</h4>
                      <p>Autorizar a integração direta desta branch na main.</p>
                    </div>
                  </div>

                </div>

                <div className="form-group">
                  <label>Comentário da decisão (Opcional)</label>
                  <textarea
                    className="form-input"
                    style={{ minHeight: '60px' }}
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    placeholder="Resuma seu feedback de aprovação ou justificativa de bloqueio."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={prState === 'approved' && reviewType !== 'comment'}>
                  {reviewType === 'approve' ? '✅ Aprovar Pull Request' : reviewType === 'request-changes' ? '⚠️ Solicitar Alterações' : '💬 Enviar Comentários'}
                </button>
              </form>
            )}

            {/* Approved - Enable Merge */}
            {prState === 'approved' && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ color: '#4ade80', fontWeight: 700 }}>Aprovação Técnica Concedida</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                    O código foi aprovado para ser mesclado na main do projeto.
                  </p>
                </div>
                <button className="btn btn-primary" onClick={handleMerge}>
                  🔮 Confirmar Squash & Merge
                </button>
              </div>
            )}

            {/* Simulated timeline events logs */}
            <div className="sim-timeline">
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Histórico do PR</h4>
              {timeline.map((event) => (
                <div key={event.id} className="timeline-event-row">
                  <span>{event.icon || '📌'}</span>
                  <div style={{ flexGrow: 1 }}>
                    <span className="timeline-event-user">{event.user}</span>{' '}
                    <span>{event.text}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{event.time}</span>
                </div>
              ))}
            </div>

            {/* Reset button always visible for ease of retry */}
            {(prState === 'merged' || prState === 'approved' || prState === 'corrected') && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ borderColor: '#ef4444', color: '#ef4444', marginTop: '2rem', width: '100%' }}
                onClick={handleResetSimulator}
              >
                🔄 Reiniciar Simulador
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Educational Footer */}
      <section style={{
        padding: '1.5rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>⚠️ Regra de ouro da Revisão Cruzada</h4>
        <p>
          Em equipes de desenvolvimento e no nosso projeto piloto: **Quem escreve o código nunca aprova o seu próprio PR**. 
          A aprovação deve vir sempre de outro desenvolvedor ou do supervisor técnico. Isso evita vieses, assegura
          que mais de uma pessoa conheça a modificação e mantém uma barreira de qualidade consistente.
        </p>
      </section>
    </div>
  )
}
