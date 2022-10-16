const {
    createProxyMiddleware,
    debugProxyErrorsPlugin,
    loggerPlugin,
} = require("http-proxy-middleware");
const PATH = "http://127.0.0.1:8080";
const WS_PATH = "ws://127.0.0.1:8080";
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/socket", {
            target: PATH,
            changeOrigin: true,
        }),
        createProxyMiddleware("/api", {
            target: PATH,
            changeOrigin: true,
            pathRewrite: { "/api": "" },
        })
    );
};
