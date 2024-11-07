const path = require("path");

//Page listeners (router)
var router = function(app)
{
    
    app.get("/", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/videogame.html"));
    });

    app.get("/home", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/videogame.html"));
    });

    app.get("/write-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/writeData.html"));
    });

    app.get("/view-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/viewData.html"));
    });


}

module.exports = router;