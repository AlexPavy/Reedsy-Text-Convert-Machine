var mongodb = require('mongodb');
var credentials = require('./../private/config').mongodb;

var MongoClient = mongodb.MongoClient;
var url = "mongodb://"+credentials.user+":"+credentials.password+"@ds135519.mlab.com:35519/text_convert_machine_db";

var mydb = {};
var filesCollection = "files";

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        mydb.db = db;
    }
});

mydb.createFile = function(name) {
    mydb.db.collection(filesCollection).insertOne({
        "name" : name,
        "createdDate" : new Date()
    });
};

// mydb.findUser = function(uuid) {
//     return mydb.db.collection('users').find({
//         "uuid" : uuid
//     }).limit(1);
// };
//
mydb.getAllFiles = function() {
    return mydb.db.collection(filesCollection).find({});
};
//
// mydb.deleteAllUsers = function() {
//     mydb.db.collection('users').deleteMany({});
// };

module.exports = mydb;