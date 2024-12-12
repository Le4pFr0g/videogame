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

    // $scope.redrawTable = function()
    // {
    //     var rating = $scope.selectedRating.value;

    //     $http
    //     ({
    //         method: "get",
    //         url: videogameURL + "/get-records"//,
    //         // params: {type: type}

    //     }).then(function(response)
    //     {
    //         //successfully connected to the server
    //         if (response.data.msg === "SUCCESS")
    //         {
    //             $scope.games = response.data.games;

    //             $scope.ratings = getRatings(response.data.games);
    //             $scope.selectedRating = $scope.rating[0];
    //         }
    //         else
    //         {
    //             console.log(response.data.msg)
    //         }

    //     }), function(error)
    //     {
    //         //failed to connect to the server
    //         console.log(error);
    //     }
    // };

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
                $scope.get_records();
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


});

function getRatings(TableData)
{
    var ratingExists;

    ratingsArray = [{value: "", display: "ALL"}];

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

    return ratingsArray;
}