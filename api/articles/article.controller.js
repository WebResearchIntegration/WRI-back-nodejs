/**
 * CONTROLLER MODULE
 */

const ArticleGenerator = require('./article.model').Article,
      ArticleStatic    = require('./article.static');


exports.show = function(req, res) {
    ArticleStatic.getArticleById((err, article) => {
        res.send({success: "Article from database NEO4J", article: article});
    });
}

exports.create = function(req, res) {
    let articleToSave = new ArticleGenerator({
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
    ArticleStatic.getAll((err, articleList) => {
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