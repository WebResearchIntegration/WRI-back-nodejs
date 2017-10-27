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

// [articleRouter: RELATIONSHIPS]
articleRouter.post('/:fromId/:toId', articleController.createRelationship);
articleRouter.put('/:fromId/:toId', articleController.updateRelationship);
articleRouter.delete('/:fromId/:toId', articleController.deleteRelationship);
// [END articleRouter: RELATIONSHIPS]

module.exports = articleRouter;