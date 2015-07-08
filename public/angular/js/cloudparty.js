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

cloudParty.factory('games', [
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
    'games',
    '$modal',
    
    function ($scope, games, $modal){	
        
	    $scope.newGamerName = '';
        $scope.newGamerId = '';
        $scope.gamers = [];
        
        $scope.addGamer = function() {
            
            if ($scope.newGamerName != '' && $scope.newGamerId != '') {
                $scope.gamers.push({id:$scope.newGamerId, name:$scope.newGamerName, done:false});
                
                $scope.newGamerName = '';
                $scope.newGamerId = '';
                
            } else {
                
                $scope.openDialog('Both the name of the gamer and his/her ID are required', 'Oops!');
                
            }
        };
        
        $scope.removeGamer = function(gamer) {
            $scope.index = $scope.gamers.indexOf(gamer);
            $scope.gamers.splice($scope.index, 1);
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
            
            games($scope.gamerString).success(function (data) { 
                    $scope.games =  data;
                    console.log($scope.games);
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

cloudParty.controller('ModalInstanceCtrl', ['$scope','$modalInstance','header','data', function ($scope, $modalInstance, header, data) {

 	$scope.data = data;
 	$scope.header = header;
 	
 	$scope.close = function () {
    	$modalInstance.close();
  	};
}]);

cloudParty.directive('focusOn', [ function() {
   return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
          elem[0].focus();
      });
   };
}]);
