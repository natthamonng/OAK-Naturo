import decode from 'jwt-decode';

export const authService = {
    loggedIn:loggedIn,
    setToken:setToken,
    isTokenExpired:isTokenExpired,
    getToken:getToken,
    logout:logout,
};

function loggedIn() {
    const token = this.getToken();
    // token exists && is not expired
    return !!token && !this.isTokenExpired(token)
}

function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
            return true;
        }
        else
            return false;
    }
    catch (err) {
        console.log("expired check failed!");
        return false;
    }
}

function setToken(token) {
    localStorage.setItem('oak-naturo', token)
}

function getToken() {
    return localStorage.getItem('oak-naturo')
}

function logout() {
    localStorage.removeItem('oak-naturo');
}