/**
 * CONTROLLER MODULE
 */

const Article = require('./article.model').Article;


exports.show = function(req, res) {
    console.log(req.params.id);
    Article.getArticleById(req.params.id, (err, article) => {
        if(err) res.sendStatus(404);
        res.send({success: "Article from database NEO4J", article: article});
    });
}

exports.create = function(req, res) {
    let articleToSave = new Article({
        name: req.body.name,
        keywords: req.body.keywords,
        references: req.body.references,
        summary: req.body.summary,
        authors: req.body.authors,
        writtenDate: req.body.writtenDate,
        publishedDate: req.body.publishedDate
    });

    articleToSave.save((err, savedArticle) => {
        if(err) res.send(500);
        res.send({state: 'success', article: savedArticle});
    });
}

exports.update = function(req, res) {
    res.send(200);
}

exports.delete = function(req, res) {
    res.send(200);
}

exports.getAllArticles = function(req, res) {
    Article.getAll((err, articleList) => {
        res.send({success: "List of articles", articles: articleList});
    });
}

exports.createRelationship = function(req, res) {
    res.send(200);
}

exports.updateRelationship = function(req, res) {
    res.send(200);
}

exports.deleteRelationship = function(req, res) {
    res.send(200);
}