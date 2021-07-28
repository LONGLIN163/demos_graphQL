const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid'); // get no-repeat number

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

    # query entry
    type Query {
      # query all
      articles: [Article], 
      # query by id
      article(id:ID!): Article
    }

    # args obj must use Input to define
    input CreateArticleInput {
      title:String!
      body:String!
      tagList:[String]
    }
    input UpdateArticleInput {
      title:String!
      body:String!
      tagList:[String]
    }

    type DelStatus{
      success: Boolean!
    }

    # crud entry
    type Mutation{
      # If we dont have too many args, we can just write args inside func
      # createArticle(title:String!,body:String!):Article # return an Article type obj

      # If there is a lot of args, we need to extract an obj from args
      createArticle(article:CreateArticleInput):Article
      updateArticle(id:ID!,article:UpdateArticleInput):Article
      delArticle(id:ID!):DelStatus

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
  },
  createArticle: ({article}) => { // destructure out article from args
    //console.log(args)
    article.id=uuidv4();// get and add no-repeat number as ID
    //console.log(article.id)
    articles.push(article)
    return article;
  },
  updateArticle: ({id,article:tempArticle}) => { // destructure out article from args, and rename as postArticle
    console.log(id,tempArticle)
    const article=articles.find(article=>article.id===id);
    article.title=tempArticle.title;
    article.body=tempArticle.body;
    return article;
  },
  delArticle: ({id}) => { // destructure out article from args, and rename as postArticle
    const index=articles.findIndex(article=>article.id===id)
    console.log("index------",index)
    articles.splice(index,1)
    //articles.filter(article=>article.id!=id)
    return {
      success:true
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

