const db                 = require('seraph')({
                                   server: require('../../config').DATABASE_URL,
                                   user: "neo4j",
                                   pass:"root",
                                   id: "id"
                           }),
      nodeModelGenerator = require('seraph-model'),
      ArticleNode        = nodeModelGenerator(db, 'Article'),
      AuthorNode         = nodeModelGenerator(db, 'Author'),
      NoteNode           = nodeModelGenerator(db, 'Note'),
      QuestionNode       = nodeModelGenerator(db, 'Question');

      ArticleNode.compose(AuthorNode, 'authors', 'had_been_written_by');
      ArticleNode.compose(NoteNode, 'notes', 'has_note');
      ArticleNode.compose(ArticleNode, 'references', 'has_references');
      ArticleNode.setUniqueKey('name');

/**
 * Class representing an article.
 */
class Article {
    /**
     * Create an article
     * @param {Object} objectArticle 
     */
    constructor(objectArticle) {
        this.name = objectArticle.name;
        this.authors = objectArticle.authors;
        this.abstract = objectArticle.abstract;
        this.score = objectArticle.score;
        this.conference = objectArticle.conference;
        this.keywords = objectArticle.keywords;
        this.references = objectArticle.references;
        this.summary = objectArticle.summary;
        this.writtenDate = objectArticle.writtenDate;
        this.publishedDate = objectArticle.publishedDate;
        this.notes = objectArticle.notes;
        this.link = objectArticle.link;
        this.nodeNeo4j = null;
    }

    /**
     * Method that will save an article inside the neo4j database as a node.
     * @param {Function} callback - method to call at the end of the saving method.
     */
    save(callback) {
        if(this.nodeNeo4j === null) {
            ArticleNode.save({
                name: this.name,
                abstract: this.abstract,
                score: this.score,
                conference: this.conference,
                authors: this.authors,
                keywords: this.keywords,
                references: this.references,
                notes: this.notes,
                summary: this.summary,
                writtenDate: this.writtenDate,
                link: this.link,
                publishedDate: this.publishedDate
            }, (err, articleNode) => {
                if(err) callback(err, null);
                if(callback) callback(null, articleNode)
                this.nodeNeo4j = articleNode;
            });
        } else {
            console.log('Else statement');
        }
    }

    /**
     * Will save an article that already exist inside the database, by refering the id.
     * @param {Number} id - corresponding to the id of the node.
     * @param {Object} articleToUpdate - object that corresponds to the article to update.
     * @param {Function} callback - method to call at the end of the saving.
     */
    static update(id, articleToUpdate, callback) {
        ArticleNode.save({
            id: id,
            name: articleToUpdate.name,
            abstract: articleToUpdate.abstract,
            score: articleToUpdate.score,
            conference: articleToUpdate.conference,
            authors: articleToUpdate.authors,
            keywords: articleToUpdate.keywords,
            references: articleToUpdate.references,
            notes: articleToUpdate.notes,
            summary: articleToUpdate.summary,
            writtenDate: articleToUpdate.writtenDate,
            link: articleToUpdate.link,
            publishedDate: articleToUpdate.publishedDate
        }, (err, articleNode) => {
            if(err) callback(err, null);
            if(callback) callback(null, articleNode)
            this.nodeNeo4j = articleNode;
        });
    }

    /**
     * Will delete an article by giving the corresponding id.
     * @param {Number} id - corresponding id inside the neo4j database.
     * @param {Function} callback - function to execute at the end of the deleting.
     */
    static delete(id, callback) {
        this.getArticleById(id, (err, article) => {
            if(err) {
                callback(err, false);
            } else if(article) {
                db.delete(article, (err2) => {
                    err2 ? callback(err2, false) : callback(null, true);
                });
            } else {
                callback(new Error("Wrong Id given in param of function. Provide an existing id."), false);
            }
        });
    }

    /**
     * Will get all articles.
     * @param {Function} callback - method to call at the end.
     * @return {array} values of all articles.
     */
    static getAll(callback) {
        ArticleNode.findAll({}, (err, listArticles) => {
            if(err) callback(err, null);
            if(callback) callback(null, listArticles);
        });
    };

    /**
     * Will get an article with corresponding id.
     * @param {number} id - corresponding id of the node.
     * @param {Function} callback - method to call at the end.
     * @returns {Article} the article given.
     */
    static getArticleById(id, callback) {
        ArticleNode.read({id: id}, (err, article) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, article);
            }
        });
    }
}

module.exports.Article = Article;