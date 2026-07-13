import './fundamentos-git.css'

const fluxo = [
  { numero: 1, nome: 'Working Tree', desc: 'A pasta do projeto no seu computador. Onde você edita os arquivos livremente.' },
  { numero: 2, nome: 'Staging Area', desc: 'Uma "área de preparação". Você escolhe quais mudanças entrarão no próximo commit.' },
  { numero: 3, nome: 'Commit', desc: 'Uma fotografia permanente das mudanças que estavam na staging area, com uma mensagem explicando o porquê.' },
  { numero: 4, nome: 'Histórico', desc: 'A sequência de todos os commits já feitos, formando a linha do tempo do projeto.' },
]

const comandos = [
  {
    comando: 'git status',
    explicacao: 'Mostra o que mudou na working tree e o que já está na staging area.',
    exemplo: '$ git status\n# On branch main\n# Changes not staged for commit:\n#   modified:   src/App.tsx',
  },
  {
    comando: 'git add',
    explicacao: 'Move mudanças da working tree para a staging area, preparando-as para o commit.',
    exemplo: '$ git add src/App.tsx\n$ git add .   # adiciona tudo que mudou',
  },
  {
    comando: 'git commit',
    explicacao: 'Registra o conteúdo da staging area como um novo ponto no histórico, com uma mensagem.',
    exemplo: '$ git commit -m "Ajusta cabecalho da pagina inicial"',
  },
  {
    comando: 'git log',
    explicacao: 'Lista o histórico de commits, do mais recente para o mais antigo.',
    exemplo: '$ git log --oneline\na1b2c3d Ajusta cabecalho da pagina inicial\n9f8e7d6 Cria estrutura inicial do projeto',
  },
  {
    comando: 'git diff',
    explicacao: 'Mostra, linha a linha, o que mudou e ainda não foi adicionado à staging area.',
    exemplo: '$ git diff\n- <h1>Titulo antigo</h1>\n+ <h1>Titulo novo</h1>',
  },
]

export default function FundamentosGitPage() {
  return (
    <div className="fg-page">
      <div className="hero-section">
        <h1 className="hero-title">Fundamentos de Git</h1>
        <p className="hero-subtitle">
          Antes de colaborar no GitHub, é preciso entender como o Git organiza o histórico
          do seu código. Este módulo cobre o essencial, em linguagem simples.
        </p>
      </div>

      <section>
        <div className="section-header">
          <h2 className="section-title">O que é Git (e o que não é)</h2>
          <p className="section-subtitle">Dois conceitos que costumam ser confundidos</p>
        </div>
        <div className="fg-intro-grid">
          <div className="card">
            <h3 className="card-title">Git</h3>
            <p className="card-text">
              Git é um <strong>sistema de controle de versão</strong>: um programa que roda no seu
              computador e registra o histórico de mudanças de um projeto. Ele funciona mesmo sem
              internet, guardando tudo em um <strong>repositório local</strong> dentro da pasta do
              projeto (a pasta oculta <code>.git</code>).
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">GitHub</h3>
            <p className="card-text">
              GitHub é um <strong>serviço online</strong> que hospeda repositórios Git na nuvem
              (um <strong>repositório remoto</strong>) e adiciona recursos de colaboração, como
              Issues, Pull Requests e revisão de código. Git é a ferramenta; GitHub é um lugar para
              guardar e compartilhar o que o Git produz.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Repositório local x remoto</h2>
          <p className="section-subtitle">Onde o histórico do projeto realmente mora</p>
        </div>
        <div className="fg-intro-grid">
          <div className="card">
            <h3 className="card-title">Repositório local</h3>
            <p className="card-text">
              É a cópia do repositório que vive no seu computador. Todo o histórico de commits está
              disponível ali, mesmo offline. É onde você trabalha no dia a dia.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">Repositório remoto</h3>
            <p className="card-text">
              É uma cópia do mesmo repositório hospedada em um servidor (como o GitHub), usada para
              backup e para que outras pessoas colaborem no mesmo projeto.
            </p>
          </div>
        </div>
      </section>

      <div className="workflow-section">
        <div className="section-header">
          <h2 className="section-title">O ciclo básico do Git</h2>
          <p className="section-subtitle">Working Tree → Staging → Commit → Histórico</p>
        </div>
        <div className="workflow-steps">
          {fluxo.map((etapa, index) => (
            <div className="step-node" key={etapa.nome}>
              <span className="step-number">{etapa.numero}</span>
              <div className="step-name">{etapa.nome}</div>
              <p className="step-desc">{etapa.desc}</p>
              {index < fluxo.length - 1 && (
                <div style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="section-header">
          <h2 className="section-title">Comandos essenciais</h2>
          <p className="section-subtitle">O que você vai digitar no dia a dia</p>
        </div>
        <div className="fg-command-list">
          {comandos.map((c) => (
            <div className="card fg-command-item" key={c.comando}>
              <h3 className="card-title">{c.comando}</h3>
              <p className="card-text">{c.explicacao}</p>
              <pre className="fg-code-block">{c.exemplo}</pre>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Por que commits pequenos e claros importam</h2>
          <p className="section-subtitle">O histórico é uma ferramenta, não apenas um registro</p>
        </div>
        <div className="card">
          <p className="card-text">
            Um commit pequeno e bem descrito faz uma única coisa e explica por que ela foi feita.
            Isso traz benefícios concretos: fica mais fácil revisar o que mudou, mais fácil encontrar
            quando um problema foi introduzido (usando <code>git log</code> e <code>git diff</code>),
            e mais fácil desfazer só aquela mudança específica, sem afetar o resto do projeto.
            Commits gigantes que misturam várias mudanças não relacionadas tornam o histórico difícil
            de entender e de revisar.
          </p>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Exercício guiado</h2>
          <p className="section-subtitle">Simulando o ciclo completo em um arquivo</p>
        </div>
        <div className="card">
          <p className="card-text">
            Imagine que você tem um arquivo <code>README.md</code> em um repositório já iniciado com{' '}
            <code>git init</code>. Siga o cenário abaixo mentalmente (ou em um projeto de teste):
          </p>
          <div className="fg-exercise-steps">
            <div className="fg-exercise-step">
              <span className="fg-exercise-step-number">1</span>
              <p className="card-text">
                Você edita o <code>README.md</code> e adiciona uma nova seção. O arquivo agora está
                modificado na <strong>working tree</strong>.
              </p>
            </div>
            <div className="fg-exercise-step">
              <span className="fg-exercise-step-number">2</span>
              <p className="card-text">
                Você roda <code>git status</code> e vê o arquivo listado como modificado, mas ainda
                não preparado para o commit.
              </p>
            </div>
            <div className="fg-exercise-step">
              <span className="fg-exercise-step-number">3</span>
              <p className="card-text">
                Você roda <code>git diff</code> para revisar exatamente o que mudou, linha a linha.
              </p>
            </div>
            <div className="fg-exercise-step">
              <span className="fg-exercise-step-number">4</span>
              <p className="card-text">
                Satisfeito com a mudança, você roda <code>git add README.md</code>, movendo-a para a{' '}
                <strong>staging area</strong>.
              </p>
            </div>
            <div className="fg-exercise-step">
              <span className="fg-exercise-step-number">5</span>
              <p className="card-text">
                Você roda <code>git commit -m "Adiciona secao de instalacao ao README"</code>,
                criando um <strong>commit</strong> permanente no histórico.
              </p>
            </div>
            <div className="fg-exercise-step">
              <span className="fg-exercise-step-number">6</span>
              <p className="card-text">
                Você roda <code>git log --oneline</code> e vê o novo commit no topo do{' '}
                <strong>histórico</strong> do projeto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
