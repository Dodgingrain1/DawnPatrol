const express = require('express')
const app = express()

// routes
app.get('/',(req, res) =>{
    res.send('DPEngine API get response')
})

app.listen(3000, ()=> {
    console.log('DPEngine API listening on port 3000')
})

// need to ignore node_modules folder, etc

//const { MongoClient } = require('mongodb');

//MONGODB_URI="http://localhost:27017";

//const client = new MongoClient(MONGODB_URI);

//await client.connect();

