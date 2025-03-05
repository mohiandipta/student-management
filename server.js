const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./src/database/database');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./src/schemas/schema');
const resolvers = require('./src/resolvers');
const authenticate = require('./src/middleware/auth.middleware')

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const server = new ApolloServer({ 
    schema,
    context: ({ req }) => {
        if (!req) return {};

        // Extract operation name from request
        const operationName = req.body.operationName;

        // Skip authentication for the register mutation
        if (operationName === "register") {
            return {};
        }

        // Authenticate other requests
        const user = authenticate(req);
        return { user };
    }
});

server.start().then(() => {
    server.applyMiddleware({ app });

    sequelize.sync().then(() => {
        app.listen(4000, () => console.log("🚀 Server running at http://localhost:4000/graphql"));
    });
});
