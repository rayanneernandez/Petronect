const requestsByIp = new Map();

const WINDOW_MS = 1000;
const MAX_REQUESTS_PER_SECOND = 10;

const AUTOMATION_PATTERN =
  /python|urllib|puppeteer|selenium|axios|curl|playwright|httpclient/i;
const SCRAPER_PATTERN = /bot|scraper|spider|crawler|scrapy|wget|harvest|collector/i;
const BROWSER_PATTERN = /chrome|chromium|firefox|safari|edge|opera/i;

function getClientIp(req) {
  const headers = req.headers || {};
  const forwardedFor = headers['x-forwarded-for'];

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function hasRateLimitViolation(req, ip) {
  const headers = req.headers || {};
  const remainingHeader =
    headers['x-ratelimit-remaining'] || headers['x-rate-limit-remaining'];

  if (remainingHeader !== undefined) {
    const remaining = Number(remainingHeader);

    if (Number.isFinite(remaining) && remaining <= 0) {
      return true;
    }
  }

  const now = Date.now();
  const recentRequests = (requestsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);

  return recentRequests.length > MAX_REQUESTS_PER_SECOND;
}

function blockedResponse(error, threatTag, cwe) {
  return {
    allowed: false,
    status: 403,
    error,
    threatTag,
    cwe,
  };
}

function checkCrowdSec(req = {}) {
  const headers = req.headers || {};
  const userAgent = headers['user-agent'] || '';
  const fingerprint =
    headers['x-crowdsec-fingerprint'] || headers['x-device-fingerprint'] || '';
  const ip = getClientIp(req);

  if (hasRateLimitViolation(req, ip)) {
    return blockedResponse(
      'Frequência de requisições excedida.',
      'RPA em excesso',
      'CWE-799',
    );
  }

  if (AUTOMATION_PATTERN.test(userAgent)) {
    return blockedResponse(
      'User-Agent automatizado ou inconsistente bloqueado.',
      'RPA não autorizado',
      'CWE-807',
    );
  }

  if (BROWSER_PATTERN.test(userAgent) && AUTOMATION_PATTERN.test(fingerprint)) {
    return blockedResponse(
      'Fingerprint incompatível com o User-Agent informado.',
      'Fingerprint inconsistente',
      'CWE-807',
    );
  }

  if (SCRAPER_PATTERN.test(userAgent)) {
    return blockedResponse(
      'Coleta automatizada de dados bloqueada.',
      'Scraper de editais/preços',
      'CWE-200',
    );
  }

  return {
    allowed: true,
    status: 200,
    threatTag: 'Humano Válido',
    cwe: null,
  };
}

module.exports = {
  checkCrowdSec,
};