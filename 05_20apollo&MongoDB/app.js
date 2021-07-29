
const express = require('express');
const { ApolloServer,gql } = require('apollo-server-express'); // only working with V 2+
const {User}= require('./models/')// make sure index.js excuted

const typeDefs = gql`
  # A library has a branch and books
  type User {
    # ****In mongodb, id must be _id by default. and the _id in side mongodb has to be MongoDB ObjectId.****
    _id: ID!, 
    name: String!,
    age:Int
  }

  type Query {
    users: [User!]
    user(id:ID!):User
  }
`
const resolvers = { 
  Query: {
    async users() {
      //console.log("context---",context)
      //console.log("args---",args)
      const users = await User.find()
      console.log("users---",users)
      return users;
    },
    async user(parent,{id}) {
      const user = await User.findById(id)
      console.log("user---",user)
      return user;
    }
  }
};


async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context(req){
       return { 
         data:"haha"
       }
    }
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();

// query data

/**

# Write your query or mutation here
# {
#   users {
#     _id,name,age
#   }
# }

{
  user(id:"6102e5f742a093f61e8e6139"){
    name,age
  }
}

 */