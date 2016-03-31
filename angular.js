var app = angular.module("myApp",["ngRoute"]);

app.config([
    "$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {

    $routeProvider.when('/search', {
        templateUrl: 'tmpl/search.html',
        controller:"SearchController"
    });

    $routeProvider.when('/detail', {
        templateUrl: 'tmpl/detail.html',
        controller:"DetailController"
    });

    $routeProvider.when('/howto', {
        templateUrl: 'tmpl/howto.html',
    });

    $routeProvider.otherwise({
        redirectTo: "/search"
    });

}]);


app.controller("SearchController",["$scope","$http",function($scope,$http){
    console.log("hello, this is search controller")

    $scope.conj = {};

    $scope.results = [];

    $scope.getArticle = function(){
        var url = "/event.json"
        $http({
            url:url,
            method: "GET"
        })
        .then(function(res){
            console.log(arguments)


            $scope.results = res.data.events.filter(function(item){
                console.log(item)
                if($scope.conj.area){
                    if(!item.address){
                        return false
                    }
                    if(item.address.indexOf($scope.conj.area) == -1){
                        return false
                    }
                }
                return true;
            });
        })
    }

    $scope.init = function(){
        $scope.getArticle();
    }


}]);

app.controller("DetailController",["$scope","$http",function(){
    console.log("hello, this is detail controller")

}]);

app.run();
//angular.controller("")