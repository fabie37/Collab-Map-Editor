const Event = require('../models/Event');
const Map = require('../models/Map');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');



// @desc    Get all maps
// @route   GET  /api/v1/dashboard/
// @access  Private/User
exports.getAllMaps = asyncHandler(async (req, res, next) => {
    const maps = await Map.find({});
    res.status(200).json({
        sucess: true,
        data: maps,
    });
});



// @desc    Get all events
// @route   GET  /api/v1/dashboard/events/
// @route   GET  /api/v1/dashboard/events/sport/:id
// @access  Private
exports.getEvents = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const query = id ? { id } : {};
    console.log(query);

    const events = await Event.find(query);
    res.status(200).json({
        success: true,
        data: events,
    });
});

// @desc    Get event by id
// @route   GET  /api/v1/dashboard/events/:id
// @access  Private
exports.getEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const events = await Event.findById(id);

    res.status(200).json({
        success: true,
        data: events,
    });
});

// @desc    Get events by user id
// @route   GET  /api/v1/dashboard/events/user/:id
// @access  Private
exports.getEventsByUserId = asyncHandler(async (req, res, next) => {
    const { id } = req.headers;

    const events = await Event.find({ user: authData.user._id });

    res.status(200).json({
        success: true,
        data: events,
    });
});
