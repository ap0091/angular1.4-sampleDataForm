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


app.controller("HomeController", function($scope, DataFromRestAPIUser, DataFromRestAPIPost, dataService) {
    //if the user data has not been set, make API request, if its been set grab from factory
    if( Object.keys( dataService.getUserData() ).length == 0 ) {
        DataFromRestAPIUser.getUsers().then( function( data ) {
            dataService.setUserData( data );
            $scope.users = dataService.getUserData();
        }).catch(function() {
            alert( 'unable to get data-users' );
        });
    } else {
        $scope.users = dataService.getUserData();
    }

    //if the post data has not been set, make API request, if its been set grab from factory
    if( Object.keys( dataService.getPostData() ).length == 0 ) {
        DataFromRestAPIPost.getPosts().then( function( data ) {
            dataService.setPostData( data );
            $scope.posts = dataService.getPostData();
        }).catch(function() {
            alert( 'unable to get data-posts' );
        });
    } else {
        $scope.posts = dataService.getPostData();
    }

    $scope.markAsFav = function( id ){
        $scope.posts[ id ].liked = true;
    };

    $scope.unmarkFav = function( id ){
        $scope.posts[ id ].liked = false;
    };
});

app.controller("PostDetailsController", function($scope, $routeParams, DataFromRestAPIUser, DataFromRestAPIPost, dataService) {
    //post ID
    var id = $routeParams.id;

    //this will get details about the post from service object
    $scope.post = dataService.getPostData()[ id ];
    //this will get us user data for that spefic post, to get the username
    $scope.users = dataService.getUserData()[ $scope.post.userId ];

    //check if we have any comments for that post ID by making a direct api request.
    DataFromRestAPIPost.getPostComments( id ).then( function( data ) {
        $scope.comments = data;
    }).catch(function() {
        alert( 'unable to get data-users' );
    });

    $scope.markAsFav = function( id ){
        $scope.post.liked = true;
    };

    $scope.unmarkFav = function( id ){
        $scope.post.liked = false;
    };
});
app.controller("UserDetailsController", function($scope, $routeParams, DataFromRestAPIUser, DataFromRestAPIPost, dataService) {
    //gets the user ID from the route
    var id = $routeParams.id;

    //get user details
    $scope.allUsers = dataService.getUserData();
    $scope.userDetails = $scope.allUsers[id];

    //get all posts and filter in html to show only those belonging to user id
    $scope.posts = dataService.getPostData();

    $scope.edit = function( type, value ){
        //incase the API fails and we gotta reset
        $scope.oldValue = value;

        //turn on edit mode to flip to input display
        if( 'name' == type ) {
            $scope.editName = true;
        }
        if( 'username' == type ) {
            $scope.editUserName = true;
        }
    };

    $scope.save = function( type, value ){
        DataFromRestAPIUser.saveUpdatedValue( type, value, id, function(data) {
            //if we have a success, go back to display mode
            if( 'success' == data ) {
                if( 'name' == type ) {
                    $scope.editName = false;
                }
                if( 'username' == type ) {
                    $scope.editUserName = false;
                }

                $scope.allUsers[id] = $scope.userDetails;
            } else {
                //if we have a failure reset the value back to how it was and also stay in edit mode.
                alert( 'failed to communicate with API or update value' );
                if( 'name' == type ) {
                    $scope.userDetails.name = $scope.oldValue;
                }
                if( 'username' == type ) {
                    $scope.userDetails.username = $scope.oldValue;
                }
            }
        });

    };

    $scope.markAsFav = function( id ){
        $scope.posts[ id ].liked = true;
    };

    $scope.unmarkFav = function( id ){
        $scope.posts[ id ].liked = false;
    };
});
app.service('DataFromRestAPIPost', function( $http ) {
    this.getPosts = getPosts;
    this.getUserPosts = getUserPosts;
    this.getPostComments = getPostComments;

    /*
     This function will be used to make a api call to grab all posts in the system, or details about an individual post
     */
     function getPosts() {
         return $http.get( restURL + 'posts' ).then( function( response ) {
             var data = response.data;
             var posts = {};
             for ( var i = 0; i < data.length; i++ ) {
                 posts[data[i].id] = data[i];
                 posts[data[i].id]['liked'] = false;
             }
             return posts;
         });
    };

    /*
     This function will be used to make a api call to grab all posts for a specific user
     */
    function getUserPosts( id, callback ) {
        $http({
            url: restURL + 'posts' + '?userId=' + id,
            method: 'GET'
        }).success( function ( data ){
            callback( data );
        }).error( function ( data ) {
            alert( 'failed to communicate with api or get data back' );
        });
    };

    /*
     This function will be used to make a api call to grab all comments for a specific post
     */
    function getPostComments( id ) {
        return $http.get( restURL + 'comments' + '?postId=' + id ).then( function( response ) {
            return response.data;
        });
    };

});
app.service('dataService', function() {
    var userData = {};
    var postData = {};
    function setUserData(data) {
        userData = data;
    }
    function getUserData() {
        return userData;
    }
    function setPostData(data) {
        postData = data;
    }
    function getPostData() {
        return postData;
    }
    return {
        setUserData: setUserData,
        getUserData: getUserData,
        setPostData: setPostData,
        getPostData: getPostData
    }
});
var restURL = 'http://jsonplaceholder.typicode.com/';

app.service('DataFromRestAPIUser', function( $http ) {
    this.getUsers = getUsers;
    this.saveUpdatedValue = saveUpdatedValue;

    /*
     This function will be used to make a api call to grab all users so we can get usernames for homepage
     */
    function getUsers() {
        return $http.get( restURL + 'users' ).then( function( response ) {
            var data = response.data;
            var users = {};
            for ( i = 0; i < data.length; i++ ) {
                users[ data[i].id ] = data[ i ];
            }
            return users;
        });
    };

    /*
     This function will take 2 in put params and make a PATCH request to API
     */
    function saveUpdatedValue( type, value, id, callback ) {
        var updateObj = {};
        updateObj[ type ] = value;
        var url = restURL + 'users' + '/' + id;
        $http({
            url: url,
            method: 'PATCH',
            data: updateObj,
        }).success( function ( data ){
            callback( 'success' );
        }).error( function ( data ) {
            callback( 'failure' );
        });
    };

});