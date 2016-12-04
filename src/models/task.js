import {get, post, update} from './requester';
import observer from '../models/observer';

function loadAllTasks(callback) {
    get('appdata', 'tasks', 'kinvey')
        .then(callback);
}

function loadDayTasks(dateId, day, callback) {
    let jsonUri = `tasks?query={"dateId":"${dateId}", "day":${day}}`;
    get('appdata', jsonUri, 'kinvey')
        .then(callback);
}

function loadMonthTasks(dateId, callback) {
    get('appdata', `tasks?query={"dateId": "${dateId}"}`, 'kinvey')
        .then(callback);
}

function create(day, dateId, title, body, categoryId, callback) {
    let taskData = {
        day: day,
        dateId: dateId,
        title: title,
        body: body,
        categoryId: categoryId
    };

    post('appdata', 'tasks', taskData, 'kinvey')
        .then(() => {
            observer.showSuccess("Task added in successfully!");
            callback(true);
        });
}

function edit(dateId, title, body, callback) {
    let taskData = {
        title: title,
        body: body
    };
    update('appdata', 'tasks/' + dateId, taskData, 'kinvey')
        .then(callback(true));
}

export {
    loadAllTasks,
    loadDayTasks,
    loadMonthTasks,
    edit,
    create
};