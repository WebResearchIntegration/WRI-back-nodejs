const db = require('seraph')({
    server: require('../../config').DATABASE_URL,
    user: "neo4j",
    pass: "root",
    id: "id"
}),
    moment = require('moment'),
    nodeModelGenerator = require('seraph-model'),
    NoteNode = nodeModelGenerator(db, 'Note');

/** 
* Class representing a note and that can interacts directly with neo4j cypher requests.
*/
class Note {
    constructor(objectNote) {
        this.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.text = objectNote.text;
        this.nodeNeo4j = null;
    }

    save(callback) {
        NoteNode.save({
            text: this.text,
            createdAt: this.createdAt
        }, (err, noteNode) => {
            if(err) callback(err, null);
            if(callback) callback(null, noteNode);
            this.nodeNeo4j = noteNode;
        });
    }

    static getAll(callback) {
        NoteNode.findAll({}, (err, listOfNotes) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, listOfNotes);
            }
        });
    }

    static update(id, noteToUpdate, callback) {
        NoteNode.save({
            id: id,
            text: noteToUpdate.text,
            createdAt: noteToUpdate.createdAt
        }, (err, noteNode) => {
            if(err) callback(err, null);
            if(callback) callback(null, noteNode);
        });
    }

    static delete(id, callback) {
        this.getNoteById(id, (err, note) => {
            if(err) {
                callback(err, false);
            } else if(note) {
                db.delete(note, (err2) => {
                    err2 ? callback(err2, false) : callback(null, true);
                });
            } else {
                callback(new Error("Wrong Id given in param of function. Provide an existing id."), false);
            }
        });
    }

    static getNoteById(id, callback) {
        NoteNode.read({id: id}, (err, note) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, note);
            }
        });
    }
}

module.exports.Note = Note;