# use below commmands in mongodb shell (a few commands are done in bash where noted)
# these are not necessarily designed to be run in order at this point
# these are the commands for setting up/manipulating the database

# start shell/connect to mongo database
mongosh

# show all databases
show dbs

# use or create a database
use dawnPatrol

# create collections needed
db.createCollection("players")
db.createCollection("crew")
db.createCollection("games")
db.createCollection("teams")
db.createCollection("planes",{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Plane Object Validation",
            required: ["id", "planeType", "engine", "rotary", "serviceStartDate", "serviceEndDate", "performanceStats", "maxDive", "ceiling", "armament", "crew", "primaryUses", "nationality", "hitProfiles"],
            properties:{
                id:{
                    bsonType:"int",
                    description:"'id' must be an int and is required"
                },
                planeType:{
                    bsonType:"string",
                    description:"'planeType' must be a string and is required"
                },
                engine:{
                    bsonType: "array",
                    "items":{bsonType:"string"},
                    description:"'engine' must be an array of strings and is required"
                },
                rotary:{
                    type: "boolean",
                    description: "'rotary' is a boolean value and is required"
                },
                serviceStartDate:{
                    bsonType:"date",
                    description:"'serviceStartDate' must be a date and is required"
                },
                serviceEndDate:{
                    bsonType:"date",
                    description:"'serviceEndDate' must be date and is required"
                },
                performanceStats:{
                    "type":"array",
                    "items":{
                        "type":"object",
                        "required":["alt","top","turn","climb"],
                        "properties":{
                            "alt":{
                                bsonType:"int"
                            },
                            "top":{
                                bsonType:"int"
                            },
                            "turn":{
                                bsonType:"int"
                            },
                            "climb":{
                                bsonType:"int"
                            }
                        }
                    },
                    description:"'performanceStats' are required"
                },
                maxDive:{
                    bsonType:"int",
                    description:"'maxDive' must be an int and is required"
                },
                ceiling:{
                    bsonType:"int",
                    description:"'ceiling' must be an int and is required"
                },
                armament:{
                    "type":"array",
                    "items":{
                        "type":"array",
                        "items":{
                            "required":["gunType","mount","rounds","store"],
                            "properties":{
                                "gunType":{
                                    bsonType:"string",
                                    description:"'gunType' is a required string"
                                },
                                "mount":{
                                    bsonType:"string",
                                    description:"'mount' is a required string"
                                },
                                "rounds":{
                                    bsonType:"int",
                                    description:"'rounds' is a required int"
                                },
                                "store":{
                                    bsonType:"string",
                                    description:"'store' is a required string"
                                }
                            }
                        }
                    }
                },
                crew:{
                    bsonType:"int",
                    description:"'crew' is a required int"
                },
                primaryUses:{
                    "type": "array",
                    "items":{bsonType:"string"},
                    description:"'primaryUses' must be an array of strings and is required"
                },
                nationality:{
                    "type": "array",
                    "items":{bsonType:"string"},
                    description:"'nationality' must be an array of strings and is required"
                },
                hitProfiles:{
                    "type": "array",
                    "items":{
                        required:["area","points"],
                        properties:{
                            "area":{
                                bsonType:"string",
                                description:"'area' is a required string"
                            },
                            "points":{
                                bsonType:"int",
                                description:"'points' is a required int"
                            }
                        }
                    },
                    description:"'hitProfiles' are required objects"
                }                
            }
        }
    }
})


# import planes json file into collection, run in bash, not mongosh
mongoimport --uri mongodb://localhost --db dawnPatrol --collection planes --file /Users/christopherbrand/development/javascript/DawnPatrol/Data/Planes.json --jsonArray

# show all documents imported into planes collection
db.planes.find()

# collection jsonSchema
db.getCollectionInfos()

# show document with id = 1, etc.
db.planes.find({id:1})

#show all collections
show collections

# drop collections
db.planes.drop()
db.teams.drop()
db.games.drop()
db.crew.drop()
db.players.drop()
db.scenarios.drop()

# drop database, done within context of being connected to a database
db.dropDatabase()
