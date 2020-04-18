const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = { origin: 'http://localhost:3000' };
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

const passport = require('passport');
app.use(passport.initialize());
const JwtStrategy = require('./passportStrategies/jwt');
const LocalStrategy = require('./passportStrategies/local');
const Jwt = new JwtStrategy();
const Local = new LocalStrategy();
passport.use(Jwt);
passport.use(Local);

// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Requiring models for syncing
const db = require('./models');
// if use { force: true } => drop existing tables and re-sync DB
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('RESYNCHRONIZED DATABASE SUCCESSFULLY.');
    })
    .catch(err => {
        console.error('ERROR, PLEASE VERIFY YOUR DATABASE CREDENTIALS.', err);
    });

// Requiring routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/documentation', require('./routes/documentation.routes'));
//use this to show the image in node js server to client
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads/files', express.static('uploads/files'));

// Initial Route
app.get('/', (req, res) => {
    res.send('Nothing here... Please use API at /api endpoint.');
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});