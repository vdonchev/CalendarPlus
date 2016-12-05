import {get, post, update, remove} from './requester';
import observer from '../models/observer';

function loadAllTasks(callback) {
    get('appdata', 'tasks', 'kinvey')
        .then(callback);
}

function loadDayTasks(day, dateId, callback) {
    let jsonUri = `tasks?query={"dateId":"${dateId}","day":"${day}"}`;
    get('appdata', jsonUri, 'kinvey').then((response) => {
        callback(response);
    })
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

function edit(taskId, taskData, callback) {
    update('appdata', 'tasks/' + taskId, taskData, 'kinvey')
        .then(callback);
}

function removeTask(dateId) {
    remove('appdata', 'tasks/' + dateId, 'kinvey')
}

function getTaskById(taskId, callback) {
    get('appdata', `tasks?query={"_id": "${taskId}"}`, 'kinvey').then(callback)
}

function loadTodayTasks() {
    let now = new Date();
    let day = now.getDate();
    let dateId = '' + now.getFullYear() + now.getMonth();

    let jsonUri = `tasks?query={"dateId":"${dateId}","day":"${day}"}`;

    return get('appdata', jsonUri, 'kinvey')
}

export {
    loadAllTasks,
    loadDayTasks,
    loadMonthTasks,
    edit,
    create,
    removeTask,
    getTaskById,
    loadTodayTasks
};