

retrieveData();

function retrieveData()
{
    $.ajax(
    {
        url: videogameURL + "/get-records",
        type: "get",
        success: function(response)
        {
            var data = JSON.parse(response);

            if (data.msg = "SUCCESS")
            {
                loadData(data.fileData);
            }
            else
            {
                console.log(data.msg);
            }
        },
        error: function(err)
        {
            console.log(err);
        }

    });
}

function loadData(gameData)
{
    var htmlString = "";

    htmlString += "<tr>" +
                    "<th>Game Name</th>" +
                    "<th>Year Released</th>" +
                    "<th>Number of Players</th>" +
                    "<th>Platform</th>" +
                    "<th>Rating</th>" +
                    "<th></th>" +
                    "</tr>";
                    
    for (var i = 0; i < gameData.length; i++)
    {
        var button = "<button class='delete-button' data-id='" + gameData[i].id + "'>DELETE</button";
        // change gameData[i].id to gameData[i]._id
        htmlString += "<tr>";

            htmlString += "<td>" + gameData[i].gameName + "</td>";
            htmlString += "<td>" + gameData[i].yearReleased + "</td>";
            htmlString += "<td>" + gameData[i].numberPlayers + "</td>";
            htmlString += "<td>" + gameData[i].gamePlatform + "</td>";
            htmlString += "<td>" + gameData[i].rating + "</td>";
            htmlString += "<td>"  + button + "</td>";

        htmlString += "</tr>"
    }

    //console.log(htmlString);

    $("#dataTable").html(htmlString);
    //activate buttons
    activateDeleteButtons();
}

//buttons can apperently store attributes
function activateDeleteButtons()
{
    $(".delete-button").click(function()
    {
        //create attribute
        var deleteID = this.getAttribute("data-id");
        // console.log("delete button pressed: " + deleteID);
        deleteData(deleteID);
    });
}

function deleteData(dataID)
{
    $.ajax(
    {
        url: videogameURL + "/delete-record/" + dataID,
        type: "delete",
        success: function(response)
        {
            var data = JSON.parse(response);

            if (data.msg = "SUCCESS")
            {
                console.log("You are here");
                retrieveData();
            }
            else
            {
                console.log(data.msg);
            }
        },
        error: function(err)
        {
            console.log(err);
        }

    });
}
