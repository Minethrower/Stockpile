let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./database'),
    bodyParser = require('body-parser');

//Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Database connected")
    },
    error => {
        console.log("Database could't be connected to: " + error)
    })
const app = express()
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const postAPI = require('../backend/routes/post.route')
const itemAPI = require('../backend/routes/item.route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors());

//API
app.use('/postAPI', postAPI)
app.use('/itemAPI', itemAPI)

//create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

//error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});