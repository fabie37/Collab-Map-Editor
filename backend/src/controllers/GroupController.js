const Group = require('../models/Group');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all groups
// @route   GET  /api/v1/group
// @access  Private/Admin
exports.getGroups = asyncHandler(async (req, res, next) => {
    const groups = await Group.find();

    res.status(200).json({
        sucess: true,
        data: groups,
    });
});

// @desc    Get a single group
// @route   GET  /api/v1/groups/:id
// @access  Private/Admin
exports.getGroup = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const group = await Group.findById(id);

    res.status(200).json({
        sucess: true,
        data: group,
    });
});

// @desc    Create a group
// @route   Post  /api/v1/group
// @access  Private/Admin
exports.createGroup = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const group = await Group.create({
        name,
    });

    res.status(200).json({
        sucess: true,
        data: group,
    });
});

// @desc    Update a group
// @route   PUT /api/v1/group/:id
// @access  Private/Admin
exports.updateGroup = asyncHandler(async (req, res, next) => {
    // Get Group id from param
    const { id } = req.params;

    // Find the group & update
    const group = await Group.findByIdAndUpdate(id, req.body);

    res.status(200).json({
        success: true,
        data: group,
    });
});

// @desc    Delete a group
// @route   DELETE /api/v1/group/:id
// @access  Private/Admin
exports.deleteGroup = asyncHandler(async (req, res, next) => {
    // Get Group id from param
    const { id } = req.params;

    // Find the group & delete
    const group = await Group.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        data: group,
    });
});
