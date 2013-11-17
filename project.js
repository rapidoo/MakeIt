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

	$http.get('http://localhost:3000/api/requete').success(function(resp){
	        $scope.quoi = resp.requete.quoi;
	        $scope.ou = resp.requete.ou;
 });
}
