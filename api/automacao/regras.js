// GET /api/automacao/regras
// Conjunto padrao de regras de automacao do Agente de Reengajamento.
// Serve hoje como o "contrato" que o front-end consome (a tela de
// Automacao guarda os ajustes do usuario no navegador, via
// localStorage); quando existir um banco por tras, este endpoint passa
// a ler/gravar as regras de verdade, sem precisar mudar o front-end.
module.exports = (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({
      regras: [
        {
          id: 'score-alto',
          nome: 'Score de necessidade alto',
          gatilho: 'score_necessidade',
          condicao: { operador: '>=', valor: 80 },
          acao: 'enviar_whatsapp',
          ativo: true,
        },
        {
          id: 'prazo-curto',
          nome: 'Prazo do edital acabando',
          gatilho: 'prazo_horas_restantes',
          condicao: { operador: '<=', valor: 26 },
          acao: 'criar_alerta_crm',
          ativo: true,
        },
        {
          id: 'rascunho-parado',
          nome: 'Proposta em rascunho parada',
          gatilho: 'horas_sem_atividade',
          condicao: { operador: '>=', valor: 6 },
          acao: 'notificar_reengajamento',
          ativo: true,
        },
        {
          id: 'trafego-suspeito',
          nome: 'Padrão de tráfego suspeito (possível bot)',
          gatilho: 'score_risco_trafego',
          condicao: { operador: '>=', valor: 70 },
          acao: 'sinalizar_seguranca',
          ativo: false,
        },
      ],
    });
  }
  res.setHeader('Allow', 'GET');
  res.status(405).json({ error: 'Metodo nao suportado.' });
};
