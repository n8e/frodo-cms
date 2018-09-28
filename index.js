var env = process.env.NODE_ENV || 'development';
require('dotenv').load();

// The main application script, ties everything together.
var bodyParser = require('body-parser');
var config = require('./server/config')[env];
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = express();

// connect to Mongo when the app initializes and 
// drop the db before seeding
mongoose.connect(config.database[env], { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${config.database[env]}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./server/routes/index')(app, express);
app.use('/api', api);

app.get('/*', function (req, res) {
  res.sendFile('index.html', {
    root: './public/'
  });
});

var server = app.listen(config.port || 3000, function () {
  console.log('Express server listening on %d, in %s' +
    ' mode', server.address().port, app.get('env'));
});

module.exports = app;
