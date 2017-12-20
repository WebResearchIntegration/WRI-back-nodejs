/** @module authors/author.controller */

const Author = require('./author.model').Author;

exports.show = function(req, res) {
    console.log(req.params.id);
    Article.getAuthorById(req.params.id, (err, author) => {
        if(err || !author) {
            res.sendStatus(404);
        } else {
            res.send(author);
        }
    });
}

exports.create = function(req, res) {
    let authorToSave = new Author({
        name: req.body.name,
        email: req.body.email,
        linkedIn: req.body.linkedIn,
        rating: req.body.rating,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        photoUrl: req.body.photoUrl,
        description: req.body.description,
        articles: req.body.articles
    });

    authorToSave.save((err, savedAuthor) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(savedAuthor);
        }
    });
}

exports.update = function(req, res) {
    Author.update(req.body.id, req.body, (err, updatedValue) => {
        console.log(updatedValue);
        if(err) {
            res.sendStatus(404);
        } else {
            res.send(updatedValue);
        }
    });
}

exports.delete = function(req, res) {
    Author.delete(req.params.id, (err, response) => {
        if(err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            res.send(true);
        }
    });
}

exports.getAllAuthors = function(req, res) {
    Author.getAll((err, authorList) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(authorList);
        }
    });
}