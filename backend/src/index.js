const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// adicionar socket io e http
const server = require('http').Server(app);
const io = require('socket.io')(server);


mongoose.connect('mongodb://admin:marinho010@ds123770.mlab.com:23770/goweek-kevyn', 
    {
        useNewUrlParser: true
    });

app.use((req, res, next) => {
    req.io = io;

    return next();
});
app.use(cors());

app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('server started on port 3000');
});