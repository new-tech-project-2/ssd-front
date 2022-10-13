const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://192.168.0.42:8080",
            changeOrigin: true,
        })
    );
    app.use(
        "/ws",
        createProxyMiddleware({
            target: "http://192.168.0.42:8080",
            ws: true,
        })
    );
};
