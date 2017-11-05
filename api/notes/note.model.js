const db = require('seraph')({
    server: require('../../config').DATABASE_URL,
    user: "neo4j",
    pass: "root",
    id: "id"
}),
    nodeModelGenerator = require('seraph-model'),
    NoteNode = nodeModelGenerator(db, 'Note');