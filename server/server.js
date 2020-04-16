var uuid = require("uuid/v1");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const aws = require("aws-sdk");
const configRoutes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var logRequestPathBodyArray = new Array();
var pathsAccessedArray = new Array();
var reqCnt = 0;


var urlArray = new Array();

const usersData = require("./data/users");

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.listen("3001", async function() {
    await usersData.fetchS3Database();
    console.log("The server is active on localhost 3001.");
});

configRoutes(app);
