const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors')
//var cors = require('cors')
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  # Query Strickly speaking it is an 'Object Type', called 'root type'.
  # Query It is the entry for all query.
  type Query {
    # By default, everything can be empty, returns null 
    # If we dont want to allow empty return, place exclamation mark behind, it will show error message...
    xixi: String
    haha: Int,
    user: User,
    article: Article,
    foo:String! 
  }

  # We also can define custom obj type. But this type of obj r normally quiered in Query... 
  type User {
    # [String]! imply that current arr can not be null, but can be empty
    # [String!]! imply that current arr can not be null, can be empty, but can not have ele null.
    name: String,
    age: Int,
    hobbies:[String!]!,
    scores:[Score]
  }
  # ...or embed into other obj. 
  type Article {
    title: String,
    content: String,
    
    # **Incorrect, bcs we can not define an obj inside a obj directly**
    # author: {
    #   name: String,
    #   age: Int
    # }

    author: User
  }

  type Score {
    name: String, 
    score: Float
  }

`);
 
// The root provides a resolver function for each API endpoint
const root = {
  // all function here r so-called resolver.
  xixi: () => {
    return 'Hello world!';
  },
  haha: () => {
    return 456;
  },
  user: () => {
    return  {
       name:"LONG",
       age:20,
       //hobbies:["eat","drink","program"],
       hobbies:[null],
       scores:[
         {name:'yuwen',  score:80},
         {name:'shuxue', score:90},
         {name:'yingyu', score:78}
       ]
    }
  },
  article: () => {
    return  {
      title: "my article",
      content: "hahahahahhahahahhahahah",
      //author : user
      author : {
        name:"LONG",
        age:20
      }
    };
  }
};
 
const app = express();
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');