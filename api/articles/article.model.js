/**
 * MODEL ORM MODULE
 */
const db                 = require('seraph')({
                                   server: require('../../config').DATABASE_URL,
                                   user: "neo4j",
                                   pass:"root",
                                   id: "wri_id"
                           }),
      nodeModelGenerator = require('seraph-model'),
      ArticleNode        = nodeModelGenerator(db, 'Article');
      ArticleNode.setUniqueKey('name');

class Article {
    constructor(objectArticle) {
        this.name = objectArticle.name;
        this.keywords = objectArticle.keywords;
        this.references = objectArticle.references;
        this.summary = objectArticle.summary;
        this.writtenDate = objectArticle.writtenDate;
        this.publishedDate = objectArticle.publishedDate;
        this.nodeNeo4j = null;
    }

    save(callback) {
        if(this.nodeNeo4j === null) {
            ArticleNode.save({
                name: this.name,
                authors: this.authors,
                keywords: this.keywords,
                references: this.references,
                summary: this.summary,
                writtenDate: this.writtenDate,
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

    addReference() {

    }

    _isNodeNeo4JValid() {
        
        return true;
        return false;
    }

    static getAll(callback) {
        ArticleNode.findAll({}, (err, listArticles) => {
            if(err) callback(err, null);
            if(callback) callback(null, listArticles);
        });
    };

    static getArticleById(id, callback) {
        ArticleNode.read({wri_id: id}, (err, article) => {
            if(err) callback(err, null);
            if(callback) callback(null, article);
        });
    }
}

module.exports.Article = Article;