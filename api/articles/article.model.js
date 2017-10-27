const db                 = require('seraph')({
                                   server: require('../../config').DATABASE_URL,
                                   user: "neo4j",
                                   pass:"root"
                           }),
      nodeModelGenerator = require('seraph-model'),
      ArticleNode        = nodeModelGenerator(db, 'Article');

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
}

module.exports.Article = Article;