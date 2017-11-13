const db = require('seraph')({
    server: require('../../config').DATABASE_URL,
    user: "neo4j",
    pass: "root",
    id: "id"
}),
    moment = require('moment'),
    nodeModelGenerator = require('seraph-model'),
    QuestionNode = nodeModelGenerator(db, 'Question');

/** 
* Class representing a question and that can interacts directly with neo4j cypher requests.
*/
class Question {
    /**
     * Will create a question.
     * @param {Object} objectQuestion - corresponds to a plain object to initial a question.
     */
    constructor(objectQuestion) {
        this.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.problematic = objectNote.problematic;
        this.answer = objectNote.answer;
        this.nodeNeo4j = null;
    }

    /**
     * Save a valide question inside the neo4j database.
     * @param {Function} callback - method to execute at the end.
     * @returns {Question} - a Question with the id via callback, otherwise handle error via callback.
     */
    save(callback) {
        QuestionNode.save({
            problematic: this.problematic,
            answer: this.answer,
            createdAt: this.createdAt
        }, (err, questionNode) => {
            if(err) callback(err, null);
            if(callback) callback(null, questionNode);
            this.nodeNeo4j = questionNode;
        });
    }

    /**
     * Get all Questions of the neo4J database
     * @param {function} callback - method to execute at the end.
     * @returns {array} list of questions via callback, otherwise retrieve an error
     */
    static getAll(callback) {
        QuestionNode.findAll({}, (err, listOfNotes) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, listOfNotes);
            }
        });
    }

    /**
     * Will update a question by giving the right id.
     * @param {Number} id - id to give that coreesponds to the question to update
     * @param {Object} questionToUpdate - Object that corresponds to an existing question
     * @param {Function} callback - method to call at the end.
     * @returns {Note} the updated note via callback, or error via callback.
     */
    static update(id, questionToUpdate, callback) {
        QuestionNode.save({
            id: id,
            problematic: questionToUpdate.problematic,
            answer: questionToUpdate.answer,
            createdAt: questionToUpdate.createdAt
        }, (err, questionNode) => {
            if(err) callback(err, null);
            if(callback) callback(null, questionNode);
        });
    }

    /**
     * Will delete a question by the giving id.
     * @param {Number} id - corresponding id inside the database.
     * @param {Function} callback - method to call at the end.
     */
    static delete(id, callback) {
        this.getQuestionById(id, (err, question) => {
            if(err) {
                callback(err, false);
            } else if(question) {
                db.delete(question, (err2) => {
                    err2 ? callback(err2, false) : callback(null, true);
                });
            } else {
                callback(new Error("Wrong Id given in param of function. Provide an existing id."), false);
            }
        });
    }

    /**
     * Will get a question from the database with corresponding id.
     * @param {Number} id - the ID that corresponds to the question we want to get.
     * @param {Function} callback - method to call at the end.
     * @returns {Note} the question corresponding via callback, otherwise returns an error via callback.
     */
    static getQuestionById(id, callback) {
        QuestionNode.read({id: id}, (err, question) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, question);
            }
        });
    }
}

module.exports.Question = Question;