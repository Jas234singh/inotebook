const mongoose = require('mongoose');
const mongoURI ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1";
// const connectToMongo = async ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongo successfully");
//127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1"
//     })&serverSelection
// }
const connectToMongo = async () => {
    try {
    //   mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully!"); 
    } catch (error) {
      console.log(error);
    }
  };
module.exports = connectToMongo;