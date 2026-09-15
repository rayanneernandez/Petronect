// POST /api/webhook/test
// Endpoint real usado pelo botao "Enviar evento de teste" da tela
// Integracoes & API. Recebe o payload, valida o formato basico e ecoa
// de volta -- é o mesmo contrato que um webhook de producao receberia
// (ver "Contrato de Eventos" na tela Arquitetura da solucao).
module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST para enviar um evento de teste.' });
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
  }

  const evento = {
    id: 'evt_' + Math.random().toString(36).slice(2, 10),
    tipo: body.tipo || 'abandono_detectado',
    recebidoEm: new Date().toISOString(),
    payload: body,
  };

  res.status(200).json({
    ok: true,
    mensagem: 'Evento de teste recebido pela API do Petronect Analytics.',
    evento,
  });
};
