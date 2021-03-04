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

    // Find map user is creating from
    const map = await Map.findById(req.params.id);

    // Make sure user is allowed to add to this map
    const map_user_id = String(map.map_user_id).trim();
    const user_id = String(req.user._id).trim();

    if (map_user_id !== user_id) {
        return next(
            new ErrorResponse('Not authorised to use this resource', 401)
        );
    }

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
    // Find map user is creating from
    const map = await Map.findById(req.params.id);

    // Make sure user is allowed to add to this map
    const map_user_id = String(map.map_user_id).trim();
    const user_id = String(req.user._id).trim();

    if (map_user_id !== user_id) {
        return next(
            new ErrorResponse('Not authorised to use this resource', 401)
        );
    }

    res.status(200).json({
        success: true,
        data: map.map_layers,
    });
});

// @desc    Delete layer given map id (body has layer id)
// @route   DELETE  /api/v1/layer/:id
// @access  Private
exports.deleteLayer = asyncHandler(async (req, res, next) => {
    // Find map user is creating from
    const map = await Map.findById(req.params.id);

    // Make sure user is allowed to add to this map
    const map_user_id = String(map.map_user_id).trim();
    const user_id = String(req.user._id).trim();

    if (map_user_id !== user_id) {
        return next(
            new ErrorResponse('Not authorised to use this resource', 401)
        );
    }

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
