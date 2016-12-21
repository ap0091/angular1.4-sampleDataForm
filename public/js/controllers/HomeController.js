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
