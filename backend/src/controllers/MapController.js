const Map = require('../models/Map');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Get all maps
// @route   GET  /api/v1/maps
// @access  Private
exports.getMaps = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            const maps = await Map.find({});
            return res.json({ authData, maps });
        }
    });
};

// @desc    Get a single map
// @route   GET  /api/v1/maps/:id
// @access  Private
exports.getMap = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            const { map_id } = req.params;

            try {
                const maps = await Map.findById(map_id);

                if (maps) {
                    return res.json({ authData: authData, maps: maps });
                }
            } catch (error) {
                return res
                    .status(400)
                    .json({ message: 'Map_id does not exist!' });
            }
        }
    });
};

// @desc    Create a map
// @route   Post  /api/v1/maps
// @access  Private
exports.createMap = async (req, res) => {
    //check that user is logged in
    jwt.verify(req.token, 'secret', async (err, authData) => {
        if (err) {
            res.statusCode(401);
        } else {
            const { map_title, map_layers, map_type, is_public } = req.body;

            const map_user_id = await User.findById(authData.user._id);

            if (!map_user_id) {
                return res
                    .status(400)
                    .json({ message: 'User does not exist!' });
            }

            try {
                const map = await Map.create({
                    map_user_id: authData.user._id,
                    map_title,
                    map_layers: [],
                    map_type,
                    is_public,
                });

                return res.json(map);
            } catch (error) {
                return res.status(400).json({ message: error });
            }
        }
    });
};

// @desc    Remove a map
// @route   Post  /api/v1/maps/:id
// @access  Private
exports.deleteMap = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err) => {
        if (err) {
            res.statusCode(401);
        } else {
            const { map_id } = req.params;
            try {
                await Map.findByIdAndDelete(map_id);
                return res.status(204).send();
            } catch (error) {
                return res
                    .status(400)
                    .json({ message: 'No map found with that id' });
            }
        }
    });
};
