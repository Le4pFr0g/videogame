
main();



function main()
{

}

function submitData()
{
    //alert("Submit button was pressed");

    var gameName = $("#game_name").val();
    var yearReleased = $("#year_released").val();
    var numberPlayers = $("#number_players").val().toLowerCase();
    var gamePlatform = $("#game_platform").val().toLowerCase();
    var rating = $("#rating").val();

    if (gameName === "" || yearReleased === "")
    {
        $("#results").text("Game Name and Year Released are required fields.");
        return;
    }

    var jsonObject = {gameName: gameName, yearReleased: yearReleased, numberPlayers: numberPlayers, gamePlatform: gamePlatform, rating: rating};
    $.ajax({
        url: videogameURL + "/write-record",
        type: "post",
        data: jsonObject,
        success: function(response)
        {
            var data = JSON.parse(response);
            
            if(data.msg = "SUCCESS")
            {
                alert("Data Saved");
                
                $("#game_name").val("");
                $("#year_released").val("");
                $("#number_players").val("");
                $("#game_platform").val("");
                $("#rating").val("");


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

function clearData()
{
    $("#game_name").val("");
    $("#year_released").val("");
    $("#number_players").val("");
    $("#game_platform").val("");
    $("#rating").val("");
}