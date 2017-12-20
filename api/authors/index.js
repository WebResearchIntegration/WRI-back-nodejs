/** @module authors/index */

const authorRouter        = require('express').Router(),
      authorController    = require('./author.controller');

// [authorRouter: CRUD]
authorRouter.get('/:id', authorController.show);
authorRouter.post('/', authorController.create);
authorRouter.put('/:id', authorController.update);
authorRouter.delete('/:id', authorController.delete);
// [END authorRouter: CRUD]

authorRouter.get('/', authorController.getAllauthors);

module.exports = authorRouter;