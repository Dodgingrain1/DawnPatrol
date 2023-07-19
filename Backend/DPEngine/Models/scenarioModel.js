const mongoose = require('mongoose')

// sub schema
const windSchema = new mongoose.Schema({
    direction:{
        type: String,
        required: [true, "direction is a required integer"]
    },
    speed:{
        type: Number,
        required: [true, "speed is a required integer"]
    }
});

// sub schema
const cloudBankSchema = new mongoose.Schema({
    topAltitude:{
        type: Number,
        required: [true, "topAltitude is a required number"]
    },
    bottomAltitude:{
        type: Number,
        required: [true, "bottomAltitude is a required number"]
    }
});

// sub schema
const locationSchema = new mongoose.Schema({
    x:{
        type: Number,
        required: [true, "x is a required number"]
    },
    y:{
        type: Number,
        required: [true, "y is a required number"]
    }
});

// sub schema
const planeSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "plane is a required number"]
    },
    altitude:{
        type: Number,
        required: [true, "altitude is a required number"]
    },
    direction:{
        type: String,
        required: [true, "direction is a required string"]
    },
    location: locationSchema    
});

// main schema
const scenarioSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "id is a required integer"]
    },
    description:{
        type: String,
        required: [true, "description is a required string"]
    },
    playerCount:{
        type: Number,
        required: [true, "player count is a required integer"],
    },
    gameDate:{
        type: Date,
        required: [true, "gameDate is a required date"]
     },
     battleLocation:{
        type: String,
        required: [true, "battleLocation is a required string"]
     },
     wind: windSchema,
     cloudBanks: [cloudBankSchema],
     germanPlanes: [planeSchema],
     aliedPlanes: [planeSchema]
},
{timestamps:true}
);

const Scenario = mongoose.model('Scenario',scenarioSchema);

module.exports = Scenario;
