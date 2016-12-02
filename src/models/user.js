import * as requester from './requester';
import observer from './observer';


function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('teamId', userInfo.teamId);

    observer.onSessionUpdate();
}

// user/login
function login(username, password, callback) {
    let userData = {
        username,
        password
    };

    requester.post('user', 'login', userData, 'basic')
        .then(loginSuccess)
        .catch((error) => {
            observer.handleAjaxError(error);
            callback(false);
        })

    function loginSuccess(userInfo) {
        saveSession(userInfo);
        observer.showSuccess("Logged in successfully!");
        callback(true);
    }
}

// user/register
function register(username, password, callback) {
    let userData = {
        username,
        password
    };

    requester.post('user', '', userData, 'basic')
        .then(registerSuccess)
        .catch((error) => {
            observer.handleAjaxError(error);
            callback(false);
        })

    function registerSuccess(userInfo) {
        observer.showSuccess('Registered successfully.');
        saveSession(userInfo);
        callback(true);
    }
}

// user/logout
function logout(callback) {
    requester.post('user', '_logout', null, 'kinvey')
        .then(logoutSuccess)
        .catch((error) => {
            observer.handleAjaxError(error);
            callback(false);
        });


    function logoutSuccess(response) {
        sessionStorage.clear();
        observer.onSessionUpdate();
        callback(true);
    }
}


function deleteTask(callback) {
    let userData = {
       //fill in data
    };
    requester.update('tasks', sessionStorage.getItem('userId'), userData, 'kinvey')
        .then((response) => {
            saveSession(response);
            observer.onSessionUpdate();
            callback(true);
        });
}

export {deleteTask, login, register, logout};