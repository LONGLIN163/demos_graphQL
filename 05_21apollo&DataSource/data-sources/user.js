// import { MongoDataSource } from 'apollo-datasource-mongodb'

// export default class Users extends MongoDataSource {
//   getUser(userId) {
//     return this.findOneById(userId)
//   }
// }


//***use node common js syntax***
const {MongoDataSource} = require('apollo-datasource-mongodb');
class Users extends MongoDataSource {
  // there r 4 api methods by default
  getUser(userId) {
    return this.findOneById(userId)// database operations
  }

  //the other query we need to user "this.model" 
  //use data model to access db
  getUsers(){
    console.log(this.model)
    return this.model.find();// get model from User
  }
}
module.exports = Users;