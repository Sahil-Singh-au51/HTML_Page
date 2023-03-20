const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/student-api",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUndefinedTopology:true
    // in my case we dident need above 3 lines
}).then(()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log("no connection");
})