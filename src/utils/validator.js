export const validateUsername = (username) => {
    let pattern = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    // username is 5-20 characters long.
    // no _ or . at the beginning.
    // no __ or _. or ._ or .. inside.
    // allowed characters
    // no _ or . at the end
    return pattern.test(username);
}

export const validatePassword = (password) => {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return pattern.test(password);
}

export const validateEmail = (email) => {
    let pattern = /^[a-z][a-z0-9@_\\.]{3,32}@[a-z0-9]{1,}(\.[a-z0-9]{2,4}){1,2}$/;
    return pattern.test(email);
}