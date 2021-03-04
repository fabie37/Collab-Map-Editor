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
const socketio = require('socket.io');
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
    max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set Static Folder
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));

// Route Files
const MapRouter = require('./routes/Map');
const DashBoardRouter = require('./routes/DashBoard');
const UserRouter = require('./routes/User');
const LoginRouter = require('./routes/Login');
const AuthRouter = require('./routes/Auth');

// Mount Routers
app.use('/api/v1/maps', MapRouter);
app.use('/api/v1/dashboard', DashBoardRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/login', LoginRouter);
app.use('/api/v1/auth', AuthRouter);

// Error Handler Middleware (after routes)
app.use(errorHandler);

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
