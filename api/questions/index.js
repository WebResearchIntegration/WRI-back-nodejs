/** @module questions/index */

const questionRouter     = require('express').Router(),
questionController = require('./question.controller');

// [questionRouter: CRUD]
questionRouter.get('/:id', questionController.show);
questionRouter.post('/', questionController.create);
questionRouter.put('/:id', questionController.update);
questionRouter.delete('/:id', questionController.delete);
// [END questionRouter: CRUD]

questionRouter.get('/', questionController.getAllNotes);

module.exports = questionRouter;