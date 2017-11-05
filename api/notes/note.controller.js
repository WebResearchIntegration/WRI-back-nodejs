/** @module notes/note.controller */

const Note = require('./note.model').Note;

exports.show = function(req, res) {

}

exports.create = function(req, res) {
    let node = new Note({text: req.body.text});
    
    node.save((err, nodeFromDatabase) => {
        if(err) {
            console.log('ERR => ', err);
            res.sendStatus(500);
        } else {
            res.send({success: true, node: nodeFromDatabase});
            console.log('Success : ' + nodeFromDatabase)
        }
    });
}

exports.update = function(req, res) {

}

exports.delete = function(req, res) {

}

exports.getAllNotes = function(req, res) {
    
} 