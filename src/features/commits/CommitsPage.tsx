import { useState, useRef, useEffect } from 'react'
import './commits.css'

interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  diff: string;
  contentSnapshot: string;
}



interface ScenarioStep {
  id: number;
  description: string;
  check: (state: {
    editorContent: string;
    stagedContent: string | null;
    committedContent: string;
    commits: Commit[];
    consoleText: string;
  }) => boolean;
}

const COMMANDS = [
  {
    name: 'git status',
    desc: 'Mostra o estado atual das três áreas: arquivos modificados na working tree e arquivos preparados na staging area.',
    code: '$ git status\nOn branch feat/commits\nChanges not staged for commit:\n  modified:   src/App.tsx'
  },
  {
    name: 'git diff',
    desc: 'Inspeciona as diferenças exatas, linha por linha, entre o seu código atual e a última versão gravada no Git (ou staging).',
    code: '$ git diff\n-   console.log("Olá Mundo!");\n+   console.log("Olá Equipe!");'
  },
  {
    name: 'git add <arquivo>',
    desc: 'Adiciona mudanças da working tree para a staging area, marcando-as como prontas para entrar no próximo commit.',
    code: '$ git add src/App.tsx\n# Adiciona todas as modificações:\n$ git add .'
  },
  {
    name: 'git commit -m "<mensagem>"',
    desc: 'Grava o snapshot dos arquivos da staging area como um ponto permanente no histórico, com uma mensagem descritiva.',
    code: '$ git commit -m "feat: personalizar mensagem de boas-vindas"'
  },
  {
    name: 'git log',
    desc: 'Exibe a lista histórica de commits realizados, ordenados do mais recente ao mais antigo.',
    code: '$ git log --oneline\na5d3b2c feat: personalizar mensagem de boas-vindas\nf8e7d6c feat: adicionar pagina inicial'
  },
  {
    name: 'git show <commit>',
    desc: 'Inspeciona os detalhes de um commit específico: autor, data, mensagem completa e o diff das alterações feitas.',
    code: '$ git show f8e7d6c\ncommit f8e7d6c\nAuthor: Diego Santos <diego@example.com>\nDate:   Mon Jul 13 13:20:00 2026'
  }
];

const SCENARIO_STEPS: ScenarioStep[] = [
  {
    id: 1,
    description: 'Faça uma modificação no código no Editor de Código Mockado (ex: edite "Olá Mundo!" para "Olá Equipe!").',
    check: (state) => state.editorContent !== state.committedContent && state.stagedContent === null
  },
  {
    id: 2,
    description: 'Verifique a diferença de linhas clicando no botão "Visualizar Diff (git diff)".',
    check: (state) => state.consoleText.includes('git diff')
  },
  {
    id: 3,
    description: 'Adicione suas mudanças à Staging Area clicando no botão "Preparar (git add .)".',
    check: (state) => state.stagedContent !== null
  },
  {
    id: 4,
    description: 'Digite a mensagem "feat: personalizar mensagem de boas-vindas" e clique em "Fazer Commit (git commit -m)".',
    check: (state) => state.commits.some(c => c.message === 'feat: personalizar mensagem de boas-vindas')
  },
  {
    id: 5,
    description: 'Clique no seu novo commit na linha do tempo do Histórico Local para ver os detalhes via "git show".',
    check: (state) => state.consoleText.includes('git show') && state.consoleText.includes('personalizar mensagem')
  }
];

const INITIAL_CODE = `// Rascunho da aplicação
function App() {
  console.log("Olá Mundo!");
}`;

export default function CommitsPage() {
  // Simulator State
  const [editorContent, setEditorContent] = useState<string>(INITIAL_CODE);
  const [stagedContent, setStagedContent] = useState<string | null>(null);
  const [committedContent, setCommittedContent] = useState<string>(INITIAL_CODE);
  const [commitMsgInput, setCommitMsgInput] = useState<string>('');
  
  // Flash Animation States
  const [flashStaged, setFlashStaged] = useState<boolean>(false);
  const [flashCommitted, setFlashCommitted] = useState<boolean>(false);
  const [selectedCommitId, setSelectedCommitId] = useState<string>('f8e7d6c');

  const initialCommits: Commit[] = [
    {
      id: 'c1a2b3d',
      message: 'Initial commit',
      author: 'Diego Santos <diego@example.com>',
      timestamp: '2026-07-10 14:02',
      diff: '+++ /dev/null\n--- /dev/null\n+ // Inicialização do repositório piloto',
      contentSnapshot: '// Inicialização do repositório piloto'
    },
    {
      id: 'f8e7d6c',
      message: 'feat: adicionar pagina inicial',
      author: 'Diego Santos <diego@example.com>',
      timestamp: '2026-07-13 13:20',
      diff: '--- // Inicialização do repositório piloto\n+ // Rascunho da aplicação\n+ function App() {\n+   console.log("Olá Mundo!");\n+ }',
      contentSnapshot: INITIAL_CODE
    }
  ];

  const [commits, setCommits] = useState<Commit[]>(initialCommits);
  const [consoleOutput, setConsoleOutput] = useState<string>(
    'Git Commit Dashboard Console v1.0\nEditor inicializado. Arquivo "src/App.tsx" pronto para edição.\nUse os controles para simular comandos Git.\n'
  );

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleOutput]);

  const addConsoleOutput = (text: string) => {
    setConsoleOutput(prev => prev + '\n' + text);
  };

  // Helper to compute a line-by-line diff between two string contents
  const generateDiffText = (oldText: string, newText: string) => {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const diffLines: string[] = [];

    diffLines.push('diff --git a/src/App.tsx b/src/App.tsx');
    diffLines.push('--- a/src/App.tsx');
    diffLines.push('+++ b/src/App.tsx');

    const maxLength = Math.max(oldLines.length, newLines.length);
    let hasChanges = false;

    for (let i = 0; i < maxLength; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine !== newLine) {
        hasChanges = true;
        if (oldLine !== undefined) {
          diffLines.push(`-  ${oldLine}`);
        }
        if (newLine !== undefined) {
          diffLines.push(`+  ${newLine}`);
        }
      } else {
        if (oldLine !== undefined) {
          diffLines.push(`   ${oldLine}`);
        }
      }
    }

    return hasChanges ? diffLines.join('\n') : 'No changes detected.';
  };

  // Git Add Action
  const handleGitAdd = () => {
    if (editorContent === (stagedContent || committedContent)) {
      addConsoleOutput('$ git add .\nNothing to stage. No changes in Working Tree.');
      return;
    }

    setStagedContent(editorContent);
    setFlashStaged(true);
    setTimeout(() => setFlashStaged(false), 600);

    addConsoleOutput('$ git add .\n[INFO] Changes staged successfully. File "src/App.tsx" ready for commit.');
  };

  // Git Diff Action
  const handleGitDiff = () => {
    let diff: string;
    let command = '$ git diff';
    
    if (stagedContent !== null) {
      // Diff staged vs editor
      diff = generateDiffText(stagedContent, editorContent);
      if (diff === 'No changes detected.') {
        // If no changes staged vs working, show staged vs last commit
        diff = generateDiffText(committedContent, stagedContent);
        command = '$ git diff --staged';
      }
    } else {
      diff = generateDiffText(committedContent, editorContent);
    }
    
    addConsoleOutput(`${command}\n${diff}`);
  };

  // Git Status Action
  const handleGitStatus = () => {
    const hasUnstaged = editorContent !== (stagedContent || committedContent);
    const hasStaged = stagedContent !== null;

    let output = '$ git status\nOn branch feat/commits\n';

    if (!hasUnstaged && !hasStaged) {
      output += 'nothing to commit, working tree clean';
    } else {
      if (hasStaged) {
        output += 'Changes to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\t[STAGED] modified:   src/App.tsx\n';
      }
      if (hasUnstaged) {
        output += 'Changes not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\t[MODIFIED] modified:   src/App.tsx\n';
      }
    }

    addConsoleOutput(output);
  };

  // Git Commit Action
  const handleGitCommit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg = commitMsgInput.trim();

    if (stagedContent === null) {
      addConsoleOutput('$ git commit -m "' + msg + '"\n[ERROR] no changes added to commit (use "git add")');
      return;
    }

    if (!msg) {
      addConsoleOutput('$ git commit\n[ERROR] Aborting commit due to empty commit message.');
      return;
    }

    const newId = Math.random().toString(16).substring(2, 9);
    const newDiff = generateDiffText(committedContent, stagedContent);
    const date = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newCommit: Commit = {
      id: newId,
      message: msg,
      author: 'Alex Biudes <alex.biudes@example.com>',
      timestamp: date,
      diff: newDiff,
      contentSnapshot: stagedContent
    };

    setCommits(prev => [...prev, newCommit]);
    setCommittedContent(stagedContent);
    setStagedContent(null);
    setCommitMsgInput('');
    setSelectedCommitId(newId);
    
    setFlashCommitted(true);
    setTimeout(() => setFlashCommitted(false), 600);

    addConsoleOutput(
      `$ git commit -m "${msg}"\n[feat/commits ${newId}] ${msg}\n 1 file changed, insertions(+), deletions(-)\nCreate commit record: ${newId}`
    );
  };

  // Git Show Action
  const handleGitShow = (commitId: string) => {
    const commit = commits.find(c => c.id === commitId);
    if (!commit) return;

    setSelectedCommitId(commitId);
    addConsoleOutput(
      `$ git show ${commit.id}\ncommit ${commit.id}\nAuthor: ${commit.author}\nDate:   ${commit.timestamp}\n\n    ${commit.message}\n\n${commit.diff}`
    );
  };

  // Git Log Action
  const handleGitLog = () => {
    let logLines = '$ git log --oneline\n';
    commits.slice().reverse().forEach(c => {
      logLines += `${c.id} ${c.message}\n`;
    });
    addConsoleOutput(logLines);
  };

  // Reset Simulator Action
  const handleReset = () => {
    setEditorContent(INITIAL_CODE);
    setStagedContent(null);
    setCommittedContent(INITIAL_CODE);
    setCommits(initialCommits);
    setSelectedCommitId('f8e7d6c');
    setConsoleOutput(
      'Simulator reinicializado.\nArquivo "src/App.tsx" pronto para edição.\n'
    );
  };

  // Check if scenario step is completed
  const getScenarioStepStatus = (step: ScenarioStep) => {
    const state = {
      editorContent,
      stagedContent,
      committedContent,
      commits,
      consoleText: consoleOutput
    };
    return step.check(state);
  };

  // Format diff lines with colors
  const renderFormattedConsole = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let className = 'console-line';
      if (line.startsWith('$')) {
        return (
          <div key={idx} className="console-line">
            <span className="console-prompt">user@git-learning:~/projeto</span>{' '}
            <span className="console-command">{line}</span>
          </div>
        );
      }

      if (line.startsWith('+')) {
        className = 'console-line console-diff-added';
      } else if (line.startsWith('-')) {
        className = 'console-line console-diff-removed';
      } else if (line.startsWith('diff') || line.startsWith('---') || line.startsWith('+++')) {
        className = 'console-line console-diff-header';
      } else if (line.includes('[ERROR]')) {
        className = 'console-line console-error';
      } else if (line.includes('[INFO]') || line.includes('record:') || line.includes('Create commit')) {
        className = 'console-line console-success';
      }

      return <div key={idx} className={className}>{line}</div>;
    });
  };

  return (
    <div className="commits-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Commits (Pontos de Controle)</h1>
        <p className="hero-subtitle">
          Entenda o snapshot atômico do histórico do seu projeto. 
          Aprenda o ciclo Working Tree → Staging → Commit e a arte das boas mensagens.
        </p>
      </div>

      {/* Intro Concepts Grid */}
      <section className="commits-intro-grid">
        <div className="card">
          <div className="card-icon">📸</div>
          <h3 className="card-title">O que é um Commit?</h3>
          <p className="card-text">
            Um commit é um <strong>snapshot (fotografia) atômico</strong> do estado do seu repositório em um dado momento. 
            Diferente de backups tradicionais que salvam arquivos inteiros duplicados, o Git armazena eficientemente a 
            diferença das alterações e reconstrói o histórico a partir dessa linha do tempo de nós encadeados.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🏗️</div>
          <h3 className="card-title">As Três Áreas do Git</h3>
          <p className="card-text">
            Para criar um commit, suas mudanças passam por três etapas lógicas no seu computador:
            <br />
            1. <strong>Working Tree:</strong> Sua pasta de arquivos onde você edita o código livremente.
            <br />
            2. <strong>Staging Area (Index):</strong> A sala de preparação. Você seleciona o que irá para o commit.
            <br />
            3. <strong>Local Repository (Commit):</strong> Onde o snapshot é gravado de forma permanente no histórico.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🔑</div>
          <h3 className="card-title">Metadados do Commit</h3>
          <p className="card-text">
            Todo commit possui metadados cruciais vinculados:
            <br />
            • <strong>SHA-1 Hash:</strong> Um identificador único de 40 caracteres (geralmente abreviado para 7).
            <br />
            • <strong>Autoria:</strong> Nome e e-mail de quem gerou a alteração.
            <br />
            • <strong>Timestamp:</strong> Data e horário exato em que o commit foi criado.
            <br />
            • <strong>Mensagem:</strong> A descrição textual do que foi alterado e o porquê.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🎯</div>
          <h3 className="card-title">O Princípio da Atomicidade</h3>
          <p className="card-text">
            Um commit ideal é <strong>atômico</strong>: ele realiza uma única mudança coerente. 
            Por exemplo, prefira fazer dois commits separados para "adicionar ícone de menu" e "corrigir bug do footer" 
            em vez de agrupar tudo em um único commit gigante. Commits atômicos facilitam revisões de código, 
            detecção de regressões e rollbacks seguros.
          </p>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="dashboard-container">
        <div className="section-header">
          <h2 className="section-title">Git Commit Dashboard</h2>
          <p className="section-subtitle">Simule o ciclo de modificação, preparação e gravação no histórico de commits</p>
        </div>

        <div className="dashboard-layout">
          {/* Column Left: Code Editor Panel */}
          <div className="editor-panel">
            <div className="editor-header">
              <div className="editor-dots">
                <span className="editor-dot" style={{ background: '#ef4444' }}></span>
                <span className="editor-dot" style={{ background: '#fbbf24' }}></span>
                <span className="editor-dot" style={{ background: '#10b981' }}></span>
              </div>
              <span className="editor-title">src/App.tsx</span>
              <span></span>
            </div>
            <textarea
              className="editor-textarea"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
            />
            <div className="editor-footer">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Working Tree File</span>
              {editorContent !== (stagedContent || committedContent) ? (
                <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 'bold' }}>● Modificado</span>
              ) : (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sem alterações</span>
              )}
            </div>
          </div>

          {/* Column Right: Controls, Stages visual representation & Terminal Output */}
          <div className="stages-panel">
            {/* Visual Areas Stage Columns */}
            <div className="stage-columns">
              {/* Working Tree Column */}
              <div className="stage-column">
                <h4 className="stage-column-title">1. Working Tree</h4>
                {editorContent !== (stagedContent || committedContent) ? (
                  <div className="file-item">
                    <span>src/App.tsx</span>
                    <span className="file-status-badge file-status-modified">Modified</span>
                  </div>
                ) : (
                  <div className="empty-stage-msg">Sem arquivos modificados</div>
                )}
              </div>

              {/* Staging Area Column */}
              <div className={`stage-column ${flashStaged ? 'flash-staged' : ''}`}>
                <h4 className="stage-column-title">2. Staging Area</h4>
                {stagedContent !== null ? (
                  <div className="file-item">
                    <span>src/App.tsx</span>
                    <span className="file-status-badge file-status-staged">Staged</span>
                  </div>
                ) : (
                  <div className="empty-stage-msg">Área vazia (git add .)</div>
                )}
              </div>

              {/* Commit History Column */}
              <div className={`stage-column ${flashCommitted ? 'flash-committed' : ''}`}>
                <h4 className="stage-column-title">3. Local History</h4>
                <div className="history-timeline">
                  {commits.slice().reverse().map(commit => (
                    <div
                      key={commit.id}
                      onClick={() => handleGitShow(commit.id)}
                      className={`timeline-commit-card ${selectedCommitId === commit.id ? 'selected' : ''}`}
                    >
                      <div className="timeline-commit-header">
                        <span className="timeline-commit-hash">{commit.id}</span>
                        <span className="timeline-commit-date">{commit.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className="timeline-commit-msg">{commit.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Board */}
            <div className="dashboard-actions">
              <div className="dashboard-btn-row">
                <button onClick={handleGitStatus} className="btn btn-secondary dashboard-btn">
                  git status
                </button>
                <button onClick={handleGitDiff} className="btn btn-secondary dashboard-btn">
                  git diff
                </button>
                <button onClick={handleGitAdd} className="btn btn-primary dashboard-btn">
                  git add .
                </button>
              </div>

              <form onSubmit={handleGitCommit} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input
                  type="text"
                  placeholder="Mensagem do commit (ex: feat: ajustar...)"
                  value={commitMsgInput}
                  onChange={(e) => setCommitMsgInput(e.target.value)}
                  className="control-input"
                  style={{ flexGrow: 1, fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  git commit -m
                </button>
              </form>

              <div className="dashboard-btn-row" style={{ marginTop: '0.25rem' }}>
                <button onClick={handleGitLog} className="btn btn-secondary dashboard-btn" style={{ padding: '0.4rem' }}>
                  git log --oneline
                </button>
                <button onClick={handleReset} className="btn btn-secondary dashboard-btn" style={{ padding: '0.4rem', color: 'var(--text-muted)' }}>
                  Resetar
                </button>
              </div>
            </div>

            {/* Console Output Pane */}
            <div className="dashboard-console">
              {renderFormattedConsole(consoleOutput)}
              <div ref={consoleEndRef} />
            </div>
          </div>
        </div>

        {/* Guided Exercise Steps */}
        <div className="scenario-box">
          <h3 className="scenario-title">🎓 Exercício Guiado: Realize seu Primeiro Commit Atômico</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Simule o fluxo padrão de gravação de controle do Git no painel. Conclua cada passo:
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

      {/* Bad vs Good Commits Comparison */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h2 className="section-title">A Arte da Mensagem de Commit</h2>
          <p className="section-subtitle">Aprenda a estruturar mensagens semânticas e claras para a sua equipe</p>
        </div>
        <div className="commits-comparison-grid">
          <div className="message-box bad">
            <h4 className="message-box-title">❌ Commits Ruins (Evite)</h4>
            <p className="card-text" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
              • <code>ajuste</code> (Vago demais, não explica o que mudou).
              <br />
              • <code>corrigido bug no formulário e adicionado estilo no menu e atualizado readme</code> (Mistura múltiplos tópicos não relacionados em um commit gigante).
              <br />
              • <code>funciona agora</code> (Sentimento pessoal, sem valor informativo técnico).
              <br />
              • <code>Ajustes finais 3</code> (Indica falta de planejamento e excesso de controle redundante).
            </p>
          </div>
          <div className="message-box good">
            <h4 className="message-box-title">✅ Commits Bons (Recomendados)</h4>
            <p className="card-text" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
              • <code>feat: adicionar painel de staging no simulador</code> (Usa prefixos semânticos e indica de forma focada a nova feature).
              <br />
              • <code>fix: resolver vazamento de memoria no evento onClick</code> (Claro sobre o problema técnico resolvido).
              <br />
              • <code>docs: atualizar guia de contribuicao com links de specs</code> (Focado em alterações documentais).
              <br />
              • <code>style: ajustar padding do menu lateral em mobile</code> (Focado apenas em estilizações).
            </p>
          </div>
        </div>
      </section>

      {/* Commands Reference */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h2 className="section-title">Referência dos Comandos</h2>
          <p className="section-subtitle">Use estes comandos locais no seu terminal durante o desenvolvimento</p>
        </div>
        <div className="commits-command-list">
          {COMMANDS.map(c => (
            <div className="card commits-command-item" key={c.name}>
              <h3 className="card-title">{c.name}</h3>
              <p className="card-text">{c.desc}</p>
              <pre className="commits-code-block">{c.code}</pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
