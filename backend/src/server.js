const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const { io } = require('./sockets/socket');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load Enviroment Variables
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = express();

// Connect To Database
connectDB();

// Body parser
app.use(express.json());

// Cookie parse
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 5000,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set Static Folder
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));

// Create the server
const server = http.createServer(app);

// Socket io
io.listen(server, {
    cors: {
        origin: '*',
    },
});

// For RBG Colours
const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
const randomRGB = () => {
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgba(${r},${g}, ${b}, 0.45)`;
    return rgb;
};

io.on('connection', (socket) => {
    socket.color = randomRGB();
    socket.on('SEND_UPDATE', (map_id) => {
        console.log('Something Updated');
        socket.to(String(map_id).trim()).emit('GET_UPDATE', map_id);
    });
    socket.on('USER_WORKING', (map) => {
        if (map) {
            socket.mapID = String(map).trim();
            socket.rooms.forEach((room) => socket.leave(room));
            socket.join(String(map).trim());
        }
    });
    socket.on('USER_MOVE', (client, screen, map, user) => {
        if (map) {
            socket.userID = user;
            socket
                .to(String(map).trim())
                .emit('GET_POS', client, screen, map, user, socket.color);
        }
    });
    socket.on('disconnect', () => {
        console.log('Disconnected' + socket.mapID);
        socket.to(socket.mapID).emit('USER_LEFT', socket.userID);
    });
});

// Route Files
const MapRouter = require('./routes/Map');
const DashBoardRouter = require('./routes/DashBoard');
const UserRouter = require('./routes/User');
const AuthRouter = require('./routes/Auth');
const GroupRouter = require('./routes/Group');

// Mount Routers
app.use('/api/v1/maps', MapRouter);
app.use('/api/v1/dashboard', DashBoardRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/group', GroupRouter);

// Error Handler Middleware (after routes)
app.use(errorHandler);

// Start the server
server.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
