const { createProxyMiddleware } = require("http-proxy-middleware");

const PATH = "http://127.0.0.1:8080";
const WS_PATH = "ws://127.0.0.1:8080"
module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            ['/api', '/socket'],
            {
              target: PATH,
              changeOrigin: true,
              ws: true,
              pathRewrite : {'/api' : '', },
              router: {
                '/socket': WS_PATH,
              }
            }
          )
    );

};
