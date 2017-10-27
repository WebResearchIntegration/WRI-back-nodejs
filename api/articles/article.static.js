/**
 * STATIC MODULE
 */
const db                 = require('seraph')({
                            server: require('../../config').DATABASE_URL,
                            user: "neo4j",
                            pass:"root"
                        }),
    nodeModelGenerator = require('seraph-model'),
    ArticleNode        = nodeModelGenerator(db, 'Article');

exports.getAll = function(callback) {
    ArticleNode.findAll({}, (err, listArticles) => {
        if(err) callback(err, null);
        if(callback) callback(null, listArticles);
    });
};

exports.getArticleById =  function(id, callback) {
    ArticleNode.where({id: id}, (err, article) => {
        if(err) callback(err, null);
        if(callback) callback(null, article);
    });
}