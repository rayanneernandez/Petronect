// GET /api/health
// Endpoint real de checagem de saude, usado pela tela "Integracoes & API".
module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'petronect-analytics-api',
    timestamp: new Date().toISOString(),
  });
};
