
const getAccessToken = () => {
    const token = localStorage.getItem("access_token");
    return token;
}

const storeAccessToken = (access_token) => {
    localStorage.setItem('access_token', access_token);
};

const removeAccessToken = () => {
    localStorage.removeItem('access_token');
};

export { getAccessToken, storeAccessToken, removeAccessToken };
