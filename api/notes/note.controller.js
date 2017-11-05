/** @module notes/note.controller */

const Note = require('./note.model').Note;

exports.show = function(req, res) {
    Note.getNoteById(req.params.id, (err, noteFromDatabase) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send({state: true, node: noteFromDatabase});
        }
    });
}

exports.create = function(req, res) {
    let node = new Note({text: req.body.text});
    
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

}

exports.delete = function(req, res) {
    Note.delete(req.params.id, (err, deletedNote) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send({state: true, isNoteDeleted: deletedNote});
        }
    });
}

exports.getAllNotes = function(req, res) {
    Note.getAll((err, listOfNotes) => {
        if(err) {
            console.log('ERR => ', err);
            res.send({state: false, notes: null});
        } else {
            res.send({state: true, notes: listOfNotes});
        }
    });
} 