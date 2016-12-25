angular.module('myApp.validated',['ngRoute'])

    .config(function($routeProvider) {
        $routeProvider.when('/validated', {
            templateUrl: '/views/validated.html',
            controller: 'validatedCtrl'
        });
    })

    .controller('validatedCtrl', function($scope, $http, ImageFactory) {

        $scope.form = {};

        $http.get('/formReview').then(function(res) {
            $scope.form = res.data;
        })

        $scope.form.image = ImageFactory.getImage();

        if ($scope.form.image) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL($scope.form.image);
        }
    });