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
                url: '?' + gamerString
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
        $scope.gamers = [];
        
        $scope.addGamer = function() {
            
            if ($scope.newGamerName != '' && $scope.newGamerId != '') {
                $scope.gamers.push({id:$scope.newGamerId, name:$scope.newGamerName, done:false});
                
                $scope.newGamerName = '';
                $scope.newGamerId = '';
                angular.element('.gamerName').focus()
                
            } else {
                
                $scope.openDialog('Both the name of the gamer and his/her ID are required', 'Oops!');
                
            }
        };
        
        $scope.removeGamer = function(gamer) {
            $scope.index = $scope.gamers.indexOf(gamer);
            $scope.gamers.splice($scope.index, 1);
        };
        
        $scope.checkGames = function() {
            console.log('click');
            $scope.gamerString = '';
            $.each( $scope.gamers, function( i ) {
                if (i == 0) {   
                    $scope.gamerString += 'player_ids[]='+$scope.gamers[i].id;
                    
                } else {
                    $scope.gamerString += '&player_ids[]='+$scope.gamers[i].id;   
                }
            });
            console.log($scope.gamerString)
            
            getGames($scope.gamerString).success(function (data) { 
                    $scope.getGames =  data;
                    console.log($scope.getGames);
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

	modalInstance.result.then(function (selectedItem) { 
		$scope.selected = selectedItem;
    		}, function () {
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