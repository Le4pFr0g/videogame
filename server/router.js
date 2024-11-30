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
        res.status(200).sendFile(path.join(__dirname + "/../client/write-data.html"));
    });

    app.get("/view-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/view-data.html"));
    });

    app.get("/browse-data", function(req, res)
    {
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-data.html"));
    });



}

module.exports = router;