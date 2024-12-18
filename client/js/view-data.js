var app = angular.module("viewTableApp", [])

app.controller("viewTableCtrl", function ($scope, $http)
{
    $scope.games = [];

    $scope.get_records = function()
    {
        $http
        ({
            method: "get",
            url: videogameURL + "/get-records"
        }).then(function(response)
        {
            if (response.data.msg === "SUCCESS")
            {
                $scope.games = response.data.games;

                $scope.ratings = getRatings(response.data.games);
                $scope.selectedRating = $scope.ratings[0];
            }
            else
            {
                console.log(response.data.msg)
            }
        }), function(error)
        {
            console.log(error)
        }
    };
    $scope.get_records();

    $scope.redrawTable = function()
    {
        var rating = $scope.selectedRating.value;

        $http
        ({
            method: "get",
            url: videogameURL + "/get-recordsByRating",
            params: {rating: rating}

        }).then(function(response)
        {
            //successfully connected to the server
            if (response.data.msg === "SUCCESS")
            {
                $scope.games = response.data.games;
            }
            else
            {
                console.log(response.data.msg)
            }

        }), function(error)
        {
            //failed to connect to the server
            console.log(error);
        }
    };

    $scope.deleteData = function(id)
    {
        $http
        ({
            method: "delete",
            url: videogameURL + "/delete-record",
            params: {id: id}
        }).then(function(response)
        {
            if (response.data.msg === "SUCCESS")
            {
                $scope.redrawTable();
            }
            else
            {
                console.log(response.data.msg);
            }

        }), function(error)
        {
            console.log(error)   
        }
    };

    //index is given by angular's $index
    $scope.editGame = function(index)
    {
        $scope.gameName = $scope.games[index].gameName;
        $scope.yearReleased = $scope.games[index].yearReleased;
        $scope.numberPlayers = $scope.games[index].numberPlayers.toLowerCase();
        $scope.gamePlatform = $scope.games[index].gamePlatform.toLowerCase();
        $scope.rating = $scope.games[index].rating;
        $scope.id = $scope.games[index]["_id"];

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.cancelUpdate = function()
    {
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    $scope.updateGame = function()
    {
        if (gameName === "" || yearReleased === "")
        {
            $("#results").text("Game Name and Year Released are required fields.");
            return;
        }

        $http
        ({
            method: "put",
            url: videogameURL + "/update-record",
            data:
            {
                id: $scope.id,
                gameName: $scope.gameName,
                yearReleased: $scope.yearReleased,
                numberPlayers: $scope.numberPlayers,
                gamePlatform: $scope.gamePlatform,
                rating: $scope.rating
            }

        }).then (function(response)
        {
            if (response.data.msg === "SUCCESS")
            {
                $scope.redrawTable();
                $scope.cancelUpdate();

                $scope.gameName = "";
                $scope.yearReleased = "";
                $scope.numberPlayers = "";
                $scope.gamePlatform = "";
                $scope.rating = "";
            }
            else
            {
                $scope.addResults = response.data.msg;
            }
        }), function(error)
        {
            console.log(error);
        }

        
    }


});

function getRatings(TableData)
{
    var ratingExists;

    var ratingsArray = [];

    for (var i = 0; i < TableData.length; i++)
    {
        ratingExists = ratingsArray.find(function (element)
        {
            return element.value === TableData[i].rating
        })

        if (ratingExists)
        {
            continue;
        }
        else
        {
            ratingsArray.push({value: TableData[i].rating, display: TableData[i].rating.toUpperCase()})
        }

    }
    //custom sort (thanks random youtube guy)
    //sorts strings before numbers
    //strings are sorted into alphabetical order
    //numerical values are sorted in descending order
    ratingsArray.sort((a, b) => 
    {
        const valA = a.display;
        const valB = b.display;
    
        const isANumber = !isNaN(Number(valA));
        const isBNumber = !isNaN(Number(valB));
    
        //type mismatch
        if (!isANumber && isBNumber) 
        {
            return -1;
        }
        if (isANumber && !isBNumber) 
        {
            return 1;
        }
        //both strings
        if (!isANumber && !isBNumber) 
        {
            return String(valA).localeCompare(String(valB));
        }
        //both numbers
        else 
        {

            return Number(valB) - Number(valA);
        }
    });
    //reassign the array to put a value of ALL to the first index and the rest gets shifted over
    ratingsArray = [{value: "", display: "ALL"}, ...ratingsArray];
    return ratingsArray;
}

