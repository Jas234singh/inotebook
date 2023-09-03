
const mongoose = require('mongoose');
const mongoURI  ="";
const connectTOMONgo =() =>{
    mongoose.connect(mongoURI,()=>{
        console.log("connnec sucees");
    })
}mongodb://0.0.0.0:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
