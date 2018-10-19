var express = require('express'),
    http = require('http');

var app = express();

app.get('/', function(req, res, next) {
    res.send('Hello from junkan server!');
});

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});