import { test } from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const health = require('../api/health.js');

test('GET /api/health retorna o status da API', () => {
  let statusCode;
  let responseBody;

  const req = {
    method: 'GET',
  };

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      responseBody = body;
      return this;
    },
  };

  health(req, res);

  assert.strictEqual(statusCode, 200);
  assert.strictEqual(responseBody.status, 'ok');
  assert.strictEqual(responseBody.service, 'petronect-analytics-api');
  assert.strictEqual(
    Number.isNaN(Date.parse(responseBody.timestamp)),
    false,
  );
});