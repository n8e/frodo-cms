[![Code Climate](https://codeclimate.com/github/andela-nmartin/docms2/badges/gpa.svg)](https://codeclimate.com/github/andela-nmartin/docms2)
[![Test Coverage](https://codeclimate.com/github/andela-nmartin/docms2/badges/coverage.svg)](https://codeclimate.com/github/andela-nmartin/docms2/coverage)
# Document Management System (Node, Express, Mongo)

##  Models
The models contained are `users`, `documents` and `roles`. A document belongs to a `User` and is related to them using the `ownerId`. A `Role` is related to the `User` using the `id` field. Each `Document` has restrictions on the roles. A `Role` also relates to the `Document` using the `title`.

## Testing
Testing is done using the `superagent` node module which is installed via `npm` when you install all the other node modules in `package.json`. `superagent` is used to make requests to the api routes and receive responses. The tests are run on terminal using the command: 
```
jasmine-node tests/ --verbose
```

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


@3nj0y!