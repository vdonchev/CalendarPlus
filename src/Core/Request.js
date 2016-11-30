import $ from 'jquery';

let Request = (function () {
    const appId = 'kid_B1I7x1Mzg';
    const appSecret = '65ed32c5ac7f4732bf6d3ea4ac9b5442';
    const appUrl = 'https://baas.kinvey.com/';
    const appBaseAuthHeader = btoa(appId + ':' + appSecret);
    const baseAuthHeader = {
        Authorization: `Basic ${appBaseAuthHeader}`
    };

    function register(username, password) {
        return $.post({
            url: appUrl + 'user/' + appId,
            headers: baseAuthHeader,
            contentType: 'application/json',
            data: JSON.stringify({username, password})
        });
    }

    function login(username, password) {
        return $.post({
            url: appUrl + 'user/' + appId + '/login',
            headers: {
                Authorization: `Basic ${btoa(username + ':' + password)}`,
            },
            data: JSON.stringify({username, password}),
            contentType: 'application/json'
        });
    }

    function logout() {
        return $.post({
            url: appUrl + 'user/' + appId + '/_logout',
            headers: {
                "Authorization": `Kinvey ${sessionStorage.getItem('userToken')}`
            },
            contentType: 'application/json'
        });
    }

    return {
        register,
        login,
        logout
    }
})();

export default Request;