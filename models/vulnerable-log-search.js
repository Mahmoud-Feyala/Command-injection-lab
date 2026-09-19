const { exec } = require('child_process');
const path = require('path');

const logFile = path.join(__dirname, '..', 'server.log').replace(/\\/g, '/');

function search(term, callback) {
  const command = `cat "${logFile}" | grep -i ${term}`;

  console.log('[DEBUG] executing command:', command);
  exec(command, { shell: 'bash.exe' }, callback);
}

module.exports = { search };
