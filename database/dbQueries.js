/*
 * File: dbQueries.js
 * Project: appstreet-test
 * File Created: Sunday, 26th January 2020 3:09:01 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sunday, 26th January 2020 3:09:01 pm
 * Modified By: digvijay (rathore.digvijay10@gmail.com)
 */

const connection = require('./dbConnection.js');
const config = require('./dbConfig.js');
const db = connection.getDb;

const queries = {};


queries.countDataPresent = function (query, cb) {
    db().db(config.db_name).collection('products').countDocuments(query, function (err, result) {
        cb(err, result);
    });
};

queries.insertData = function (data, cb) {
    db().db(config.db_name).collection('products').insertMany(data, function (err, result) {
        cb(err, result);
    });
};


queries.findProducts = function (query, skipData, limitData, cb) {
    db().db(config.db_name).collection('products').find(query).skip(skipData).limit(limitData).toArray(function (err, result) {
        cb(err, result);
    });
};

queries.getSpecificDetails = function (filter, cb) {
    db().db(config.db_name).collection('products').findOne(filter, function (err, result) {
        cb(err, result);
    });
};

module.exports = queries;