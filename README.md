#ADDRESS BOOK

## Running instructions

To start the client:
```sh
# cd into project root
# install dependencies
$ yarn install
# to use postgresql
$ yarn run start
```

To start the server, navigate to the server folder:
```sh
# cd into project root/server
# install dependencies
$ yarn install
# to use postgresql
$ yarn add pg pg-hstore
$ yard run start
```

Config set-up for server:
config/connection.js
~~~~
const development = {
  database: 'address_book',
  username: 'root',
  password: 'password',
  host: 'localhost',
  dialect: 'mysql' || 'postgres' || 'sqlite',
};
~~~~

*Note*: Used mysql for all development/testing but should work for others listed above as well.

## Information
Used create-react-app on the front end client to save myself set-up time.
Used https://github.com/aichbauer/express-graphql-boilerplate for back end and stripped away as much as I could to keep it simple (removed REST API, etc.)

