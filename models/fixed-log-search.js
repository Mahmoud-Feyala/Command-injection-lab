const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'server.log');
const maxTermLength = 100;
const commandBlacklist = [
  'whoami', 'cat', 'ls', 'pwd', 'id', 'netcat', 'nc', 'ping', 'bash', 'sh',
  ';', '|', '&', '$', '`', '>', '<'
];

function getSecuredTerm(term) {
  if (typeof term !== 'string' || term.length === 0 || term.length > maxTermLength) {
    return null;
  }

  const lowerTerm = term.toLowerCase();
  if (commandBlacklist.some(item => lowerTerm.includes(item))) {
    console.warn(`[SECURITY ALERT] Blocked blacklisted payload from input: ${term}`);
    return null;
  }

  if (!/^[A-Za-z0-9\s]+$/.test(term)) {
    return null;
  }

  return term.replace(/[^A-Za-z0-9\s]/g, '');
}

function search(term) {
  const safeTerm = getSecuredTerm(term);
  if (!safeTerm) {
    return { type: 'blocked' };
  }

  try {
    const lines = fs.readFileSync(logFile, 'utf-8').split('\n');
    const matches = lines.filter(line =>
      line.toLowerCase().includes(safeTerm.toLowerCase())
    );

    return { type: 'result', text: matches.length ? matches.join('\n') : 'No matches found.' };
  } catch (error) {
    console.error('[ERROR] Failed to read log file:', error.message);
    return { type: 'error' };
  }
}

module.exports = { search };
