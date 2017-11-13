/** @module articles/article.controller */

const Article = require('./article.model').Article;

exports.show = function(req, res) {
    console.log(req.params.id);
    Article.getArticleById(req.params.id, (err, article) => {
        if(err || !article) {
            res.sendStatus(404);
        } else {
            res.send(article);
        }
    });
}

exports.create = function(req, res) {
    let articleToSave = new Article({
        name: req.body.name,
        score: req.body.score,
        abstract: req.body.abstract,
        keywords: req.body.keywords,
        link: req.body.link,
        conference: req.body.conference,
        notes: req.body.notes,
        references: req.body.references,
        summary: req.body.summary,
        authors: req.body.authors,
        writtenDate: req.body.writtenDate,
        publishedDate: req.body.publishedDate
    });

    articleToSave.save((err, savedArticle) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(savedArticle);
        }
    });
}

exports.update = function(req, res) {
    res.sendStatus(200);
}

exports.delete = function(req, res) {
    Article.delete(req.params.id, (err, response) => {
        if(err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            res.send(true);
        }
    });
}

exports.getAllArticles = function(req, res) {
    Article.getAll((err, articleList) => {
        res.send(articleList);
    });
}

exports.addAuthor = function(req, res) {
    res.send(200);
}

exports.deleteAuthor = function(req, res) {
    res.send(200);
}

exports.addNote = function(req, res) {
    res.send(200);
}

exports.deleteNote = function(req, res) {
    res.send(200);
}

exports.addQuestion = function(req, res) {
    res.send(200);
}

exports.deleteQuestion = function(req, res) {
    res.send(200);
}