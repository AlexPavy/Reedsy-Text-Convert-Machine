var mongodb = require('mongodb');
var credentials = require('./../private/config').mongodb;

var MongoClient = mongodb.MongoClient;
var url = "mongodb://"+credentials.user+":"+credentials.password+"@ds135519.mlab.com:35519/text_convert_machine_db";
var ObjectID = mongodb.ObjectID;

var repository = {};
var filesCollection = "files";

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        repository.db = db;
    }
});

repository.createFile = function(name, content, res) {
    repository.db.collection(filesCollection).insertOne({
        "name" : name,
        "content" : content,
        "createdDate" : new Date()
    }, function (err, result) {
        res.json({"message" : "successfully created " + result});
    });
};

repository.getAllFiles = function(res) {
    repository.db.collection(filesCollection).find().toArray(function(err, items) {
        res.json(items);
    });
};

repository.getFile = function(id, callback) {
    if (typeof id !== "string") {
        res.json({"error" : "_id should be a string"})
    }
    repository.db.collection(filesCollection).findOne({
        _id : ObjectID(id)
    }, callback);
};

repository.deleteFile = function(id, res) {
    if (typeof id !== "string") {
        res.json({"error" : "_id should be a string"})
    }
    repository.db.collection(filesCollection).remove({
        _id : ObjectID(id)
    }, function() {
        res.json({"message" : "successfully deleted by id: " + id});
    });
};

module.exports = repository;