/*
 * File: productMgmt.js
 * Project: appstreet-test
 * File Created: Sunday, 26th January 2020 4:24:33 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sunday, 26th January 2020 4:24:33 pm
 * Modified By: digvijay (rathore.digvijay10@gmail.com)
 */

const dbQueries = require('../database/dbQueries.js');
const ObjectId = require('mongodb').ObjectId;
const async = require('async');

const pageSize = 5;
const productCtrl = {};

/**
 * This method returns the list of the purchasable products. Used two query params:
 * search- to search with the name of product (string)
 * filter - page number clicked (number) used for pagination
 */
productCtrl.listProducts = (req, res) => {
    console.log("inside list products", req.query);
    const query = {};
    // if anything in search param do partial search
    if(!!req.query.search){
        query.name = eval('/'+req.query.search+ '/i');
        // query.name = { $regex: '/'+req.query.search+'/i' }; 
    }
    let skipData = 0;
    let limitData = pageSize;
    if (!!req.query.filters && Number(req.query.filters)){
        skipData = (Number(req.query.filters) - 1) * pageSize;
    }
    console.log("skipData", skipData);
    console.log("limitData", limitData);
    dbQueries.findProducts(query, skipData, limitData, function(err, searchResult){
        if(err){
            return res.json({success: false, info: "Error while getting purchasable product"});
        }else if(searchResult.length > 0){
            return res.json({success: true, result: searchResult});
        }else{
            return res.json({success: false, info: "No products to purchase"});
        }
    });
};

/**
 * This method is used to find the detailed info of the Product whose id is specified.
 * @param {Object} params Object containing the path param id
 * @param {Function} cb Callback function to the next
 */
const getSpecificProductDetails = (params, cb) => {
    console.log("inside get specific dfetails of the product", params);
    const query = {};
    query._id = ObjectId(params.id);
    dbQueries.getSpecificDetails(query, function(err, specificResult){
        if(!err && !!specificResult){
            cb(null, specificResult);
        }else{
            cb('No Data for this Id found');
        }
    });
};

/**
 * This method get the info of the related/similar products to that which is searched.
 * @param {Object} params Object containing the product details
 * @param {Function} cb Callback function
 */
const getRelatedItems = (params, cb) =>{
    const query = {name: params.name};
    dbQueries.findProducts(query, 0, 10, function(err, result){
        if(err || result.length < 1){
            params.relatedProducts = [];
            cb(null, params);
        }else{
            params.relatedProducts = result;
            cb(null, params);
        }
    });
};

/**
 * This is the main method which is called top get the full details of product
 * with its related items details
 */
productCtrl.getProductDetails = (req, res) => {
    console.log("find specific product");
    async.waterfall([
        async.apply(getSpecificProductDetails, req.params),
        getRelatedItems
    ], function(err, result){
        if(err){
            return res.json({success: false, info: err});
        }else{
            return res.json({success: true, result: result});
        }
    });
};

module.exports = productCtrl;