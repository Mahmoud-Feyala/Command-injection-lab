function createSearchController(searchModel, mode) {
  function search(req, res) {
    const term = req.query.term;

    if (!term) {
      return res.status(400).send('Missing "term" query parameter, e.g. /search?term=ERROR');
    }

    if (mode === 'fixed') {
      const result = searchModel.search(term);
      if (result.type === 'blocked') {
        return res.status(403).send('Request Blocked: Invalid characters or blacklisted keywords detected.');
      }
      if (result.type === 'error') {
        return res.status(500).send('Internal Server Error while accessing logs.');
      }
      return res.type('text/plain').send(result.text);
    }

    searchModel.search(term, (error, stdout, stderr) => {
      if (error && error.code === 1 && !stderr.trim()) {
        return res.type('text/plain').send('No matches found.');
      }
      if (error) {
        return res.status(500).send(`Execution error: ${error.message}\n\nstderr: ${stderr}`);
      }
      return res.type('text/plain').send(stdout || stderr);
    });
  }

  return { search };
}

module.exports = { createSearchController };
