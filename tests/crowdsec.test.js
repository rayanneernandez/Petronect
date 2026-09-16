import { test } from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { checkCrowdSec } = require('../api/_crowdsec.js');
const jornada = require('../api/jornada.js');

function createResponseMock() {
  let statusCode;
  let responseBody;

  return {
    res: {
      status(code) {
        statusCode = code;
        return this;
      },
      json(body) {
        responseBody = body;
        return this;
      },
      setHeader() {},
    },
    getStatus() {
      return statusCode;
    },
    getBody() {
      return responseBody;
    },
  };
}

test('bloqueia User-Agent de Python/Scraper com CWE associada', () => {
  const result = checkCrowdSec({
    headers: {
      'user-agent': 'python-requests/2.31.0',
      'x-forwarded-for': '203.0.113.10',
    },
  });

  assert.strictEqual(result.allowed, false);
  assert.strictEqual(result.status, 403);
  assert.strictEqual(result.threatTag, 'RPA não autorizado');
  assert.strictEqual(result.cwe, 'CWE-807');
});

test('libera User-Agent legítimo de navegador', () => {
  const browserUserAgents = [
    'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 Firefox/121.0',
  ];

  for (const [index, userAgent] of browserUserAgents.entries()) {
    const result = checkCrowdSec({
      headers: {
        'user-agent': userAgent,
        'x-forwarded-for': `203.0.113.${11 + index}`,
      },
    });

    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.threatTag, 'Humano Válido');
    assert.strictEqual(result.cwe, null);
  }
});

test('aplica bloqueio estruturado na rota /api/jornada', () => {
  const response = createResponseMock();

  jornada(
    {
      method: 'GET',
      headers: {
        'user-agent': 'curl/8.0.0',
        'x-forwarded-for': '203.0.113.12',
      },
    },
    response.res,
  );

  assert.strictEqual(response.getStatus(), 403);
  assert.deepStrictEqual(response.getBody(), {
    error: 'User-Agent automatizado ou inconsistente bloqueado.',
    status: 403,
    threatTag: 'RPA não autorizado',
    cwe: 'CWE-807',
  });
});