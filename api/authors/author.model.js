const db = require('seraph')({
        server: require('../../config').DATABASE_URL,
        user: "neo4j",
        pass:"root",
        id: "id"
    }),
        nodeModelGenerator = require('seraph-model'),
        AuthorNode         = nodeModelGenerator(db, 'Author');

/**
* Class representing an author.
*/
class Author {
    /**
    * Create an author
    * @param {Object} objectAuthor 
    */
    constructor(objectAuthor) {
        this.name = objectAuthor.name;
        this.email = objectAuthor.email;
        this.linkedIn = objectAuthor.linkedIn;
        this.rating = objectAuthor.rating;
        this.birthDate = objectAuthor.birthDate;
        this.gender = objectAuthor.gender;
        this.photoUrl = objectAuthor.photoUrl;
        this.description = objectAuthor.description;
        this.articles = objectAuthor.articles;
        this.nodeNeo4j = null;
    }

    /**
    * Method that will save an author inside the neo4j database as a node.
    * @param {Function} callback - method to call at the end of the saving method.
    */
    save(callback) {
        if(this.nodeNeo4j === null) {
            AuthorNode.save({
                name: this.name,
                email: this.email,
                linkedIn: this.linkedIn,
                rating: this.rating,
                birthDate: this.birthDate,
                gender: this.gender,
                photoUrl: this.photoUrl,
                description: this.description,
                articles: this.articles
            }, (err, authorNode) => {
                if(err) callback(err, null);
                if(callback) callback(null, authorNode)
                this.nodeNeo4j = authorNode;
            });
        } else {
            console.log('Else statement');
        }
    }

    /**
    * Will save an author that already exist inside the database, by refering the id.
    * @param {Number} id - corresponding to the id of the node.
    * @param {Object} articleToUpdate - object that corresponds to the author to update.
    * @param {Function} callback - method to call at the end of the saving.
    */
    static update(id, authorToUpdate, callback) {
        AuthorNode.save({
                id: id,
                name: authorToUpdate.name,
                email: authorToUpdate.email,
                linkedIn: authorToUpdate.linkedIn,
                rating: authorToUpdate.rating,
                birthDate: authorToUpdate.birthDate,
                gender: authorToUpdate.gender,
                photoUrl: authorToUpdate.photoUrl,
                description: authorToUpdate.description,
                articles: authorToUpdate.articles
            }, (err, authorNode) => {
                if(err) callback(err, null);
                if(callback) callback(null, authorNode)
                this.nodeNeo4j = authorNode;
        });
    }

    /**
    * Will delete an author by giving the corresponding id.
    * @param {Number} id - corresponding id inside the neo4j database.
    * @param {Function} callback - function to execute at the end of the deleting.
    */
    static delete(id, callback) {
        this.getAuthorById(id, (err, author) => {
            if(err) {
                callback(err, false);
            } else if(author) {
                db.delete(author, (err2) => {
                    err2 ? callback(err2, false) : callback(null, true);
                });
            } else {
                callback(new Error("Wrong Id given in param of function. Provide an existing id."), false);
            }
        });
    }

    /**
    * Will get all authors.
    * @param {Function} callback - method to call at the end.
    * @return {array} values of all authors.
    */
    static getAll(callback) {
        AuthorNode.findAll({}, (err, listAuthors) => {
            if(err) callback(err, null);
            if(callback) callback(null, listAuthors);
        });
    };

    /**
    * Will get an author with corresponding id.
    * @param {number} id - corresponding id of the node.
    * @param {Function} callback - method to call at the end.
    * @returns {Author} the author given.
    */
    static getAuthorById(id, callback) {
        AuthorNode.read({id: id}, (err, author) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, author);
            }
        });
    }
}

module.exports.Author = Author;