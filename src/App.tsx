import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'roadmap' | 'methodology'>('welcome')

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          <span className="logo-text">Projeto Piloto BI</span>
          <span className="badge">Fase 0 — Fundação</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${activeTab === 'welcome' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('welcome')}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Início
          </button>
          <button 
            className={`btn ${activeTab === 'roadmap' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('roadmap')}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Roadmap
          </button>
          <button 
            className={`btn ${activeTab === 'methodology' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('methodology')}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Metodologia
          </button>
        </div>
      </header>

      {activeTab === 'welcome' && (
        <>
          <section className="hero-section">
            <h1 className="hero-title">Desenvolvimento Colaborativo com IA</h1>
            <p className="hero-subtitle">
              Um guia prático de desenvolvimento em equipe utilizando GitHub, agentes de inteligência artificial (Antigravity/Claude) e a metodologia Spec-Driven Development (SDD).
            </p>
            <div className="cta-group">
              <button className="btn btn-primary" onClick={() => setActiveTab('roadmap')}>
                Ver o Roadmap
              </button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('methodology')}>
                Conhecer a Metodologia
              </button>
            </div>
          </section>

          <section className="grid-section">
            <div className="card">
              <div className="card-icon">🚀</div>
              <h3 className="card-title">Bootstrap do Projeto</h3>
              <p className="card-text">
                Fundação técnica com React, TypeScript, Vite e ferramentas de lint, garantindo um ponto de partida consistente e limpo para todas as frentes de trabalho.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">🤖</div>
              <h3 className="card-title">Agentes de IA</h3>
              <p className="card-text">
                Implementação delegada a agentes autônomos de IA que atuam estritamente no escopo de branches e especificações autorizadas, garantindo foco e segurança.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3 className="card-title">Spec-Driven Development</h3>
              <p className="card-text">
                Todas as alterações no código começam com uma especificação clara (SDD) aprovada, reduzindo retrabalho e definindo critérios de aceitação rígidos.
              </p>
            </div>
          </section>

          <section className="workflow-section">
            <div className="section-header">
              <h2 className="section-title">O Ciclo de Engenharia</h2>
              <p className="section-subtitle">O fluxo sistemático pelo qual toda mudança chega à produção</p>
            </div>
            <div className="workflow-steps">
              <div className="step-node">
                <span className="step-number">1</span>
                <h4 className="step-name">Issue & SPEC</h4>
                <p className="step-desc">A ideia é documentada e detalhada em uma especificação técnica.</p>
              </div>
              <div className="step-node">
                <span className="step-number">2</span>
                <h4 className="step-name">Branch Isolada</h4>
                <p className="step-desc">O desenvolvimento ocorre exclusivamente em uma branch de feature dedicada.</p>
              </div>
              <div className="step-node">
                <span className="step-number">3</span>
                <h4 className="step-name">Testes & Lint</h4>
                <p className="step-desc">Validação automática local para garantir a estabilidade do código.</p>
              </div>
              <div className="step-node">
                <span className="step-number">4</span>
                <h4 className="step-name">Review & Merge</h4>
                <p className="step-desc">Revisão humana cruzada antes de integrar as alterações na main.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'roadmap' && (
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
      )}

      {activeTab === 'methodology' && (
        <section style={{ marginBottom: '4rem' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <h2 className="section-title">Spec-Driven Development (SDD)</h2>
            <p className="section-subtitle">O contrato que guia todas as nossas ações técnicas</p>
          </div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 className="card-title" style={{ color: 'var(--brand-secondary)', marginBottom: '1rem' }}>Os Princípios de Trabalho</h3>
            <p className="card-text" style={{ lineHeight: '1.8' }}>
              • <strong>Fronteiras Claras:</strong> O agente de IA nunca deve implementar por iniciativa própria além do que foi acordado na especificação.<br />
              • <strong>Preflight Obrigatório:</strong> Antes de modificar arquivos, o agente faz uma auditoria do estado do Git (branch, HEAD, modificações pendentes) e reporta ao desenvolvedor.<br />
              • <strong>Evidências Auditáveis:</strong> Ao final de cada rodada, o agente deve fornecer relatórios claros do diff, resultados de testes, comandos executados e confirmações de ações restritas (como não fazer merge ou deploy automático).<br />
              • <strong>Revisão Cruzada:</strong> Nenhuma alteração é integrada sem que o outro participante humano analise criticamente a SPEC, o código gerado e a aderência aos objetivos.
            </p>
          </div>
        </section>
      )}

      <footer>
        <p>Projeto Piloto BI — Diego & Alex — Desenvolvido com IA & SDD</p>
        <div className="footer-links">
          <a href="https://github.com/AlexBiudes/projetopilotoBI" target="_blank" className="footer-link">GitHub</a>
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setActiveTab('roadmap'); }}>Roadmap</a>
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setActiveTab('methodology'); }}>Metodologia</a>
        </div>
      </footer>
    </div>
  )
}

export default App
