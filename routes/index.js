var express 		 = require('express');
var router 			 = express.Router();
const productMgmt 	 = require('../js/productMgmt.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// list purchasable product API
router.get('/list/', function(req, res){
	console.log("\n Inside get purchasable product API \n");
	productMgmt.listProducts(req, res);
});

// get specific details of the product
router.get('/details/:id', function(req, res){
	console.log("\n Inside get dateiled API \n");
	productMgmt.getProductDetails(req, res);
});

module.exports = router;
