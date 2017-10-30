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
        this.authors = objectArticles.authors;
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

    addReference() {

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