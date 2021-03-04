const Map = require('../models/Map');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a Node given a map id
// @route   POST  /api/v1/node/:id
// @access  Private
exports.createNode = asyncHandler(async (req, res, next) => {
    // Take out user data for layer
    const { layer_id } = req.body;

    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    // Get particular layer and create a node
    map.map_layers.id(layer_id).layer_nodes.push(req.body);

    await map.save();

    res.status(200).json({
        success: true,
        data: map,
    });
});

// @desc    Get nodes given a map id and layer id
// @route   GET  /api/v1/node/:id
// @access  Private
exports.getNodesByMapId = asyncHandler(async (req, res, next) => {
    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    // Grab specific layer id form body
    const { layer_id } = req.body;

    if (!map.map_layers.id(layer_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }

    res.status(200).json({
        success: true,
        data: map.map_layers.id(layer_id).layer_nodes,
    });
});

// @desc    Update a node given a map id, layer id and node ide
// @route   PUT /api/v1/node/:id
// @access  Private
exports.updateNode = asyncHandler(async (req, res, next) => {
    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    // Get Layer id from param
    const { layer_id } = req.body;

    // Get Node id from param
    const { node_id } = req.body;

    // Get layer from map_layers
    if (!map.map_layers.id(req.body.layer_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }

    // Get node from layer
    if (!map.map_layers.id(req.body.layer_id).layer_nodes.id(node_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }

    // Update Node
    map.map_layers.id(layer_id).layer_nodes.id(node_id).set(req.body);

    await map.save();

    res.status(200).json({
        success: true,
        data: map.map_layers.id(layer_id),
    });
});

// @desc    Delete node given map id (body has layer id and node id)
// @route   DELETE  /api/v1/node/:id
// @access  Private
exports.deleteNode = asyncHandler(async (req, res, next) => {
    // Middleware grabs map for us (see auth.js in middleware)
    var map = req.map;

    // Get Layer id from param
    const { layer_id } = req.body;

    // Get Node id from param
    const { node_id } = req.body;

    // Get layer from map_layers
    if (!map.map_layers.id(req.body.layer_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }

    // Get node from layer
    if (!map.map_layers.id(req.body.layer_id).layer_nodes.id(node_id)) {
        return next(new ErrorResponse('Resource not found.', 401));
    }

    // Remove Node
    map.map_layers.id(layer_id).layer_nodes.id(node_id).remove();

    await map.save();

    res.status(200).json({
        success: true,
        data: map.map_layers,
    });
});
