
const getAccessToken = () => {
    const token = localStorage.getItem("access_token");
    return token;
}

const isLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn;
}

const storeAccessToken = (access_token) => {
    localStorage.setItem('access_token', access_token);
};

const removeAccessToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLoggedIn');
};

export { getAccessToken, isLoggedIn, storeAccessToken, removeAccessToken };
