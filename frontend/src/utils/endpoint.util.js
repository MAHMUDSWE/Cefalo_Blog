const apiEndpoint = {
    base: import.meta.env.VITE_API,
    auth: {
        signup: "/user/signup",
        login: "/user/login",
    },
    user: {
        getAll: "/user",
        getUserById: "/user/userid",
        getUserByUsername: "/user/:username",
        update: "/user/:username",
        delete: "/user/:username",
    },

    blog: {
        getAll: "/blog",
        create: "/blog",
        getSpecific: "/blog/:blogid",
        update: "/blog/:blogid",
        delete: "/blog/:blogid",
        getListByUser: "/blog/author/:username",
        getSearchResult: "/blog/search/:query"
    },
};

export default apiEndpoint;