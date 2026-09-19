const { createApp } = require('./app');
const searchModel = require('./models/fixed-log-search');
const PORT = 3001;

const app = createApp('fixed', searchModel);

app.listen(PORT, () => {
  console.log(`[SECURED] Server running at http://localhost:${PORT}`);
  console.log('Try: /search?term=ERROR');
  console.log('Try Exploit (Will trigger Blacklist): /search?term=whoami');
});