const express = require('express');
const { createProxyMiddleware } = require("http-proxy-middleware");
// Creating express server
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: "http://127.0.0.1:5173",
};

app.use(cors(corsOptions));

// Proxy Logic :  Proxy endpoints
app.use(
    "/netlify",
    createProxyMiddleware({
        target: 'https://api.netlify.com/api/v1/sites',
        on: {
            proxyReq: (proxyReq, req, res) => {
                // add custom header to request
                proxyReq.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
            },
            proxyRes: (proxyRes, req, res) => {
                proxyRes.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5173';
            },
        },
        changeOrigin: true,
        pathRewrite: {
            "^/netlify": "",
        },
    })
);

app.listen (3000, () => console.log('server started successfully at port : 3000'));