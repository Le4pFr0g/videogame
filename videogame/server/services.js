const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname + "/files/data.txt");

var services = function(app)
{
    app.post("/write-record", function(req, res)
    {
        var id = "vgame" + Date.now();

        var gameData = 
        {
            id: id,
            gameName: req.body.gameName,
            yearReleased: req.body.yearReleased,
            numberPlayers: req.body.numberPlayers,
            gamePlatform: req.body.gamePlatform,
            rating: req.body.rating
        }

        var vGameData = [];

        if (fs.existsSync(DB_FILE))
        {
            //Read in current data
            fs.readFile(DB_FILE, "utf8", function(err, data)
            {
                if (err)
                {
                    res.send(JSON.stringify({msg: err}));
                }
                else
                {
                    vGameData = JSON.parse(data);

                    vGameData.push(gameData);

                    
                    fs.writeFile(DB_FILE, JSON.stringify(vGameData), function(err)
                    {
                        if (err)
                        {
                            res.send(JSON.stringify({msg: err}));
                        }
                        else
                        {
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });
                }
            })
        }

        else
        {
            vGameData.push(gameData);
            console.log(DB_FILE);
            console.log(vGameData);

            fs.writeFile(DB_FILE, JSON.stringify(vGameData), function(err)
            {
                if (err)
                {
                    res.send(JSON.stringify({msg: err}));
                }
                else
                {
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            });

        }

    });

}

module.exports = services;