const express = require('express');
const { createProxyMiddleware } = require("http-proxy-middleware");
// Creating express server
const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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