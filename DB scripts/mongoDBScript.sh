# use below commmands in mongodb shell (a few commands are done in bash where noted)

# start shell/connect to mongo database
mongosh

# show all databases
show dbs

# use or create a database
use dawnPatrol

# create a collection
db.createCollection("planes")

# show all documents in collection
db.planes.find()

# import planes json file into collection, run in bash, not mongosh
mongoimport --uri mongodb://localhost --db dawnPatrol --collection planes --file /Users/christopherbrand/development/javascript/DawnPatrol/Data/Planes.json --jsonArray

# show all documents imported into planes collection
db.planes.find()

# show document with id = 1, etc.
db.planes.find({id:1})

#show all collections
show collections

# drop collections
db.planes.drop()

# drop database, done within context of being connected to a database
db.dropDatabase()
