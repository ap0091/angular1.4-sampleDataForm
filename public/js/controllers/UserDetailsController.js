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