const express = require('express');
const { createProxyMiddleware } = require("http-proxy-middleware");
// Creating express server
const app = express();

// Proxy Logic :  Proxy endpoints
app.use(
    "/netlify",
    createProxyMiddleware({
        target: 'https://api.netlify.com/api/v1/sites',
        changeOrigin: true,
        pathRewrite: {
            "^/netlify": "",
        },
    })
);

app.listen (3000, () => console.log('server started successfully at port : 3000'));