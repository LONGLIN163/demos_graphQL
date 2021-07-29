
/*
const { ApolloServer, gql } = require('apollo-server');

// 1. define schema
const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    }
  ];
  
// 2. define resolvers
const resolvers = {
    // All the queries and mutations r written here now.
    Query: {
      books: () => books,
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
*/

const express = require('express');
const { ApolloServer,gql } = require('apollo-server-express'); // only working with V 2+
//const { typeDefs, resolvers } = require('./schema');
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    }
];
const resolvers = {
    Query: {
      books: () => books,
    },
  };


async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // combine apollo and express together
  server.applyMiddleware({ app });

  // express service
  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  // apollo service
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  //return { server, app };
}

startApolloServer();
