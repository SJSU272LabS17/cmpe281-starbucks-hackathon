var express = require('express');
var mongoose = require('mongoose');
var mongoOrder = require('./order')
var app = express();
var bodyParser = require('body-parser');
var port = "8090";
var router = express.Router();  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/*
var conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);
*/

mongoose.connect('mongodb://127.0.0.1:27017/orders');

router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome!' });
 });

router.route('/orders')
	.get(function(req, res){
		console.log(req.body);
		var response = {};
		mongoOrder.find({}, function(err, orders){
			if(err)
				response = {"error" : true, "message": "Error getting data"};
			else
				response = {"error" : false, "message": orders};
			res.json(response);
		});
	})

	.post(function(req, res){
		var db = new mongoOrder({coffeename: req.body.coffeename, mugsize: req.body.mugsize});
		console.log(db);
		var response = {};
		db.save(function(err){
			if(err)
				response = {"error": true, "message" : "Error while adding data"};
			else
				response = {"error": false, "message" : "Order placed successfully"};
			res.json(response);
		});
		
	});

router.route('/orders/:orderid')

	.get(function(req, res){
		console.log(req.params.orderid);
		var response = {};
		mongoOrder.find({orderid: req.params.orderid}, function(err, order){
			if(err){
                                 response = {"error" : true, "message": err};
			}
                        else{
                                 response = {"error" : false, "message": order };
			}
                        res.json(response);

		});
	})

	.delete(function(req, res){
		var response = {};
		mongoOrder.findById(req.param.orderid, function(err, data){
			if(err)
				response = {"error" : true, "message": "Error getting data"};
			else{
				mongoOrder.remove({orderid : req.params.orderid}, function(err){
					if(err)
                                 		response = {"error": true, "message" : "Error while deleting data"};
                         		else
                                 		response = {"error": false, "message" : "Order deleted successfully"};
					res.json(response);

				});
			}
		});
	})

app.use('/sanjose', router);
app.listen(port, function () {
  console.log('Example app listening on port!' + port);
})
