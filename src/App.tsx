import { useState } from 'react'
import AppShell from './app/AppShell'
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import MethodologyPage from './pages/MethodologyPage'
import FundamentosGitPage from './features/fundamentos-git/FundamentosGitPage'

function App() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'roadmap' | 'methodology' | 'fundamentos-git'>('welcome')

  return (
    <AppShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'welcome' && <HomePage setActiveTab={setActiveTab} />}
      {activeTab === 'roadmap' && <RoadmapPage />}
      {activeTab === 'methodology' && <MethodologyPage />}
      {activeTab === 'fundamentos-git' && <FundamentosGitPage />}
    </AppShell>
  )
}

export default App
