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

var data = {"firstName":"ADFDA","lastName":"ADFAF","email":"BOB@gmail.com","phone":"415-222-2222","address":"adsff","city":"adfaf","state":"CA","zip":"94015","category":"Broken Pipe", "gender": "male", "education": "High School Diploma", "description": 'TEST DESCRTIPTION'};

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

app.listen(port);
console.log("Server now listening on port " + port);