'use strict';

const launchEditor = require('./launchEditor');
const launchEditorEndpoint = require('./launchEditorEndpoint');

module.exports = function createLaunchEditorMiddleware() {
  return function launchEditorMiddleware(req, res, next) {
    if (req.url.startsWith(launchEditorEndpoint)) {
      launchEditor(req.query.fileName, req.query.lineNumber);
      res.end();
    } else {
      next();
    }
  };
};
