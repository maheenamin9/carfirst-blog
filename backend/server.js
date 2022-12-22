const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// route imports
const brands = require('./routes/brands');
const blogs = require('./routes/blogs');
const users = require('./routes/users');
const auth = require('./routes/auth');

// middleware imports
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());   // enable all CORS requests
app.use(express.json());   // parse incoming resquest body and append it to 'req.body'
app.use(express.urlencoded({extended: true}));
app.use(express.static('./uploads'));   // serving static files
app.use(express.static('./public'));   // serving static files
app.use(errorHandler);

// routes
app.use('/api/brands', brands);
app.use('/api/blogs', blogs);
app.use('/api/users', users);
app.use('/api/auth', auth);

require('dotenv').config();

mongoose.connect('mongodb://localhost/carfirstDb')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(() => console.log('Cannot connect to mongoDB...'))

app.listen(3000, () => console.log("Server started on port 3000..."));
