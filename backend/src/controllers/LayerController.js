const Map = require('../models/Map');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a layer given a map id
// @route   POST  /api/v1/layer/:id
// @access  Private
exports.createLayer = asyncHandler(async (req, res, next) => {
    // Take out user data for layer
    const { layer_nodes, layer_description, start_date, end_date } = req.body;

    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    map.map_layers.push({
        map_id: req.params.id,
        layer_nodes,
        layer_description,
        start_date,
        end_date,
    });

    await map.save();

    res.status(200).json({
        success: true,
        data: map,
    });
});

// @desc    Get layers given a map id
// @route   GET  /api/v1/layer/:id
// @access  Private
exports.getLayersByMapId = asyncHandler(async (req, res, next) => {
    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    res.status(200).json({
        success: true,
        data: map.map_layers,
    });
});

// @desc    Update a layer given a map id
// @route   PUT /api/v1/layer/:id
// @access  Private
exports.updateLayer = asyncHandler(async (req, res, next) => {
    // Get Layer id from param
    const { layer_id } = req.body;

    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    // Get layer from map_layers
    if (!map.map_layers.id(req.body.layer_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }
    map.map_layers.id(layer_id).set(req.body);

    await map.save();

    res.status(200).json({
        success: true,
        data: map,
    });
});

// @desc    Delete layer given map id (body has layer id)
// @route   DELETE  /api/v1/layer/:id
// @access  Private
exports.deleteLayer = asyncHandler(async (req, res, next) => {
    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    if (!map.map_layers.id(req.body.layer_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }

    // Remove layer from map
    map.map_layers.id(req.body.layer_id).remove();
    await map.save();

    res.status(200).json({
        success: true,
        data: map.map_layers,
    });
});
