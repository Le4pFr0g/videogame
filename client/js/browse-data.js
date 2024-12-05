var games = [];
var activeGame = 0;

var app = angular.module("browseDataApp", [])

app.controller("browseDataCtrl", function($scope, $http)
{
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
                games = response.data.games;
                $scope.obj = games[activeGame];
                $scope.showHide();
            }
            else
            {
                console.log(response.data.msg);
            }
        }), function(error)
        {
            //failed to connect to the server
            console.log(error);
        }
    };

     $scope.get_records();

     $scope.changeGame = function(direction)
    {
        activeGame += direction;
        $scope.obj = games[activeGame];
        $scope.showHide();
    }

    $scope.showHide = function()
    {
        $scope.hidePrev = activeGame == 0;
        $scope.hideNext = (activeGame == games.length-1);
    }

});