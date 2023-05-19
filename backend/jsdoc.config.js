const jsdoc = {
    source: {
        include: ["./configs", "./controllers", "./dto/request", "./dto/response", "./routes", "./repositories", "./models", "./validators", "./services", "./middlewares", "./utils"],
        exclude: ["./node_modules"]
    },
    opts: {
        destination: "./docs"
    }
};

module.exports = jsdoc;
