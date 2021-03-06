/** @module routes */

module.exports = function(app) {
    app.use('/api/article/', require('./api/articles'));
    app.use('/api/note/', require('./api/notes'));
    app.use('/api/question/', require('./api/questions'));
    app.use('/api/author/', require('./api/authors'));
};
