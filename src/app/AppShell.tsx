import type { ReactNode } from 'react'

interface AppShellProps {
  activeTab: 'welcome' | 'roadmap' | 'methodology'
  setActiveTab: (tab: 'welcome' | 'roadmap' | 'methodology') => void
  children: ReactNode
}

export default function AppShell({ activeTab, setActiveTab, children }: AppShellProps) {
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

      <main>
        {children}
      </main>

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
