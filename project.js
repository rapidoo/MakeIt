var quoi = 'WorldMONDE';
var ou = 'World';

function myController($scope, $http){
    $scope.quoi = quoi;
    $scope.ou = ou;

    $http.get('http://localhost:3000/api/requete').success(function(resp){
        $scope.quoi = resp.requete.quoi;
        $scope.ou = resp.requete.ou;
    });
}


       