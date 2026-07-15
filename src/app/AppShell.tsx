import type { ReactNode } from 'react'

interface AppShellProps {
  activeTab: 'welcome' | 'roadmap' | 'methodology' | 'github-flow' | 'fundamentos-git' | 'commits'
  setActiveTab: (tab: 'welcome' | 'roadmap' | 'methodology' | 'github-flow' | 'fundamentos-git' | 'commits') => void
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
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
          <button
            className={`btn ${activeTab === 'github-flow' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('github-flow')}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            GitHub Flow
          </button>
          <button
            className={`btn ${activeTab === 'fundamentos-git' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('fundamentos-git')}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Fundamentos de Git
          </button>
          <button
            className={`btn ${activeTab === 'commits' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('commits')}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            Commits
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
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setActiveTab('github-flow'); }}>GitHub Flow</a>
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setActiveTab('commits'); }}>Commits</a>
        </div>
      </footer>
    </div>
  )
}
