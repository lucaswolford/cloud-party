'use strict';

var cloudParty = angular.module('cloudParty', [
    'ngAnimate',
    'ngRoute',
    'ui.bootstrap'
]);

cloudParty.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'angular/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});


cloudParty.factory('getGames', [
    '$http', 
    
function ($http){
        
        return function(gamerString){
            return $http({
                method: 'GET',
                url: 'steam/shared_games?' + gamerString
            });
        }
}]);

cloudParty.controller('MainCtrl', [
    '$scope', 
    'getGames',
    '$modal',
   
    
function ($scope, getGames, $modal){	
        
        angular.element('.gamerName').focus()
	    $scope.newGamerName = '';
        $scope.newGamerId = '';
        $scope.commonGames = [];
        $scope.gamers = [];
        $scope.idRequired = 'Both the name of the gamer and his/her ID are required';
        $scope.wrongId = 'Check to make sure that the Steam IDs you entered are correct...';
         
        $scope.addGamer = function() {
            
            if ($scope.newGamerName != '' && $scope.newGamerId != '') {
                $scope.gamers.push({id:$scope.newGamerId, name:$scope.newGamerName, done:false});
                
                $scope.newGamerName = '';
                $scope.newGamerId = '';
                angular.element('.gamerName').focus();
                
                if ($scope.commonGames.length > 0) {
                        $scope.checkGames();
                }
                
            } else {
                
                $scope.openDialog($scope.idRequired, 'Oops!');  
            }
        };
        
        $scope.removeGamer = function(gamer) {
            $scope.index = $scope.gamers.indexOf(gamer);
            $scope.gamers.splice($scope.index, 1);
            $scope.commonGames = [];
        };
        
        $scope.checkGames = function() {
            $scope.gamerString = '';
            $.each( $scope.gamers, function( i ) {
                if (i == 0) {   
                    $scope.gamerString += 'player_ids[]='+$scope.gamers[i].id;
                    
                } else {
                    $scope.gamerString += '&player_ids[]='+$scope.gamers[i].id;   
                }
            });
            
            getGames($scope.gamerString).success(function (data) { 
                $scope.commonGames =  JSON.parse(data);
                
            }).error(function (data, status, headers, config) {
                $scope.openDialog($scope.wrongId, 'Oops!');
                angular.element('.gamerName').focus()
                $scope.newGamerName = '';
                $scope.newGamerId = '';
                $scope.gamers = [];
                $scope.commonGames = [];
            });
        }
        
        $scope.openDialog = function(response, header) {
		
    	    var modalInstance = $modal.open({
			    templateUrl: 'angular/views/modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
				    data: function () {
					    return response;
        		    },
        		
                    header: function () {
					    return header;
        		    }
      		}
    	});
	};
}]);

cloudParty.controller('ModalInstanceCtrl', [
    '$scope',
    '$modalInstance',
    'header',
    'data', 

function ($scope, $modalInstance, header, data) {

 	$scope.data = data;
 	$scope.header = header;
 	
 	$scope.close = function () {
    	$modalInstance.close();
  	};
}]);