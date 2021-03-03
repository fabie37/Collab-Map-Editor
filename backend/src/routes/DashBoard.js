const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    getEvents,
    getEvent,
    getEventsByUserId,
} = require('../controllers/DashboardController');

router.route('/events/').get(verifyToken, getEvents);
router.route('/events/sport/:id').get(verifyToken, getEvents);
router.route('/events/:id').get(verifyToken, getEvent);
router.route('/events/user/:id').get(verifyToken, getEventsByUserId);

module.exports = router;
