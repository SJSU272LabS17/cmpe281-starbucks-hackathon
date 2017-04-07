var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = "8090";
/*
var conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);
*/

mongoose.connect('mongodb://127.0.0.1/');

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var router = express.Router();  
router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome!' });
 });



app.use('/sanjose', router);
app.listen(port, function () {
  console.log('Example app listening on port!' + port);
})


