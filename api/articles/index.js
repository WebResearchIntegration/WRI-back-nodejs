/**
 * API ROUTES DEFINITION MODULE
 */
const articleRouter = require('express').Router(),
      articleController    = require('./article.controller');

// [articleRouter: CRUD]
articleRouter.get('/:id', articleController.show);
articleRouter.post('/', articleController.create);
articleRouter.put('/:id', articleController.update);
articleRouter.delete('/:id', articleController.delete);
// [END articleRouter: CRUD]

articleRouter.get('/', articleController.getAllArticles);

// [articleRouter: Relationship Authors]
articleRouter.post('/:fromId/author/:toId', articleController.addAuthor);
articleRouter.delete('/:fromId/author/:toId', articleController.deleteAuthor);
// [END articleRouter: Relationship Authors]

// [articleRouter: Relationship Note]
articleRouter.post('/:fromId/note/:toId', articleController.addNote);
articleRouter.delete('/:fromId/note/:toId', articleController.deleteNote);
// [END articleRouter: Relationship Note]

// [articleRouter: Relationship Question]
articleRouter.post('/:fromId/question/:toId', articleController.addQuestion);
articleRouter.delete('/:fromId/question/:toId', articleController.deleteQuestion);
// [END articleRouter: Relationship Question]

module.exports = articleRouter;