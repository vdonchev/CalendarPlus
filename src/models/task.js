// eslint-disable-next-line
import {get, post, update} from './requester';

function loadAllTasks(callback) {
    get('appdata', 'tasks', 'kinvey')
        .then(callback);
}

function loadDayTasks(dateId, day, onTeamSuccess) {
    let jsonUri = `tasks?query={"dateId":"${dateId}", "day":${day}}`;
    get('appdata', jsonUri , 'kinvey')
        .then(onTeamSuccess);
}

function loadMonthTasks(dateId, onUsersSuccess) {
    get('appdata', `tasks?query={"dateId": "${dateId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function edit(dateId, title, body, callback) {
    let taskData = {
        title: title,
        body: body
    };
    update('appdata', 'tasks/' + dateId, taskData, 'kinvey')
        .then(callback(true));
}

function create(title, body, callback) {
    let taskData = {
        title: title,
        body: body
    };
    post('appdata', 'tasks', taskData, 'kinvey')
        .then((response) => {
            //task created successfully
        });
}

function getTodayTasks(dateId, day, callback){

    let jsonUri = `tasks?query={"day":${day}, "dateId":${dateId}`;
    get('appdata', jsonUri, 'kinvey')
        .then(callback);
}

export {getTodayTasks, loadAllTasks, loadDayTasks, loadMonthTasks, edit, create};