var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/workshoptdc")
    .then(conn => global.conn = conn.db("workshoptdc"))
    .catch(err => console.log(err));

function findAll(callback) {
    global.conn.collection("customers").find().toArray(callback);

}

module.exports = { findAll };