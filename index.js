// The main application script, ties everything together.
var bodyParser = require('body-parser');
var config = require('./server/config/config');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// connect to Mongo when the app initializes and 
// drop the db before seeding
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server connected to the database.');
  }
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/app'));

var api = require('./server/routes/index')(app, express, io);
app.use('/api', api);

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

http.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port: ' + config.port);
  }
});
