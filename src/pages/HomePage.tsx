interface HomePageProps {
  setActiveTab: (tab: 'welcome' | 'roadmap' | 'methodology' | 'fundamentos-git') => void;
}

export default function HomePage({ setActiveTab }: HomePageProps) {
  return (
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
  )
}
