const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./src/config/database');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./src/schemas/schema');
const resolvers = require('./src/resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const server = new ApolloServer({ schema });

server.start().then(() => {
    server.applyMiddleware({ app });

    sequelize.sync().then(() => {
        app.listen(4000, () => console.log("🚀 Server running at http://localhost:4000/graphql"));
    });
});
