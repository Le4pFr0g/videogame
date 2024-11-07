var data = '[{"gameName": "game0", "yearReleased": "year0", "numPlayers": "Single player", "platform": "Desktop", "rating": "5"}]'

//Create JSON object
jsonObject = JSON.parse(data);


//create temp games
for (var i = 1; i < 5; i++)
{
    var newGame = {};
    newGame.gameName = "game" + i;
    newGame.yearReleased = "year" + i;
    newGame.numPlayers = "Single Player";
    newGame.platform = "Desktop";
    newGame.rating = (5-i).toString();

    jsonObject.push(newGame);
}

main();


function main()
{
    loadData();
}

function loadData()
{
    var htmlString = "";

    htmlString += "<tr>" +
                    "<th>Game Name</th>" +
                    "<th>Year Released</th>" +
                    "<th>Player Type</th>" +
                    "<th>Platform</th>" +
                    "<th>Rating</th>"
                    "</tr>";
    for (var i = 0; i < jsonObject.length; i++)
    {
        htmlString += "<tr>";

            htmlString += "<td>" + jsonObject[i].gameName + "</td>";
            htmlString += "<td>" + jsonObject[i].yearReleased + "</td>";
            htmlString += "<td>" + jsonObject[i].numPlayers + "</td>";
            htmlString += "<td>" + jsonObject[i].platform + "</td>";
            htmlString += "<td>" + jsonObject[i].rating + "</td>";
            


        
        htmlString += "</tr>"
    }

    $("#dataTable").html(htmlString);
}