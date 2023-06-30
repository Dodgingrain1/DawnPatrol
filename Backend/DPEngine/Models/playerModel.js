const mongoose = require('mongoose')

// main schema
const playerSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "id is a required integer"]
    },
    name:{
        type: String,
        required: [true, "name is a required string"]
    }
},
{timestamps:true}
)

const Player = mongoose.model('Player',playerSchema)

module.exports = Player;
