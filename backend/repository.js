var mongodb = require('mongodb');
var credentials = require('./../private/config').mongodb;
var Promise = require("bluebird");

var MongoClient = mongodb.MongoClient;
var url = "mongodb://" + credentials.user + ":" + credentials.password + "@ds135519.mlab.com:35519/text_convert_machine_db";
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

repository.createFile = function (name, content, res) {
    repository.db.collection(filesCollection).insertOne({
        name: name,
        content: content,
        createdDate: new Date()
    }, function (err, result) {
        res.json({"message": "successfully created " + result});
    });
};

repository.updateFile = function (id, htmlExport, pdfExport, res) {
    return new Promise(function (success, failure) {
        if (!validateId(id, res)) {
            failure();
        }
        var updatedAttr = {};
        if (htmlExport) {
            updatedAttr.htmlExport = htmlExport;
        }
        if (pdfExport) {
            updatedAttr.pdfExport = pdfExport;
        }

        repository.db.collection(filesCollection).update({_id: ObjectID(id)},
            {$set: updatedAttr},
            function (err, result) {
                if (err) {
                    failure(err);
                } else {
                    if (res) {
                        res.json({"message": "successfully updated " + result});
                    }
                    success();
                }
            });
    });
};

repository.getAllFiles = function (res) {
    repository.db.collection(filesCollection).find().toArray(function (err, items) {
        res.json(items);
    });
};

repository.getFile = function (id, callback) {
    validateId(id);
    repository.db.collection(filesCollection).findOne({
        _id: ObjectID(id)
    }, callback);
};

repository.deleteFile = function (id, res) {
    return new Promise(function (success, failure) {
        if (!validateId(id, res)) {
            failure();
        } else {
            repository.db.collection(filesCollection).remove({
                _id: ObjectID(id)
            }, success);
        }
    });
};

function validateId(id, res) {
    if (typeof id !== "string") {
        var errorJson = {"error": "_id should be a string"};
        if (res) {
            res.json(errorJson)
        }
        return false;
    }
    return true;
}

module.exports = repository;