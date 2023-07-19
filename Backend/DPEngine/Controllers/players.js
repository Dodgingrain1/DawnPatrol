const Player = require('../Models/playerModel.js');

// all players
exports.players_get_all = async(req,res, next)=>{
    try{
        const players = await Player.find({})
            .then(docs =>{
                const response = {
                    count: docs.length,
                    players: docs.map(doc =>{
                        return{
                            _id: doc._id,
                            id: doc.id,
                            name: doc.name,
                            request: {
                                type: 'GET',
                                description: 'get specific player',
                                url: 'http://localhost:3000/players/' + doc._id
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
};

// get a single player
exports.players_get_one = async(req,res, next)=>{
    try{
        const {id} = req.params;
        const player = await Player.findById(id);
        if (!player){
            return res.status(404).json({message: `cannot find player with id ${id}`});
        }
        const request = {
                type: 'GET',
                description: 'get all players',
                url: 'http://localhost:3000/players'
        };

        // there has to be a cleaner way to do this...
        const playerWithRequest = player.toJSON();
        playerWithRequest.request = request;
        res.status(200).json(playerWithRequest);
    }   
    catch(error){
        res.status(500).json({message: error.message});         
    } 
};

// saves a player assuming properly formed req, return player
exports.players_save_one = async (req, res, next)=> {
    try{
        const player = new Player(req.body);
        await player.save();

        res.status(201).json({
            createdPlayer: {
                id: player.id,
                name: player.name,
                request:{
                    type: 'GET',
                    description: 'get specific player',
                    url: 'http://localhost:3000/players/' + player._id
                }
            }
        });
    }
    catch(error){
        res.status(500).json({message: error.message});        
    }
};

// replace a player
exports.players_replace_one = async(req, res, next)=>{
  try{
    const {id} = req.params;
    const player = await Player.findByIdAndUpdate(id,req.body, {new: true});
    if (!player){
        return res.status(404).json({message: `cannot find player with id ${id}`});
    }

    const request = {
        type: 'GET',
        description: 'get player information',
        url: `http://localhost:3000/players/${id}`
    };

    // there has to be a cleaner way to do this...
    const playerWithRequest = player.toJSON();
    playerWithRequest.request = request;
    res.status(201).json(playerWithRequest);
  } 
  catch(error){
    res.status(500).json({message: error.message});  
  } 
};

// update a player
exports.players_update = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const player = await Player.findByIdAndUpdate(id,req.body, {new: true});
        if (!player){
            return res.status(404).json({message: `cannot find player with id ${id}`});
        }

        const request = {
            type: 'GET',
            description: 'get player information',
            url: `http://localhost:3000/players/${id}`
        };

        // there has to be a cleaner way to do this...
        const playerWithRequest = player.toJSON();
        playerWithRequest.request = request;
        res.status(201).json(playerWithRequest);
    } 
    catch(error){
      res.status(500).json({message: error.message});  
    } 
};

// delete a player
exports.players_delete = async(req, res, next)=>{
  try{
    const {id} = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player){
        return res.status(404).json({message: `cannot find player with id ${id}`});
    }

    const request = {
        type: 'GET',
        description: 'get all players',
        url: 'http://localhost:3000/players'
    };

    // there has to be a cleaner way to do this...
    const playerWithRequest = player.toJSON();
    playerWithRequest.request = request;
    res.status(200).json(playerWithRequest);
  } 
  catch (error){
    res.status(500).json({message: error.message});  
  } 
};

