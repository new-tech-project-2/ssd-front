const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: function (path, req) {
                return path.replace("/api", "");
            },
        })
    );
    app.use(
        "/ws",
        createProxyMiddleware({
            target: "http://localhost:8080",
            ws: true,
            pathRewrite: function (path, req) {
                return path.replace("/ws", "");
            },
        })
    );
};
