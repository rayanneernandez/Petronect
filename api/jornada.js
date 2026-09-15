// GET /api/jornada
// Retorna o funil da jornada do fornecedor. Hoje os numeros sao fixos
// (o mesmo dataset de demonstracao usado no front-end); quando houver um
// banco de verdade por tras, e so trocar o corpo desta funcao pela
// consulta real -- o contrato de resposta (JSON abaixo) ja fica pronto.
module.exports = (req, res) => {
  res.status(200).json({
    periodo: '7dias',
    atualizadoEm: new Date().toISOString(),
    etapas: [
      { chave: 'acesso', label: 'Acesso identificado', total: 142 },
      { chave: 'buscou', label: 'Buscou edital', total: 111, quedaPercentual: -22 },
      { chave: 'detalhes', label: 'Abriu detalhes', total: 79, quedaPercentual: -29 },
      { chave: 'inscreveu', label: 'Inscreveu-se no edital', total: 61, quedaPercentual: -23 },
      { chave: 'iniciou', label: 'Iniciou proposta', total: 48, quedaPercentual: -21 },
      { chave: 'enviou', label: 'Enviou proposta', total: 28, quedaPercentual: -42 },
    ],
  });
};
