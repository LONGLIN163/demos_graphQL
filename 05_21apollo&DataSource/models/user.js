const mongoose=require("mongoose")
// just like a pattern of the constructor
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
// just like a constructor,and export it 
module.exports = mongoose.model('User', userSchema);
