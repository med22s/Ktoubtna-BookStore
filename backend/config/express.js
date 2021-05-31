const express       = require('express');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cookieParser = require('cookie-parser');
const cors          = require('cors');
const indexRoute    = require( '../routes/index');
const error         = require('../middlewares/error.js');
const notfound      = require( '../middlewares/notfound');

var config = require("./config");

/**
* Express instance
* @public
*/
const app = express();


app.use(cookieParser());
// parse body params and attache them to req.body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

// lets you use HTTP verbs such as PUT or DELETE
// enable CORS - Cross Origin Resource Sharin  g

if (config.nodeEnv !== "production") {
    app.use(cors());
}
app.use('/api',indexRoute)

app.use(notfound)
app.use(error)



module.exports = app;