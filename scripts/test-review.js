#!/usr/bin/env node
const axios = require('axios');

function getArg(name, def) {
  const idx = process.argv.indexOf('--' + name);
  if (idx === -1) return def;
  return process.argv[idx + 1];
}

const id = getArg('id');
const host = getArg('host', 'http://localhost:3000');
const name = getArg('name');
const rating = Number(getArg('rating', '5'));
const comment = getArg('comment', 'Test review from script');

if (!id) {
  console.error('Usage: node scripts/test-review.js --id <STORE_ID> [--host http://localhost:3000] [--name "Bob"] [--rating 5] [--comment "text"]');
  process.exit(1);
}

(async () => {
  try {
    const payload = { name: name || undefined, rating, comment };
    console.log('POST', `${host}/api/stores/${id}/reviews`, 'payload:', payload);
    const res = await axios.post(`${host}/api/stores/${id}/reviews`, payload, { timeout: 10000 });
    console.log('POST response status:', res.status);
    console.log('POST response data:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('POST failed:', err.response.status, err.response.data);
    } else {
      console.error('POST failed:', err.message);
    }
  }

  try {
    const g = await axios.get(`${host}/api/stores/${id}`);
    console.log('\nGET store status:', g.status);
    console.log('GET store body:', JSON.stringify(g.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('GET store failed:', err.response.status, err.response.data);
    } else {
      console.error('GET store failed:', err.message);
    }
  }

  try {
    const r = await axios.get(`${host}/api/stores/${id}/reviews`);
    console.log('\nGET reviews status:', r.status);
    console.log('GET reviews body:', JSON.stringify(r.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('GET reviews failed:', err.response.status, err.response.data);
    } else {
      console.error('GET reviews failed:', err.message);
    }
  }
})();
