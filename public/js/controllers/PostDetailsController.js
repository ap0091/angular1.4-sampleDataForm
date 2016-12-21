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