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

        var search = {gameName: req.body.gameName};

        try
        {
            const conn = await dbClient.connect();
            const db = conn.db("videogame");
            const coll = db.collection("games");

            //make sure the game doesn't already exist
            //if it does, then close the connection and let the user know
            const game = await coll.find(search).toArray();
            if (game.length > 0)
            {
                await conn.close();
                return res.send(JSON.stringify({msg: "Game Already Exists"}));
            }
            else
            {
                await coll.insertOne(gameData);
                conn.close();
                return res.send(JSON.stringify({msg: "SUCCESS"}));
            }


        }
        catch (error)
        {
            await conn.close();
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
            //await conn.close();
            return res.send(JSON.stringify({msg: "Error " + error}));
        }

    });

    app.delete("/delete-record/:id", function(req, res)
    {
        console.log(req.params.id);
        const id = parseInt(req.params.id, 10);
        console.log(id);
                if (fs.existsSync(DB_FILE))
        {
            fs.readFile(DB_FILE, "utf-8", function(err, data)
            {
                if (err)
                {
                    res.send(JSON.stringify({msg: err}));
                }
                else
                { 
                    var gameData = JSON.parse(data);
                    console.log("data from the file: " + gameData[0].id);
                    console.log("data from the button: " + req.params.id);
                    gameData = gameData.filter(game => game.id !== req.params.id)
                    console.log(gameData);
                    
                    fs.writeFile(DB_FILE, JSON.stringify(gameData), function(err)
                    {
                        if (err)
                        {
                            res.send(JSON.stringify({msg: err}));
                        }

                    });

                    res.send(JSON.stringify({msg: "SUCCESS"}));

                }
            });
        }
        else
        {
            res.send(JSON.stringify({msg: "File Not Found"}));
        }

    });
}

module.exports = services;