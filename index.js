const express = require('express');
const { createProxyMiddleware } = require("http-proxy-middleware");
// Creating express server
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// Proxy Logic :  Proxy endpoints
app.use(
    "/netlify",
    createProxyMiddleware({
        target: 'https://api.netlify.com/api/v1/sites',
        onProxyRes: (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        },
        changeOrigin: true,
        pathRewrite: {
            "^/netlify": "",
        },
    })
);

app.listen (3000, () => console.log('server started successfully at port : 3000'));