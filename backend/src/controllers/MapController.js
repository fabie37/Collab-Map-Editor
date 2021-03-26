const Map = require('../models/Map');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all maps
// @route   GET  /api/v1/maps
// @access  Private/User
exports.getMaps = asyncHandler(async (req, res, next) => {
    const maps = await Map.find({
        $or: [
            { map_user_id: req.user._id },
            { group: { $in: req.user.groups } },
        ],
    });

    res.status(200).json({
        sucess: true,
        data: maps,
    });
});

// @desc    Get a single map
// @route   GET  /api/v1/maps/:id
// @access  Private/User
exports.getMap = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const map = await Map.findById(id);

    const map_user_id = String(map.map_user_id).trim();
    const user_id = String(req.user._id).trim();

    // Check group of map and user and see if user is allowed to access this map
    const in_group = req.user.groups.filter(
        (group) => String(group._id).trim() == String(map.group).trim()
    ).length;

    // If map if not created by the same user accessing it, reject it for now.
    if (map_user_id != user_id && in_group == 0) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }

    res.status(200).json({
        sucess: true,
        data: map,
    });
});

// @desc    Create a map
// @route   Post  /api/v1/maps
// @access  Private/User
exports.createMap = asyncHandler(async (req, res, next) => {
    const { map_title, map_layers, map_type, is_public } = req.body;
    const map = await Map.create({
        map_user_id: req.user._id,
        map_title,
        map_type,
        is_public,
    });

    res.status(200).json({
        sucess: true,
        data: map,
    });
});

// @desc    Remove a map
// @route   DELETE  /api/v1/maps/:id
// @access  Private/User
exports.deleteMap = asyncHandler(async (req, res, next) => {
    const map = await Map.findById(req.params.id);

    if (!map) {
        return next(new ErrorResponse('Resource Not Found', 401));
    }

    const map_user_id = String(map.map_user_id).trim();
    const user_id = String(req.user._id).trim();

    if (map_user_id !== user_id) {
        return next(
            new ErrorResponse('Not authorised to use this resource', 401)
        );
    }
    await Map.findByIdAndDelete(req.params.id);

    res.status(200).json({
        sucess: true,
        data: map,
    });
});
