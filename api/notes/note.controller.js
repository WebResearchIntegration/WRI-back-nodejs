/** @module notes/note.controller */

const Note = require('./note.model').Note;

exports.show = function(req, res) {
    Note.getNoteById(req.params.id, (err, noteFromDatabase) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send(noteFromDatabase);
        }
    });
}

exports.create = function(req, res) {
    let node = new Note({text: req.body.text});
    
    node.save((err, nodeFromDatabase) => {
        if(err) {
            console.log('ERR => ', err);
            res.sendStatus(500);
        } else {
            res.send(nodeFromDatabase);
        }
    });
}

exports.update = function(req, res) {
    let noteToUpdate = {
        text: req.body.text,
        createdAt: req.body.createdAt
    };

    Note.update(req.params.id, noteToUpdate ,(err, updatedNote) => {
        if(err) {
            console.log('ERR => ', err);
             res.sendStatus(500);
        } else {
            res.send(updatedNote);
        }
    });
}

exports.delete = function(req, res) {
    Note.delete(req.params.id, (err, deletedNote) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send(deletedNote);
        }
    });
}

exports.getAllNotes = function(req, res) {
    Note.getAll((err, listOfNotes) => {
        if(err) {
            console.log('ERR => ', err);
            res.sendStatus(500);
        } else {
            res.send(listOfNotes);
        }
    });
} 