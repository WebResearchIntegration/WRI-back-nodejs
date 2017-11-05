/** @module notes/index */

const noteRouter     = require('express').Router(),
      noteController = require('./note.controller');

// [noteRouter: CRUD]
noteRouter.get('/:id', noteController.show);
noteRouter.post('/', noteController.create);
noteRouter.put('/:id', noteController.update);
noteRouter.delete('/:id', noteController.delete);
// [END noteRouter: CRUD]

noteRouter.get('/', noteController.getAllNotes);

module.exports = noteRouter;