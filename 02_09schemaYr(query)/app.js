const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors')

const articles=[
  {id:'1',title:'article 1',body:'article1 1 body'},
  {id:'2',title:'article 2',body:'article1 2 body'},
  {id:'3',title:'article 3',body:'article1 3 body'}
]
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Article {
      id:ID!
      title: String!,
      body: String! 
      tagList: [String!]
    }

    type Query {
      # query all
      articles: [Article], 
      # query by id
      article(id:ID!): Article
    }
`);
 
// The root provides a resolver function for each API endpoint
const root = {
  articles: () => {
    return articles;
  },
  article: ({id}) => {
    console.log(id)
    return articles.find(article => article.id===id);
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