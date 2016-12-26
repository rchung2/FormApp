angular.module('myApp.form',['ngRoute'])

    .config(function($routeProvider) {
        $routeProvider.when('/form', {
            templateUrl: '/views/form.html',
            controller: 'formCtrl'
        });
    })

    .controller('formCtrl', function($scope, $http, $location, ImageFactory) {

        $scope.errorFields = [];

        function checkValidName() {
            var validName = true;
            if(! /^[a-zA-Z ]{0,50}$/.test($scope.firstName)) {
                $scope.errorFields.push('Invalid First Name');
                validName = false;
            }
            if(! /^[a-zA-Z ]{0,50}$/.test($scope.lastName)) {
                $scope.errorFields.push('Invalid Last Name');
                validName = false;
            }
            return validName;
        }

        function checkEmail() {
            if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($scope.email)) {
                $scope.errorFields.push('Invalid Email');
                return false;
            }
            return true;
        }

        function checkPhone() {
            if ((! /^([0-9]{3}-[0-9]{3}-[0-9]{4})$/.test($scope.phone)) && (! /^[0-9]{10}$/.test($scope.phone))) {
                $scope.errorFields.push('Invalid Phone Number');
                return false;
            }
            return true;
        }

        function checkAddress() {
            if (! /^.{0,50}$/.test($scope.address)) {
                $scope.errorFields.push('Invalid Address');
                return false;
            }
            return true;
        }

        function checkCity() {
            if (! /^[a-zA-Z ]{0,50}$/.test($scope.city)) {
                $scope.errorFields.push('Invalid City');
                return false;
            }
            return true;
        }

        function checkState() {
            if (!$scope.state) {
                $scope.errorFields.push('Please select a state');
                return false;
            }
            return true;
        }

        function checkZip() {
            if (! /^([0-9]{5})$/.test($scope.zip)) {
                $scope.errorFields.push('Invalid Zip Code');
                return false;
            }
            return true;
        }

        function checkCategory() {
            if (!$scope.category) {
                $scope.errorFields.push('Please select a category');
                return false;
            }
            return true;
        }

        function checkCaptcha() {
            console.log($('.rc-anchor-logo-portrait').length);
            if ($("#rcaptcha").children().length === 0) {
                return true;
            }
            var response = grecaptcha.getResponse();
            if (response.length == 0) {
                $scope.errorFields.push('Are you a Robot?');
                return false;
            }
            return true;
        }

        $scope.disableSubmit = function() {
            console.log();
            var allExist = $scope.firstName && $scope.lastName
                && $scope.zip
                && $scope.email
                && $scope.phone
                && $scope.address
                && $scope.city
                && $scope.state
                && $scope.category
                && $scope.disclosureTerms;

            return !allExist;
        };

        $scope.validateInput = function() {
            $scope.errorFields = [];

            checkValidName()
            checkEmail()
            checkPhone()
            checkAddress()
            checkCity()
            checkState()
            checkZip()
            checkCategory();
            checkCaptcha();

            if ($scope.errorFields.length === 0) {
                console.log('HELLO1');
                $scope.submitForm();
            }

            return $scope.errorFields.length > 0;
        };

        $scope.submitForm = function() {
            var obj = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                gender: $scope.gender,
                education: $scope.education,
                email: $scope.email,
                phone: $scope.phone,
                address: $scope.address,
                city: $scope.city,
                state: $scope.state,
                zip: $scope.zip,
                category: $scope.category,
                image: $('#fileToUpload')[0].files[0],
                description: $scope.comment
            }


            ImageFactory.saveImage($('#fileToUpload')[0].files[0]);

            $http.post('/validated', obj).then(function(res) {
                $location.path('/validated');
            });
        }


    });