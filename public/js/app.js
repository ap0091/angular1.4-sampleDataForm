var app = angular.module('AngularSampleApp', ['ngRoute']);

app.config(
    function setupRoutes( $routeProvider, $locationProvider )
    {
        $routeProvider .
        when('/', {
            templateUrl: '/pages/homePage.html'
        }).
        when( '/userDetails/:id', {
            templateUrl: '/pages/userDetails.html'
        }).
        when( '/postDetails/:id', {
            templateUrl: '/pages/postDetails.html'
        }).
        otherwise( {
            redirectTo: '/'
        } );

        //prettify url and remove #
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
);

