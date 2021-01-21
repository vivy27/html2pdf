const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', require('./api'))

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;