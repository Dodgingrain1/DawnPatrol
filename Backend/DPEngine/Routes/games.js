const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth.js');
const Game = require('../Models/gameModel.js');
const Player = require('../Models/playerModel.js');

// all games
router.get('/', checkAuth, async(req,res, next)=>{
    try{
        const games = await Game.find({})
            .then(docs =>{
                const response = {
                    count: docs.length,
                    games: docs.map(doc =>{
                        return{
                            _id: doc._id,
                            id: doc.id,
                            players: doc.players,
                            currentTurn: doc.currentTurn,
                            request: {
                                type: 'GET',
                                description: 'get specific game',
                                url: 'http://localhost:3000/game/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response);            
            });
    }   
    catch(error){
        res.status(500).json({message: error.message});         
    } 
});

// get a single game
router.get('/:id', checkAuth, async(req,res, next)=>{
    try{
        const {id} = req.params;
        const game = await Game.findById(id);
        if (!game){
            return res.status(404).json({message: `cannot find game with id ${id}`});
        }
        const request = {
                type: 'GET',
                description: 'get all games',
                url: 'http://localhost:3000/games'
        };

        // there has to be a cleaner way to do this...
        const gameWithRequest = game.toJSON();
        gameWithRequest.request = request;
        res.status(200).json(gameWithRequest);
    }   
    catch(error){
        res.status(500).json({message: error.message});         
    } 
});


// saves a game assuming properly formed req, return game
router.post('/', checkAuth, async (req, res, next)=> {
    try{
        // validate players
        for(let i=0; i< req.body.players.length; i++){
            const potentialPlayer = req.body.players[i];
            const player = await Player.findById(potentialPlayer);
            if (!player){
                return res.status(404).json({message: "Player not found"});
            }
        }

        // create new game
        const game = new Game(req.body);
        await game.save();

        res.status(201).json({
            createdGame: {
                id: game.id,
                players: game.players,
                currentTurn: game.currentTurn,
                request:{
                    type: 'GET',
                    description: 'get specific game',
                    url: 'http://localhost:3000/games/' + game._id
                }
            }
        });
    }
    catch(error){
        res.status(500).json({message: error.message});        
    }
});


// replace a game
router.put('/:id', checkAuth, async(req, res, next)=>{
  try{
    // validate players
    for(let i=0; i< req.body.players.length; i++){
        const potentialPlayer = req.body.players[i];
        const player = await Player.findById(potentialPlayer);
        if (!player){
            return res.status(404).json({message: "Player not found"});
        }
    }

    const {id} = req.params;
    const game = await Game.findByIdAndUpdate(id,req.body, {new: true});
    if (!game){
        return res.status(404).json({message: `cannot find game with id ${id}`});
    }

    const request = {
        type: 'GET',
        description: 'get game information',
        url: `http://localhost:3000/game/${id}`
    };

    // there has to be a cleaner way to do this...
    const gameWithRequest = game.toJSON();
    gameWithRequest._id = id;
    gameWithRequest.request = request;
    res.status(201).json(gameWithRequest);
  } 
  catch(error){
    res.status(500).json({message: error.message});  
  } 
});

// update game
router.patch('/:id', checkAuth, async(req, res, next)=>{
    try{
        // validate players
        if (req.body.hasOwnProperty("players")){
            for(let i=0; i< req.body.players.length; i++){
                const potentialPlayer = req.body.players[i];
                const player = await Player.findById(potentialPlayer);
                if (!player){
                    return res.status(404).json({message: "Player not found"});
                }
            }    
        }

        const {id} = req.params;
        const game = await Game.findByIdAndUpdate(id,req.body, {new: true});
        if (!game){
            return res.status(404).json({message: `cannot find game with id ${id}`});
        }

        const request = {
            type: 'GET',
            description: 'get game information',
            url: `http://localhost:3000/games/${id}`
        };

        // there has to be a cleaner way to do this...
        const gameWithRequest = game.toJSON();
        gameWithRequest.request = request;
        res.status(201).json(gameWithRequest);
    } 
    catch(error){
      res.status(500).json({message: error.message});  
    } 
});

// delete game
router.delete('/:id', checkAuth, async(req, res, next)=>{
  try{
    const {id} = req.params;
    const game = await Game.findByIdAndDelete(id);
    if (!game){
        return res.status(404).json({message: `cannot find game with id ${id}`});
    }

    const request = {
        type: 'GET',
        description: 'get all games',
        url: 'http://localhost:3000/games/'
    };

    // there has to be a cleaner way to do this...
    const gameWithRequest = game.toJSON();
    gameWithRequest.request = request;
    res.status(200).json(gameWithRequest);
  } 
  catch (error){
    res.status(500).json({message: error.message});  
  } 
});


module.exports = router;
