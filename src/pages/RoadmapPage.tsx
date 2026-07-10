export default function RoadmapPage() {
  return (
    <section style={{ marginBottom: '4rem' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2 className="section-title">Roadmap de Desenvolvimento</h2>
        <p className="section-subtitle">Próximas fases planejadas para o laboratório</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--brand-primary)' }}>
          <h3 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Fase 0 — Fundação do Laboratório</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--brand-primary)' }}>Concluído (Esta Etapa)</span>
          </h3>
          <p className="card-text">
            Criação da estrutura React+Vite, configuração de ESLint, diretrizes de governança (CONTRIBUTING, templates de PR/Issue) e validações iniciais de build.
          </p>
        </div>
        <div className="card">
          <h3 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Fase 1 — Desenvolvimento Paralelo Inicial</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pendente</span>
          </h3>
          <p className="card-text">
            <strong>Frente A (Diego):</strong> Feature de Fundamentos do Git (working tree, staging, commits).<br />
            <strong>Frente B (Alex):</strong> Feature de GitHub Flow (Issues, branches, pull requests, merge).
          </p>
        </div>
        <div className="card">
          <h3 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Fase 2 — Expansão & Review Cruzado</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pendente</span>
          </h3>
          <p className="card-text">
            Criação das visões detalhadas sobre Branches, Commits, Pull Requests e Code Review com revisão técnica obrigatória entre Diego e Alex.
          </p>
        </div>
        <div className="card">
          <h3 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Fase 3 — Conflito Controlado</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pendente</span>
          </h3>
          <p className="card-text">
            Simulação proposital de conflito em arquivo compartilhado para aprendizado prático de resolução e sincronização git.
          </p>
        </div>
      </div>
    </section>
  )
}
