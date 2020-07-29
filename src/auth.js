class Auth {
    constructor() {
        this.isAuthenticated = false
    }

    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    }

    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }
}

export default new Auth();