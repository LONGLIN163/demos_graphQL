
const express = require('express');
const { ApolloServer,gql } = require('apollo-server-express'); // only working with V 2+
//const { typeDefs, resolvers } = require('./schema');
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String
  }

  type Query {
    books: [Book]
    numberSix: Int! # Should always return the number 6 when queried
    numberSeven: Int! # Should always return 7
    user(id: ID!): User
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
const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet'
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy'
  }
];
const resolvers = {
    Query: {
      books: () => books,
      numberSix() {
        return 6;
      },
      numberSeven() {
        return 7;
      },
      user(parent, args, context, info) {
        console.log(args)
        return users.find(user => user.id === args.id);
      }
    }
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
