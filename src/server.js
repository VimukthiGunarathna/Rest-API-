const express = require('express');
const bodyParser = require('body-parser');


//Create the express app
const app=express();

//parse request of content-type-application/x-wwwform-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//parse requests of content-type-application/json
app.use(bodyParser.json());

//route
app.get('/user',(req,res)=>{
    res.json({"message" :"Welcome to Easy Notes"})
});

//Configuring the database
const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//db Connection
mongoose.connect(dbConfig.url)
.then(()=>{
    console.log("Successfully Connected to the DB");
}).catch(err =>{
    console.log("Could not connect to the DB.Exiting now");
    process.exit();
});

//listen for requests
app.listen(3000,()=>{
    console.log("Server is listening to port 3000");
});