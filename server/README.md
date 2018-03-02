# express-graphql

> Express GraphQL API with JWT Authentication and support for sqlite, mysql, and postgresql

- support for [sqlite](https://www.sqlite.org/), [mysql](https://www.mysql.com/), and [postgresql](https://www.postgresql.org/)
- support for [graphiql](https://github.com/graphql/graphiql) an easy way exploring a GrapgQL API
- environments for `development`, `testing`, and `production`
- linting via [eslint](https://github.com/eslint/eslint)
- tests running with [AVA](https://github.com/avajs/ava)
- built with [npm sripts](#npm-scripts)

## Quick Intro


# requesting a User via the GraphQL API
curl -i -H "Content-Type:application/json" -H "Authorization: Bearer <token>" -X POST -d '{"query": "{user{id, username}}"}'  http://localhost:2017/graphql
# creating a Note for a user via the GraphQL API
curl -i -H "Content-Type:application/json" -H "Authorization: Bearer <token>" -X POST -d '{"query": "mutation{createNote(UserId:1,note:\"this is a note\"){id,UserId,note}}"}' http://localhost:2017/graphql
# requesting a User with its Notes via the GraphQL API (nested Query)
curl -i -H "Content-Type:application/json" -H "Authorization: Bearer <token>" -X POST -d '{"query": "{user{id, username, notes{id, note}}}"}'  http://localhost:2017/graphql
```

## Install and Use

Start by cloning this repository

then

```sh
# cd into project root
# install dependencies
$ yarn
# to use postgresql
$ yarn add pg pg-hstore
```

or

```sh
$ cd express-graphql-boilerplate
$ npm i
$ npm i pg pg-hstore -S
```

MySQL is support out of the box.

## Folder Structure

This boilerplate has four main directories:

- api - for Controllers, Queries, Mutations, Models, Types, Services, etc.
- config - for routes, database, etc.
- test - using [AVA](https://github.com/avajs/ava)

## RootQuery and Schema

The Schema holds the RootQuery and the RootMutation which holds all the other Queries and Mutations, that is applied to one route which is your entrypoint for your GraphQL API. The Schema has to be exported and used in the `./api/api.js` file.

```js
// import required GraphQL Types
const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

// import Query and Mutations
const userQuery = require('./User/UserQuery');
const {
  updateUser,
  deleteUser,
} = require('./User/UserMutation');

// add Queries to RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the RootQuery which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    user: userQuery,
  }),
});

// add Mutations to RootMutations
const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root Mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    updateUser,
    deleteUser,
  }),
});

// add RootQuery and RootMutation
// to your Schema
const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = Schema;
```

To use the this Schema for your API we need to add it to a route.
If we set graphiql to `true` we get a nice webinterface to test our GraphQL Queries.

```js
api.get('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: false,
}));
api.post('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: false,
}));
```

The entrypoint for our GraphQL API is `http://localhost:2017/graphql`

## Models

### Create a Model

Controllers in this boilerplate have a naming convention: `Model.js` and uses [Sequelize](http://docs.sequelizejs.com/) to define our Models, if you want further information, read the [Docs](http://docs.sequelizejs.com/).

## Config

Holds all the server configurations.

## Connection and Database

> Note: If you use mysql make sure mysql server is running on the machine

> Note: If you use postgresql make sure postgresql server is running on the machine

This two files are the way to establish a connaction to a database.

You only need to touch connection.js, default for `development` is mysql.

> Note: To run a postgres db run these package with: `yarn add pg pg-hstore` or `npm i -S pg pg-hstore`

Now simple configure the keys with your credentials.

```js
{
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
}
```

To not configure the production code.

To start the DB, add the credentials for production. Add `environment variables` by typing e.g. `export DB_USER=yourusername` before starting the API.

### npm start

This is the entry for a developer.

- runs a **nodemon watch task** for the all files in the project root
- sets the **environment variable** `NODE_ENV` to `development`
- opens the db connection for `development`
- starts the server on 127.0.0.1:2017

### npm test

This command:

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript) without arrow-parens rule for **better readability**
- sets the **environment variable** `NODE_ENV` to `testing`
- runs `nyc` the cli-tool for [istanbul](https://istanbul.js.org/) for test coverage
- runs `ava` for testing with [AVA](https://github.com/avajs/ava)

## npm run production

This command:

- sets the **environment variable** to `production`
- opens the db connection for `production`
- starts the server on 127.0.0.1:2017 or on 127.0.0.1:PORT_ENV

Before running on production you have to set the **environment vaiables**:

- DB_NAME - database name for production
- DB_USER - database username for production
- DB_PASS - database password for production
- DB_HOST - database host for production
- JWT_SECRET - secret for json web token

Optional:

- PORT - the port your API on 127.0.0.1, default to 2017

### other commands

- `npm run dev` - simply starts the server without a watch task
- `npm run lint` - linting with [eslint](http://eslint.org/)
- `npm run nodemon` - same as `npm start`
- `pretest` - runs linting before `npm test`
- `test-ci` - only runs tests, nothing in pretest, nothing in posttest, for better use with ci tools
