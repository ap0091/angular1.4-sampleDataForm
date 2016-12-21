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