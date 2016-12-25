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
            getGeoCode();
        })

        $scope.form.image = ImageFactory.getImage();

        if ($scope.form.image) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL($scope.form.image);
        }

        function getGeoCode(result, status) {
            var data = $scope.form.address + "," + $scope.form.city + ',US';
            console.log(data);
            var map = new google.maps.Map(document.getElementById('map'), {
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                zoom: 6
            });

            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                    'address': data
                },
                function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK) {
                        new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map
                        });
                        map.setCenter(results[0].geometry.location);
                    }
                }
            );
        }
    });