/** @module questions/question.controller */

const Question = require('./question.model').Question;

exports.show = function(req, res) {
    Question.getQuestionById(req.params.id, (err, questionFromDatabase) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send({state: true, node: questionFromDatabase});
        }
    });
}

exports.create = function(req, res) {
    let node = new Question({
        problematic: req.body.problematic,
        answer: req.body.answer
    });
    
    node.save((err, nodeFromDatabase) => {
        if(err) {
            console.log('ERR => ', err);
            res.send({state: false, nodeSaved: null});
        } else {
            res.send({state: true, nodeSaved: nodeFromDatabase});
        }
    });
}

exports.update = function(req, res) {
    let questionToUpdate = {
        problematic: req.body.problematic,
        answer: req.body.answer,
        createdAt: req.body.createdAt
    };

    Question.update(req.params.id, questionToUpdate ,(err, updatedQuestion) => {
        if(err) {
            console.log('ERR => ', err);
             res.sendStatus(500);
        } else {
            res.send({state: true, question: updatedQuestion});
        }
    });
}

exports.delete = function(req, res) {
    Question.delete(req.params.id, (err, deletedQuestion) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send({state: true, isQuestionDeleted: deletedQuestion});
        }
    });
}

exports.getAllQuestions = function(req, res) {
    Question.getAll((err, listOfQuestion) => {
        if(err) {
            console.log('ERR => ', err);
            res.send({state: false, questions: null});
        } else {
            res.send({state: true, questions: listOfQuestions});
        }
    });
}