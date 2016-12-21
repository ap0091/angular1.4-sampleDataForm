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