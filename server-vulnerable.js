
const { createApp } = require('./app');
const searchModel = require('./models/vulnerable-log-search');
const PORT = 3000;

const app = createApp('vulnerable', searchModel);

app.listen(PORT, () => {
  console.log(`VULNERABLE Server running at http://localhost:${PORT}`);
  console.log(`Open the UI: http://localhost:${PORT}`);
  console.log('Try: /search?term=ERROR');
  console.log('Exploit: /search?term=ERROR;whoami');
});