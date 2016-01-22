[![Test Coverage](https://codeclimate.com/repos/56a2211afaf90c39110062e7/badges/8df98f2fa7ab990b6850/coverage.svg)](https://codeclimate.com/repos/56a2211afaf90c39110062e7/coverage)

#Frodocms

## Document Management System (Material Design, Materialize CSS, Bootstrap Material Design, Node, Express, Mongo)

##  Models
The models contained are `users`, `documents` and `roles`. A document belongs to a `User` and is related to them using the `ownerId`. A `Role` is related to the `User` using the `id` field. Each `Document` has restrictions on the roles. A `Role` also relates to the `Document` using the `title`.

## Testing
Back end testing is done using the `superagent` node module which is installed via `npm` when you install all the other node modules in `package.json`. `superagent` is used to make requests to the api routes and receive responses. The tests are run on terminal using the command: 
```
jasmine-node tests/ --verbose
```
Front end testing is done using `karma` and `sinon` to test the angular controllers, services and filters.
Circle ci is deployed as the testing environment. The mongo database is set up on its ubuntu server and the tests are run on it once all the dependencies are installed (`npm install` and `bower install` need to run). Once `gulp` and `karma` are installed globally then the tests are run by the command `npm test` defined in the package.json.

## Express Routes
The routes are created using `express` routers. The server needs to be started using the terminal command `nodemon server.js`. Our server file is called `server.js`. The routes are defined in the `./server/routes/api.js` file.

## Mongo Database
One needs an installation of `Mongodb` locally. Our database is called `docms`. We connect to it using the configurations in `./server/config/config.js` file.
```
'database': 'mongodb://localhost/docms',
```
This line in particular is needed. To use this database throughout the run-time of the application, one needs to run the command `mongod` on the terminal.
The database needs to be dropped first, before the tests are run. It is dropped in the express server by the command:
```
mongoose.connection.db.dropDatabase(function(err) {
  if (err) {
    return err;
  } else {
    console.log('Dropped database');
    (function() {
      seed.seeder();
    })();
  }
});
```
## Front End
The front end is built using Angular, Material CSS, Bootstrap-Material-Design and Materialize.


`TIA`