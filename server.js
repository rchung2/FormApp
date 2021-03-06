var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3000);
var bodyParser = require('body-parser');
var ip = "127.0.0.1";

app.use(express.static(__dirname + "/client"));
bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var data = '';

app.get('/', function(req, res) {
  res.redirect('/');
});

app.post('/validated', function(req, res) {
    console.log(req.body);
    data = req.body;
    res.send("validating...");
})

app.get('/formReview', function(req, res) {
   res.send(data);
});

app.get('/terms', function(req, res) {
   res.send("<html><head><Title>Terms and Conditions</Title></head></html>");
});

app.listen(port);
console.log("Server now listening on port " + port);