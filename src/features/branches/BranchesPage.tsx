import { useState, useRef, useEffect } from 'react'
import type { ReactElement } from 'react'
import './branches.css'

interface Commit {
  id: string;
  message: string;
  branch: string;
  parent: string | null;
  parent2?: string | null;
  x: number;
  y: number;
  isMerge?: boolean;
}

interface BranchPointers {
  [key: string]: string;
}

interface ScenarioStep {
  id: number;
  description: string;
  check: (state: {
    commits: Commit[];
    activeBranch: string;
    branchPointers: BranchPointers;
  }) => boolean;
}

const COMMANDS = [
  {
    name: 'git branch',
    desc: 'Lista as branches locais do projeto. A branch ativa terá um asterisco (*) verde ao lado.',
    code: '$ git branch\n* main\n  feat/fundamentos-git'
  },
  {
    name: 'git switch -c <nome>',
    desc: 'Cria uma nova branch com o nome especificado e muda imediatamente para ela.',
    code: '$ git switch -c feat/branches\nSwitched to a new branch \'feat/branches\''
  },
  {
    name: 'git switch <nome>',
    desc: 'Troca de branch, mudando seu espaço de trabalho (working tree) para a branch desejada.',
    code: '$ git switch main\nSwitched to branch \'main\''
  },
  {
    name: 'git checkout <nome>',
    desc: 'Comando legado para trocar de branch (substituído pelo git switch no Git 2.23+), ou restaurar arquivos.',
    code: '$ git checkout main\nSwitched to branch \'main\''
  },
  {
    name: 'git push -u origin <nome>',
    desc: 'Envia a branch local para o repositório remoto (GitHub) pela primeira vez e configura o rastreamento.',
    code: '$ git push -u origin feat/branches\nBranch \'feat/branches\' set up to track remote branch from \'origin\'.'
  },
  {
    name: 'git branch -d <nome>',
    desc: 'Exclui uma branch local que já foi mergeada e integrada na branch principal.',
    code: '$ git branch -d feat/branches\nDeleted branch feat/branches (was 4b8d7a1).'
  }
];

const SCENARIO_STEPS: ScenarioStep[] = [
  {
    id: 1,
    description: 'Crie uma nova branch chamada "feat/artigo" usando o comando ou o painel de criação.',
    check: (state) => Object.keys(state.branchPointers).includes('feat/artigo')
  },
  {
    id: 2,
    description: 'Mude para a branch "feat/artigo" (caso já não esteja nela) e faça pelo menos um commit.',
    check: (state) => state.commits.some(c => c.branch === 'feat/artigo') && state.activeBranch === 'feat/artigo'
  },
  {
    id: 3,
    description: 'Volte para a branch "main" (git switch main) para simular que você precisa fazer um ajuste nela.',
    check: (state) => state.activeBranch === 'main' && state.commits.some(c => c.branch === 'feat/artigo')
  },
  {
    id: 4,
    description: 'Com a branch "main" ativa, faça um commit para simular um hotfix ou alteração paralela na main.',
    check: (state) => {
      const artCommits = state.commits.filter(c => c.branch === 'feat/artigo');
      const mainCommitsAfterArt = state.commits.filter(c => c.branch === 'main' && artCommits.length > 0 && c.parent !== null);
      // Verify if main advanced after the branch was created
      return state.activeBranch === 'main' && mainCommitsAfterArt.length > 1;
    }
  },
  {
    id: 5,
    description: 'Mescle a branch "feat/artigo" de volta na "main" (git merge feat/artigo) simulando a conclusão do PR.',
    check: (state) => state.commits.some(c => c.isMerge && c.branch === 'main' && (c.parent2 !== null && state.commits.find(x => x.id === c.parent2)?.branch === 'feat/artigo'))
  }
];

export default function BranchesPage() {
  // Simulator Initial State
  const initialCommits: Commit[] = [
    { id: 'c1a2b3d', message: 'Initial commit', branch: 'main', parent: null, x: 80, y: 70 },
    { id: 'f8e7d6c', message: 'feat: adicionar pagina inicial', branch: 'main', parent: 'c1a2b3d', x: 200, y: 70 },
  ];

  const [commits, setCommits] = useState<Commit[]>(initialCommits);
  const [branches, setBranches] = useState<string[]>(['main']);
  const [activeBranch, setActiveBranch] = useState<string>('main');
  const [branchPointers, setBranchPointers] = useState<BranchPointers>({ main: 'f8e7d6c' });
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Git Branch Simulator v1.0',
    'Repositório local inicializado na branch main.',
    'Digite ou use os botões ao lado para executar comandos Git.',
    ''
  ]);

  // Form Inputs
  const [newBranchName, setNewBranchName] = useState<string>('');
  const [commitMsg, setCommitMsg] = useState<string>('');
  const [selectedMergeBranch, setSelectedMergeBranch] = useState<string>('');

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => [...prev, line]);
  };

  const getBranchTrackY = (branchName: string) => {
    if (branchName === 'main') return 70;
    // Feature branches sit on the lower track
    return 170;
  };

  // Helper to generate fake hash
  const generateHash = () => {
    return Math.random().toString(16).substring(2, 9);
  };

  // Committing Action
  const handleCommit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg = commitMsg.trim() || `feat: alteracao em ${activeBranch}`;
    const parentId = branchPointers[activeBranch];
    const newId = generateHash();
    
    // Position calculation
    const maxBranchX = commits
      .filter(c => c.branch === activeBranch || c.id === parentId)
      .reduce((max, c) => Math.max(max, c.x), 0);
    
    const overallMaxX = commits.reduce((max, c) => Math.max(max, c.x), 0);
    const newX = Math.max(maxBranchX + 120, overallMaxX + 80);

    const newCommit: Commit = {
      id: newId,
      message: msg,
      branch: activeBranch,
      parent: parentId,
      x: newX,
      y: getBranchTrackY(activeBranch)
    };

    setCommits(prev => [...prev, newCommit]);
    setBranchPointers(prev => ({ ...prev, [activeBranch]: newId }));
    setCommitMsg('');
    
    addTerminalLine(`$ git commit -m "${msg}"`);
    addTerminalLine(`[${activeBranch} ${newId}] ${msg}`);
    addTerminalLine(` 1 file changed, 10 insertions(+)`);
    addTerminalLine('');
  };

  // Creating Branch Action
  const handleCreateBranch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const name = newBranchName.trim().replace(/\s+/g, '-').toLowerCase();
    
    if (!name) {
      addTerminalLine('Erro: O nome da branch não pode ser vazio.');
      addTerminalLine('');
      return;
    }

    if (branches.includes(name)) {
      addTerminalLine(`Erro: A branch "${name}" já existe.`);
      addTerminalLine('');
      return;
    }

    // Naming convention warning (soft check)
    const validPrefixes = ['feat/', 'fix/', 'docs/', 'test/', 'refactor/', 'chore/'];
    const hasValidPrefix = validPrefixes.some(prefix => name.startsWith(prefix));
    
    setBranches(prev => [...prev, name]);
    const currentCommitId = branchPointers[activeBranch];
    setBranchPointers(prev => ({ ...prev, [name]: currentCommitId }));
    
    // Automatically switch
    setActiveBranch(name);
    setNewBranchName('');
    
    addTerminalLine(`$ git switch -c ${name}`);
    addTerminalLine(`Switched to a new branch '${name}'`);
    if (!hasValidPrefix) {
      addTerminalLine(`Aviso: O nome '${name}' não usa prefixos recomendados (ex: feat/, fix/).`);
    }
    addTerminalLine('');
  };

  // Switching Branch Action
  const handleSwitchBranch = (name: string) => {
    if (name === activeBranch) return;
    setActiveBranch(name);
    addTerminalLine(`$ git switch ${name}`);
    addTerminalLine(`Switched to branch '${name}'`);
    addTerminalLine('');
  };

  // Merging Action
  const handleMerge = () => {
    if (!selectedMergeBranch || selectedMergeBranch === activeBranch) {
      addTerminalLine('Erro: Selecione uma branch diferente para mesclar.');
      addTerminalLine('');
      return;
    }

    const sourceCommitId = branchPointers[selectedMergeBranch];
    const targetCommitId = branchPointers[activeBranch];

    if (sourceCommitId === targetCommitId) {
      addTerminalLine(`$ git merge ${selectedMergeBranch}`);
      addTerminalLine('Already up to date.');
      addTerminalLine('');
      return;
    }

    // Create a Merge Commit
    const newId = generateHash();
    const overallMaxX = commits.reduce((max, c) => Math.max(max, c.x), 0);
    const newX = overallMaxX + 120;
    const msg = `Merge branch '${selectedMergeBranch}' into ${activeBranch}`;

    const mergeCommit: Commit = {
      id: newId,
      message: msg,
      branch: activeBranch,
      parent: targetCommitId,
      parent2: sourceCommitId,
      x: newX,
      y: getBranchTrackY(activeBranch),
      isMerge: true
    };

    setCommits(prev => [...prev, mergeCommit]);
    setBranchPointers(prev => ({ ...prev, [activeBranch]: newId }));
    
    addTerminalLine(`$ git merge ${selectedMergeBranch}`);
    addTerminalLine(`Merge made by the 'ort' strategy.`);
    addTerminalLine(` ${selectedMergeBranch} | 2 +`);
    addTerminalLine(` 1 file changed, 2 insertions(+)`);
    addTerminalLine(`Create merge commit ${newId}`);
    addTerminalLine('');
    setSelectedMergeBranch('');
  };

  // Reset Simulator
  const handleReset = () => {
    setCommits(initialCommits);
    setBranches(['main']);
    setActiveBranch('main');
    setBranchPointers({ main: 'f8e7d6c' });
    setTerminalLines([
      'Simulator resetado.',
      'Repositório local reinicializado na branch main.',
      ''
    ]);
  };

  // Generate SVG lines between commits
  const renderConnections = () => {
    return commits.map(commit => {
      const paths: ReactElement[] = [];

      // First parent connection
      if (commit.parent) {
        const parent = commits.find(c => c.id === commit.parent);
        if (parent) {
          // Smooth Bezier Curve representation
          const d = `M ${parent.x} ${parent.y} C ${(parent.x + commit.x) / 2} ${parent.y}, ${(parent.x + commit.x) / 2} ${commit.y}, ${commit.x} ${commit.y}`;
          paths.push(
            <path
              key={`p1-${commit.id}`}
              d={d}
              fill="none"
              stroke={commit.branch === 'main' ? '#10b981' : '#6366f1'}
              strokeWidth="3"
              strokeDasharray={parent.branch !== commit.branch ? '4,4' : 'none'}
              opacity="0.8"
            />
          );
        }
      }

      // Second parent connection (for merge commits)
      if (commit.parent2) {
        const parent2 = commits.find(c => c.id === commit.parent2);
        if (parent2) {
          const d = `M ${parent2.x} ${parent2.y} C ${(parent2.x + commit.x) / 2} ${parent2.y}, ${(parent2.x + commit.x) / 2} ${commit.y}, ${commit.x} ${commit.y}`;
          paths.push(
            <path
              key={`p2-${commit.id}`}
              d={d}
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeDasharray="4,4"
              opacity="0.8"
            />
          );
        }
      }

      return paths;
    }).flat();
  };

  // Get active scenario step
  const getScenarioStepStatus = (step: ScenarioStep) => {
    const currentState = { commits, activeBranch, branchPointers };
    return step.check(currentState);
  };

  return (
    <div className="branches-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Branches (Ramificações)</h1>
        <p className="hero-subtitle">
          Descubra como trabalhar em múltiplos recursos de forma isolada e paralela,
          mantendo a linha de produção (main) do seu projeto sempre segura.
        </p>
      </div>

      {/* Intro Concepts Grid */}
      <section className="branches-intro-grid">
        <div className="card">
          <div className="card-icon">🌿</div>
          <h3 className="card-title">O que é uma Branch?</h3>
          <p className="card-text">
            Uma branch no Git representa uma <strong>linha de desenvolvimento independente</strong>. 
            É essencialmente um ponteiro móvel que aponta para um commit específico. Ao criar uma branch, 
            você "ramifica" o histórico, permitindo que você experimente ou crie novas funcionalidades 
            sem interferir no código dos outros integrantes da equipe.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🛡️</div>
          <h3 className="card-title">A Branch Principal (main)</h3>
          <p className="card-text">
            Todo repositório possui uma branch principal padrão, geralmente chamada de <code>main</code> (antigamente <code>master</code>). 
            Esta branch representa o código oficial integrado e estável. Por boas práticas de engenharia de software, 
            <strong>nunca devemos programar ou fazer commit diretamente na main</strong>, pois isso pode introduzir bugs e impedir 
            que outras pessoas trabalhem em paralelo.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🛠️</div>
          <h3 className="card-title">Feature Branches</h3>
          <p className="card-text">
            Quando você vai criar uma funcionalidade, corrigir um bug ou atualizar documentações, você cria uma 
            <strong>feature branch</strong> (ex: <code>feat/tela-login</code>) partindo do estado mais atual da <code>main</code>. 
            Todas as suas alterações ficam guardadas ali. Quando o trabalho estiver concluído, testado e aprovado, 
            essa branch é unida (merged) de volta à branch principal.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🔀</div>
          <h3 className="card-title">Isolamento de Trabalho</h3>
          <p className="card-text">
            O maior benefício das branches é o <strong>isolamento completo</strong>. Se Diego e Alex estiverem no mesmo projeto, 
            Diego pode criar a branch <code>feat/botoes</code> e Alex a branch <code>feat/formularios</code>. Um não vê as alterações 
            do outro até que ocorra a integração no GitHub. Isso previne bugs acidentais e facilita a revisão de código.
          </p>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="simulator-container">
        <div className="section-header">
          <h2 className="section-title">Git Branch Simulator</h2>
          <p className="section-subtitle">Experimente criar, alternar e mesclar branches no painel interativo abaixo</p>
        </div>

        <div className="simulator-layout">
          {/* Controls Panel */}
          <div className="simulator-controls">
            {/* Create Branch */}
            <form onSubmit={handleCreateBranch} className="control-group">
              <label className="control-label">Criar Branch</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="ex: feat/artigo"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  className="control-input"
                  style={{ flexGrow: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  Criar
                </button>
              </div>
            </form>

            {/* Commit Form */}
            <form onSubmit={handleCommit} className="control-group">
              <label className="control-label">Fazer Commit</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Mensagem do commit"
                  value={commitMsg}
                  onChange={(e) => setCommitMsg(e.target.value)}
                  className="control-input"
                  style={{ flexGrow: 1 }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  Commit
                </button>
              </div>
            </form>

            {/* Active Branch Select / Switch */}
            <div className="control-group">
              <label className="control-label">Branch Ativa</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {branches.map(b => (
                  <button
                    key={b}
                    onClick={() => handleSwitchBranch(b)}
                    className={`btn ${activeBranch === b ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px' }}
                  >
                    {activeBranch === b ? `* ${b}` : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Merge Control */}
            <div className="control-group">
              <label className="control-label">Mesclar (Merge) na branch ativa</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  value={selectedMergeBranch}
                  onChange={(e) => setSelectedMergeBranch(e.target.value)}
                  className="control-input"
                  style={{ flexGrow: 1, padding: '0.4rem 0.5rem', fontSize: '0.85rem' }}
                >
                  <option value="">Selecione branch...</option>
                  {branches
                    .filter(b => b !== activeBranch)
                    .map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))
                  }
                </select>
                <button onClick={handleMerge} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  Merge
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="simulator-actions-grid" style={{ marginTop: '0.5rem' }}>
              <button onClick={handleReset} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}>
                Reiniciar Simulador
              </button>
            </div>
          </div>

          {/* Graph Visual Panel */}
          <div className="simulator-graph-panel">
            <div className="graph-header">
              <div className="graph-status-badge">
                <span className="status-indicator"></span>
                <span>Branch ativa: <strong>{activeBranch}</strong></span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mova o mouse sobre os commits para ver os detalhes</span>
            </div>

            <div className="graph-scroll-container">
              <div className="graph-svg-wrapper">
                {/* SVG Connections Canvas */}
                <svg className="graph-svg-canvas">
                  {renderConnections()}
                </svg>

                {/* DOM elements for nodes and pointers */}
                <div className="graph-nodes-layer">
                  {commits.map(commit => {
                    const isPointer = Object.entries(branchPointers).filter(([, hash]) => hash === commit.id);
                    const isActive = commits[commits.length - 1].id === commit.id;

                    return (
                      <div
                        key={commit.id}
                        className={`commit-node ${isActive ? 'active' : ''}`}
                        style={{ left: `${commit.x}px`, top: `${commit.y}px` }}
                      >
                        <div
                          className="commit-dot"
                          style={{
                            backgroundColor: commit.branch === 'main' ? '#10b981' : '#6366f1',
                            borderColor: commit.id === branchPointers[activeBranch] ? '#fff' : 'var(--border-color)'
                          }}
                        >
                          c
                        </div>
                        <span className="commit-hash">{commit.id}</span>

                        {/* Tooltip */}
                        <div className="commit-tooltip">
                          <p className="commit-tooltip-msg">{commit.message}</p>
                          <span className="commit-tooltip-branch">Branch: {commit.branch}</span>
                        </div>

                        {/* Branch pointers labeling */}
                        {isPointer.map(([branchName]) => (
                          <div
                            key={branchName}
                            className={`branch-label ${branchName === 'main' ? 'branch-main-label' : 'branch-feat-label'}`}
                            style={{
                              transform: 'translate(-50%, -100%)',
                              marginTop: '-32px',
                              zIndex: activeBranch === branchName ? 5 : 2,
                              opacity: activeBranch === branchName ? 1 : 0.8,
                              border: activeBranch === branchName ? '1.5px solid white' : '1px solid rgba(255,255,255,0.2)'
                            }}
                          >
                            {activeBranch === branchName ? `* ${branchName}` : branchName}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Terminal Console Panel */}
            <div className="simulator-terminal">
              {terminalLines.map((line, idx) => (
                <div key={idx} className="terminal-line">
                  {line.startsWith('$') ? (
                    <span>
                      <span className="terminal-prompt">user@git-learning:~/projeto</span> {line}
                    </span>
                  ) : line.includes('Erro') ? (
                    <span className="terminal-warning">{line}</span>
                  ) : line.includes('Switched') || line.includes('commit') ? (
                    <span className="terminal-success">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="simulator-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#10b981' }}></span>
            <span>Commits na branch <strong>main</strong></span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#6366f1' }}></span>
            <span>Commits nas branches de <strong>feature</strong></span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#a855f7' }}></span>
            <span>Conexões de <strong>Merge</strong></span>
          </div>
          <div className="legend-item">
            <span style={{ fontSize: '1rem' }}>⬜</span>
            <span>Destaque de borda branca indica o <strong>HEAD</strong> da branch ativa</span>
          </div>
        </div>

        {/* Guided Exercise Section */}
        <div className="scenario-box">
          <h3 className="scenario-title">🎓 Exercício Guiado: Pratique o Fluxo Paralelo</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            O Git brilha quando fazemos alterações em paralelo e as integramos com merge. Siga os passos abaixo
            no simulador para entender o ciclo prático:
          </p>
          <div className="scenario-steps">
            {SCENARIO_STEPS.map((step) => {
              const isCompleted = getScenarioStepStatus(step);
              return (
                <div key={step.id} className={`scenario-step ${isCompleted ? 'completed' : ''}`}>
                  <span>{isCompleted ? '✅' : '⚫'} <strong>Passo {step.id}:</strong> {step.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local x Remote Branches Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h2 className="section-title">Branches Locais x Remotas</h2>
          <p className="section-subtitle">Entenda o sincronismo entre sua máquina e o GitHub</p>
        </div>
        <div className="card">
          <p className="card-text" style={{ marginBottom: '1rem' }}>
            Quando você cria uma branch local (usando <code>git switch -c feat/minha-feature</code>), ela existe 
            <strong>apenas no seu computador</strong>. Para que seus colegas de equipe consigam ver seu trabalho 
            e revisar seu código no GitHub, você precisa enviar a branch para o servidor remoto.
          </p>
          <p className="card-text" style={{ marginBottom: '1rem' }}>
            Esse envio é feito com o comando:
          </p>
          <pre className="branches-code-block">$ git push -u origin feat/minha-feature</pre>
          <p className="card-text" style={{ marginTop: '1rem' }}>
            O parâmetro <code>-u origin</code> (upstream) estabelece um vínculo permanente entre sua branch local e 
            a remota. Nos próximos envios, basta digitar <code>git push</code> enquanto estiver nela. 
            Uma vez no GitHub, a branch remota serve de base para a criação do <strong>Pull Request</strong>.
          </p>
        </div>
      </section>

      {/* Naming Conventions */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h2 className="section-title">Convenções de Nomes e Boas Práticas</h2>
          <p className="section-subtitle">Padronização de branches segundo o CONTRIBUTING.md do projeto</p>
        </div>
        <div className="branches-intro-grid">
          <div className="card">
            <h3 className="card-title">Prefixos Obrigatórios</h3>
            <p className="card-text" style={{ lineHeight: '1.8' }}>
              Para manter o repositório legível, organizamos branches usando prefixos seguidos de barras:
              <br />
              • <code>feat/nome-da-feature</code>: Para novas funcionalidades.
              <br />
              • <code>fix/correcao-bug</code>: Para resoluções de problemas.
              <br />
              • <code>docs/atualizar-manual</code>: Apenas para documentação.
              <br />
              • <code>test/adicionar-testes</code>: Criação ou ajuste de testes.
              <br />
              • <code>refactor/otimizar-codigo</code>: Melhorias estruturais sem alteração de comportamento.
              <br />
              • <code>chore/ajustar-eslint</code>: Configurações, manutenção e bibliotecas.
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">Regras de Ouro</h3>
            <p className="card-text" style={{ lineHeight: '1.8' }}>
              • <strong>Foco Único:</strong> Uma branch deve resolver apenas uma issue ou feature. Evite "branches gigantes" que alteram arquivos não relacionados.
              <br />
              • <strong>Puxe antes de criar:</strong> Sempre atualize seu repositório local (<code>git pull origin main</code>) antes de criar uma nova branch.
              <br />
              • <strong>Não reutilize:</strong> Uma vez que a branch foi mergeada na main, delete-a (local e remotamente) para manter a casa limpa.
              <br />
              • <strong>Mantenha a sincronia:</strong> Se a main receber atualizações importantes enquanto você trabalha, integre-as na sua branch local.
            </p>
          </div>
        </div>
      </section>

      {/* Commands Reference */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h2 className="section-title">Referência de Comandos</h2>
          <p className="section-subtitle">Memorize os comandos essenciais para gerenciar branches</p>
        </div>
        <div className="branches-command-list">
          {COMMANDS.map(c => (
            <div className="card branches-command-item" key={c.name}>
              <h3 className="card-title">{c.name}</h3>
              <p className="card-text">{c.desc}</p>
              <pre className="branches-code-block">{c.code}</pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
