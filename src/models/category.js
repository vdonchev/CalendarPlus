import {get} from './requester';

function loadCategories(callback) {
    get('appdata', 'categories', 'kinvey')
        .then(callback);
}

export {
    loadCategories
};