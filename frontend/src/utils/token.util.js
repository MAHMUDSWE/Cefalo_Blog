
const getAccessToken = () => {
    return localStorage.getItem("access_token");
}

const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn");
}

const storeAccessToken = (access_token) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('isLoggedIn', true);
};

const removeAccessToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLoggedIn');
};

export { getAccessToken, isLoggedIn, storeAccessToken, removeAccessToken };
