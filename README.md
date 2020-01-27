# Assignment

This is the test assignment given by Appstreet


### Tech

The work done to create API is done in:

* [node.js](https://nodejs.org/) - evented I/O for the backend (v8.16.1)
* [Express](https://expressjs.com/) - fast node.js network app framework
* [MongoDb](https://www.mongodb.com/) - NoSQL Document database with scalability and flexibility.



### Installation

Test assignment requires [Node.js](https://nodejs.org/) and MongoDb on system to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd appstreet_test (change directory to appstreet_test)
$ sh startDatabase.sh  (start mongoDb database with this file startDatabase.sh)
$ npm install (install  required dependencies)
$ npm start (start the server)
```
Server will start on localhost:3000

After 1 sec to the start of the server the database products details are inserted. 


### API

* To list products - /list  (type - GET)
	
	Description - This API list the purchasable products. The pagination is implemented ans uses filters query param. The page size is 5.

	Query Params - 
		search - String of characters, On the basis of this parameter the products which contain this
			in name gets returned
		filters - Number, this optional paramater is used for page numbers. If we provide any number 		then the data of that page will be returned. Page size is 5

	Tested Request -

	http://127.0.0.1:3000/list/?search=&filters=1
	http://127.0.0.1:3000/list/?search=iph&filters=1


	Response - 
		Successfull   - {success: true, result: [Array of Objects containing products]}
			{success: true, result: [{
				"_id":"5e2dc58f1ed7612f9634bcfb",
				"productId":"123",
				"name":"iphone x",
				"description":"Iphone cat 1",
				"image":"image data",
				"price":64000,
				"discountPrice":63999,
				"storage":"64 GB",
				"color":"Red"
				}, {}, ...]
			}
		Unsuccessfull - {success: false, info: "error information string"}


* To get detailed info - /details/:id  (type - GET)

	Description - This API is used to get the detailed data of the specific product whose 
		id is specified in the path parameter as id. Also it attaches the details of the 
		related productes to that of whose details are searched.

	Request- 

	http://127.0.0.1:3000/details/5e2dc58f1ed7612f9634bcfb
	
	Response - 
		Successfull   - {success: true, result: {Object containing details of product and related 			product info }}

			{success: true, result: {
				"_id":"5e2dc58f1ed7612f9634bcfb",
				"productId":"123",
				"name":"iphone x",
				"description":"Iphone cat 1",
				"image":"image data",
				"price":64000,
				"discountPrice":63999,
				"storage":"64 GB",
				"color":"Red",
				"relatedProducts":[{
					"_id":"5e2dc58f1ed7612f9634bcfb",
					"productId":"123",
					"name":"iphone x",
					"description":"Iphone cat 1",
					"image":"image data",
					"price":64000,
					"discountPrice":63999,
					"storage":"64 GB",
					"color":"Red"}, {}, ...]
			}}

		UnsuccessFull - {success: false, info: "error info"}

### Structure and Files

* 'config/products.json'

In the config director the file products.json contains the data of the products which is going to be stored in the products collection of the database.

* 'database/dbConfig.js'

Contains the configs of the database

* 'database/dbConnection.js'

this file is used for establishing database connection