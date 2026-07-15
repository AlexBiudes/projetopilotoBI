import { useState } from 'react'
import AppShell from './app/AppShell'
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import MethodologyPage from './pages/MethodologyPage'
import GithubFlowPage from './features/github-flow/GithubFlowPage'
import FundamentosGitPage from './features/fundamentos-git/FundamentosGitPage'
import BranchesPage from './features/branches/BranchesPage'

function App() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'roadmap' | 'methodology' | 'github-flow' | 'fundamentos-git' | 'branches'>('welcome')

  return (
    <AppShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'welcome' && <HomePage setActiveTab={setActiveTab} />}
      {activeTab === 'roadmap' && <RoadmapPage />}
      {activeTab === 'methodology' && <MethodologyPage />}
      {activeTab === 'github-flow' && <GithubFlowPage />}
      {activeTab === 'fundamentos-git' && <FundamentosGitPage />}
      {activeTab === 'branches' && <BranchesPage />}
    </AppShell>
  )
}

export default App
