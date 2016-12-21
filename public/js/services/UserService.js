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