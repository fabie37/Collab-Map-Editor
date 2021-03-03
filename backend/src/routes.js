const express = require('express');
const multer = require('multer');
const verifyToken = require('./config/verifyToken');

const UserController = require('./controllers/UserController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const EventController = require('./controllers/EventController');
const SubscriptionController = require('./controllers/SubscriptionController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
/*const MapController = require('./controllers/MapController');
const NodeController = require('./controllers/NodeController');
const LayerController = require('./controllers/LayerController'); */

const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => {
    res.send({ status: 200 });
});

module.exports = routes;
