const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Map = require('../models/Map');

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }

    // Set token from cook
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }
});

// Grants access to only people who own a map
exports.protectMap = asyncHandler(async (req, res, next) => {
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

    // If user does belong to map, allow them to access this route
    req.map = map;
    next();
});

// Grant acces to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not unauthorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};
