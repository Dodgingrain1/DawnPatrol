const mongoose = require('mongoose')

// main schema
const gameSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "id is a required integer"]
    },
    players:{
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "players is a required array of id numbers strings"],
        ref: 'players'
    },
    currentTurn:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "currentTurn is a required string"]
    }
},
{timestamps:true}
)

const Game = mongoose.model('Game',gameSchema)

module.exports = Game;
