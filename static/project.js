var quoi = 'WorldMONDE';
var ou = 'World';

function myController($scope, $http){
    $scope.quoi = quoi;
    $scope.ou = ou;
    
	setInterval(function(){
        $scope.$apply(getRequete($scope, $http));
    }, 1000);

}


function getRequete($scope, $http){

	$http.get('/api/marker').success(function(resp){
	        $scope.quoi = resp.requete.quiquoi;
	        $scope.ou = resp.requete.ou;
		$scope.longitude = resp.requete.longitude;
		$scope.latitude = resp.requete.latitude;
 });
}


