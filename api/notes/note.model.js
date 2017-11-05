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
    /**
     * Will create a note.
     * @param {Object} objectNote - corresponds to a plain object to initial a note.
     */
    constructor(objectNote) {
        this.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.text = objectNote.text;
        this.nodeNeo4j = null;
    }

    /**
     * Save a valide note inside the neo4j database.
     * @param {Function} callback - method to execute at the end.
     * @returns {Note} - a Note with the id via callback, otherwise handle error via callback.
     */
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

    /**
     * Get all Notes of the neo4J database with 
     * @param {function} callback - method to execute at the end.
     * @returns {array} list of notes via callback, otherwise retrieve an error
     */
    static getAll(callback) {
        NoteNode.findAll({}, (err, listOfNotes) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, listOfNotes);
            }
        });
    }

    /**
     * Will update a note by giving the right id.
     * @param {Number} id - id to give that coreesponds to the note to update
     * @param {Object} noteToUpdate - Object that corresponds to an existing note
     * @param {Function} callback - method to call at the end.
     * @returns {Note} the updated note via callback, or error via callback.
     */
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

    /**
     * Will delete a note by the giving id.
     * @param {Number} id - corresponding id inside the database.
     * @param {Function} callback - method to call at the end.
     */
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

    /**
     * Will get a note from the database with corresponding id.
     * @param {Number} id - the ID that corresponds to the note we want to get.
     * @param {Function} callback - method to call at the end.
     * @returns {Note} the note corresponding via callback, otherwise returns an error via callback.
     */
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