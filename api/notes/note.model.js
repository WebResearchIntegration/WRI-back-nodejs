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
}

module.exports.Note = Note;