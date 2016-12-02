// eslint-disable-next-line
import {get, post, update} from './requester';

function loadTasks(callback) {
    // Request teams from db
    get('appdata', 'tasks', 'kinvey')
        .then(callback);
}

function loadTaskDetails(dateId, onTeamSuccess) {
    get('appdata', 'tasks/' + dateId, 'kinvey')
        .then(onTeamSuccess);
}

function loadUsersDetails(dateId, onUsersSuccess) {
    get('user', `?query={"dateId": "${dateId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function edit(dateId, name, description, callback) {
    let teamData = {
        name: name,
        comment: description
    };
    update('appdata', 'tasks/' + dateId, teamData, 'kinvey')
        .then(callback(true));
}

function create(name, description, callback) {
    let teamData = {
        name: name,
        comment: description
    };
    post('appdata', 'tasks', teamData, 'kinvey')
        .then((response) => {
            //task created successfully
        });
}

export {loadTasks, loadTaskDetails, loadUsersDetails, edit, create};