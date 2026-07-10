export default function MethodologyPage() {
  return (
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
  )
}
