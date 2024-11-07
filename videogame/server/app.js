const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//Page listeners (router)
var router = require("./router.js");

router(app);


//Service listeners (data processes)
var services = require("./services.js");
services(app);


//Listen
var port = 5000;

var server = app.listen(port, function(err)
{
    if(err) 
    {
        throw err;
    }

    console.log("Listening on port: " + port);

});