const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');

// Load Enviroment Variables
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = express();

// Connect To Database
connectDB();

// Body parser
app.use(express.json());

// Route Files
const MapRouter = require('./routes/Map');
const DashBoardRouter = require('./routes/DashBoard');
const UserRouter = require('./routes/User');
const LoginRouter = require('./routes/Login');

// Mount Routers
app.use('/api/v1/maps', MapRouter);
app.use('/api/v1/dashbaord', DashBoardRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/login', LoginRouter);

// Middleware
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));

// Create the server
const server = http.createServer(app);

// Socket io
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

app.use((req, res, next) => {
    req.io = io;
    req.connectUsers = connectUsers;
    return next();
});

const connectUsers = {};

io.on('connection', (socket) => {
    const { user } = socket.handshake.query;

    connectUsers[user] = socket.id;
});

// Start the server
server.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
