const {MongoClient, ObjectId } = require("mongodb");

const fs = require("fs");
const path = require("path");
const DB_FILE = path.join(__dirname + "/files/data.txt");

const dbURL = process.env.DB_URI || "mongodb://127.0.0.1";

const dbClient = new MongoClient(dbURL);

var services = function(app)
{
    app.post("/write-record", async function(req, res)
    {
        var gameData = 
        {
            gameName: req.body.gameName,
            yearReleased: req.body.yearReleased,
            numberPlayers: req.body.numberPlayers,
            gamePlatform: req.body.gamePlatform,
            rating: req.body.rating
        };

        try
        {
            const conn = await dbClient.connect();
            const db = conn.db("videogame");
            const coll = db.collection("games");

            await coll.insertOne(gameData);

            conn.close();
            return res.send(JSON.stringify({msg: "SUCCESS"}));


        }
        catch (error)
        {
            console.log(error);
            return res.send(JSON.stringify({msg: "Error " + error}));
        }
        

    });

    app.get("/get-records", async function(req, res)
    {
        try
        {
            var conn = await dbClient.connect();
            var db = conn.db("videogame");
            var coll = db.collection("games");

            var games = await coll.find().toArray();

            conn.close();
            return res.send(JSON.stringify({msg: "SUCCESS", games: games}));
        }
        catch (error)
        {
            console.log(error);
            return res.send(JSON.stringify({msg: "Error " + error}));
        }

    });

    app.get("/get-recordsByRating", async function(req, res)
    {
        var search = (req.query.rating === "") ? {}: {rating: req.query.rating};

        try
        {
            var conn = await dbClient.connect();
            var db = conn.db("videogame");
            var coll = db.collection("games");

            var games = await coll.find(search).toArray();

            return res.send(JSON.stringify({msg: "SUCCESS", games: games}));
        }
        catch (error)
        {
            console.log(error);
            return res.send(JSON.stringify({msg: "Error " + error}));
        }

    });

    app.delete("/delete-record", async function(req, res)
    {
        //console.log(req.query.id);
        try
        {
            const conn = await dbClient.connect();
            const db = conn.db("videogame");
            const coll = db.collection("games");

            var search = {_id: ObjectId.createFromHexString(req.query.id)};
            await coll.deleteOne(search);
            
            conn.close();
            return res.send(JSON.stringify({msg: "SUCCESS"}));

        }
        catch (error)
        {
            console.log(error);
            return res.send(JSON.stringify({msg: "Error " + error}));
        }

    });

    app.put("/update-record", async function(req, res)
    {
        var updateData =
        {
            $set:
            {
                gameName: req.body.gameName,
                yearReleased: req.body.yearReleased,
                numberPlayers: req.body.numberPlayers,
                gamePlatform: req.body.gamePlatform,
                rating: req.body.rating
            }
        };
        console.log(JSON.stringify(updateData));

        try
        {
            const conn = await dbClient.connect();
            const db = conn.db("videogame");
            const coll = db.collection("games");

            var search = {_id: ObjectId.createFromHexString(req.body.id)}
            await coll.updateOne(search, updateData);

            conn.close();
            return res.send(JSON.stringify({msg: "SUCCESS"}))

        }
        catch (error)
        {
            console.log(error)
            return res.send(JSON.stringify({msg: "Error " + error}))
        }
    });
}

module.exports = services;