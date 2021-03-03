const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// @desc    Get all events
// @route   GET  /api/v1/dashboard/events/
// @route   GET  /api/v1/dashboard/events/sport/:id
// @access  Private
exports.getEvents = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            const { sport } = req.params;
            const query = sport ? { sport } : {};

            try {
                const events = await Event.find(query);

                if (events) {
                    return res.json({ authData, events });
                }
            } catch (error) {
                return res
                    .status(400)
                    .json({ message: 'We do have any events yet' });
            }
        }
    });
};

// @desc    Get event by id
// @route   GET  /api/v1/dashboard/events/:id
// @access  Private
exports.getEvent = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            const { eventId } = req.params;
            try {
                const events = await Event.findById(eventId);

                if (events) {
                    return res.json({ authData: authData, events: events });
                }
            } catch (error) {
                return res
                    .status(400)
                    .json({ message: 'EventId does not exist!' });
            }
        }
    });
};

// @desc    Get events by user id
// @route   GET  /api/v1/dashboard/events/user/:id
// @access  Private
exports.getEventsByUserId = async (req, res) => {
    jwt.verify(req.token, 'secret', async (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            const { user_id } = req.headers;

            try {
                const events = await Event.find({ user: authData.user._id });

                if (events) {
                    return res.json({ authData, events });
                }
            } catch (error) {
                return res.status(400).json({
                    message: `We do have any events with the user_id ${user_id}`,
                });
            }
        }
    });
};
