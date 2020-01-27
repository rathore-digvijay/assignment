/*
 * File: createProducts.js
 * Project: appstreet-test
 * File Created: Sunday, 26th January 2020 2:51:10 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sunday, 26th January 2020 2:51:11 pm
 * Modified By: digvijay (rathore.digvijay10@gmail.com)
 */

const async = require('async');
const dbQuery = require('../database/dbQueries.js');
const productData = require('../config/products.json');

const createProductsCtrl = {};

/**
 * This method checks if any data is present in collection or not. If yes then do not insert the data,
 * else insert the data via neext function
 * @param {Object} params Empty object
 * @param {Function} cb Callback function
 */
const checkDataPresent = (params, cb) => {
    console.log("going to check if default data present or not");
    dbQuery.countDataPresent({}, function (err, countResult) {
        if (!err && countResult > 0) {
            cb('No need to insert data, as already present');
        } else {
            cb(null, params);
        }
    });
};

/**
 * This method insert the default data which is present in the json format in file.
 * @param {Object} params Empty object
 * @param {Function} cb Callaback function
 */
const insertDefaultData = (params, cb) => {
    console.log("going to insert default data");
    const data = productData.products;
    dbQuery.insertData(data, function (err, result) {
        if (err) {
            cb("Error while insertring data", err);
        } else {
            cb(null, "Data inserted successfully");
        }
    });
};

/**
 * This method is used to insert the default data in the products collection.
 * Executed on server start.
 */
createProductsCtrl.createDefaultData = () => {
    console.log("inside create default data");
    async.waterfall([
        async.apply(checkDataPresent, {}),
        insertDefaultData
    ], function (err, result) {
        if (err) {
            console.log("Error while inserting default data", err);
        } else {
            console.log("Default data successfully inserted");
        }
    });
};



module.exports = createProductsCtrl;