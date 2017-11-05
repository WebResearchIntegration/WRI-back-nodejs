/** @module routes */

module.exports = function(app) {
    app.use('/api/article/', require('./api/articles'));
};