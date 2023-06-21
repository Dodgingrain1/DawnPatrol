const mongoose = require('mongoose')

// sub schema
const performanceStatsSchema = mongoose.Schema({
    alt:{
        type: Number,
        required: [true, "alt is a required integer"]
    },
    top:{
        type: Number,
        required: [true, "top is a required integer"]
    },
    turn:{
        type: Number,
        required: [true, "turn is a required integer"]
    },
    climb:{
        type: Number,
        required: [true, "climb is a required integer"]
    }
})

// sub schema
const armamentSchema = mongoose.Schema({
    gunType:{
        type: String,
        required: [true, "gunType is a required string"]
    },
    mount:{
        type: String,
        required: [true, "mount is a required string"]
    },
    rounds:{
        type: Number,
        required: [true, "rounds is a required integer"]
    },
    store:{
        type: String,
        required: [true, "store is a required string"]
    }
})

// sub schema
const hitProfilesSchema = mongoose.Schema({
    area:{
        type: String,
        required: [true, "area is a required string"]
    },
    points:{
        type: Number,
        required: [true, "points is a required integer"]
    }
})

// main schema
const planeSchema = mongoose.Schema({
    id:{
        type: Number,
        required: [true, "id is a required integer"]
    },
    planeType:{
        type: String,
        required: [true, "planeType is a required string"]
    },
    engine:{
        type: [String],
        required: [true, "engine is a required array of strings"]
    },
    rotary:{
        type: Boolean,
        required: [true, "rotary is a required boolean"]
    },
    serviceStartDate:{
        type: Date,
        required: [true, "serviceStartDate is a required date"]
    },
    serviceEndDate:{
        type: Date,
        required: [true, "serviceEndDate is a required date"]
    },
    performanceStats: [performanceStatsSchema],
    maxDive:{
        type: Number,
        required: [true, "maxDive is a required integer"]
    },
    ceiling:{
        type: Number,
        required: [true, "ceiling is a required integer"]
    },
    armament: [[armamentSchema]],
    crew:{
        type: Number,
        required: [true, "crew is a required integer"]
    },
    primaryUses:{
        type: [String],
        required: [true, "primaryUses is a required array of strings"]
    },
    nationality:{
        type: [String],
        required: [true, "nationality is a required array of strings"]
    },
    hitProfiles: [hitProfilesSchema]
},
{timestamps:true}
)

const Plane = mongoose.model('Plane',planeSchema)

module.exports = Plane;
