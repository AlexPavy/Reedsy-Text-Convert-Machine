var fs = require('fs');
var mkdirp = require('mkdirp');
var pdf = require('html-pdf');
var Promise = require("bluebird");

var filesDir = "./client/converted-files";

var HTML_TYPE = "html";
var PDF_TYPE = "pdf";

function createHTMLConversion(id, file, callback) {
    mkdirp(filesDir + '/' + HTML_TYPE, function () {
        fs.writeFile(getFilePath(id, HTML_TYPE), file.content, {}, callback);
    });
}

function createPDFConversion(id, file, callback) {
    mkdirp(filesDir + '/' + HTML_TYPE, function () {
        pdf.create(file.content, {format: 'Letter'})
            .toFile(getFilePath(id, PDF_TYPE),
                callback);
    });
}

function deleteConversions(id) {
    return Promise.all([
        new Promise(function (success, failure) {
            deleteConversion(id, HTML_TYPE, success, failure);
        }),
        new Promise(function (success, failure) {
            deleteConversion(id, PDF_TYPE, success, failure);
        })
    ]);
}

function deleteConversion(id, type, success, failure) {
    fs.stat(getFilePath(id, type), function (err) {
        if (err) {
            failure();
        } else {
            fs.unlink(getFilePath(id, type), success);
        }
    });
}

function getFilePath(id, type) {
    return filesDir + '/' + type + '/' + id + '.' + type;
}

module.exports = {
    "createHTMLConversion": createHTMLConversion,
    "createPDFConversion": createPDFConversion,
    "deleteConversions": deleteConversions
};