const express = require('express')
const routes = require('./routes/api')
const dotenv = require('dotenv').config();

const app = express();
app.use(routes);



app.listen(process.env.port || 4000, function(){
    console.log("hello world")
});

app.get('/',function(req,res){
    console.log("endpoint");
    res.send("Response");
})


