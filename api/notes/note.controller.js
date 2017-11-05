/** @module notes/note.controller */

const Note = require('./note.model').Note;

exports.show = function(req, res) {

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

}

exports.getAllNotes = function(req, res) {
    
} 