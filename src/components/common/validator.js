function validateLoggedInUser() {
    if (!sessionStorage.getItem('authToken')) {
        this.context.router.push('/');
    }
}

function validateString(inputStr) {
    return inputStr.length < 2
}

function validateCategory(category) {
    return category === undefined || category === ''
}


export {validateCategory, validateString, validateLoggedInUser};
