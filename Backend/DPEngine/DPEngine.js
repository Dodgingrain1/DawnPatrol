// express stuff
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS (browser security)
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

const planeRoutes = require('./Routes/planes.js');
const playerRoutes = require('./Routes/players.js');
const gameRoutes = require('./Routes/games.js');
const userRoutes = require('./Routes/users.js');

// mongoose stuff
const mongoose = require('mongoose');
MONGODB_URI="mongodb://localhost:27017/dawnPatrol";

mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)
    .then(()=>{
        app.listen(3000, ()=> {
            console.log('DPEngine API listening on port 3000')
        })
    })
    .catch((error)=>console.log(error));

// routes
app.get('/',(req, res, next) =>{
    res.send('DPEngine API get response');
})

app.use('/planes', planeRoutes);
app.use('/players', playerRoutes);
app.use('/games',gameRoutes);
app.use('/users', userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {message: error.message}
    });
})
