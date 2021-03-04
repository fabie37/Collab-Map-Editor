const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    getMap,
    getMaps,
    createMap,
    deleteMap,
} = require('../controllers/MapController');

const { protect } = require('../middleware/auth');

router.get('/', protect, getMaps);
router.post('/', protect, createMap);
router.get('/:id', protect, getMap);
router.delete('/:id', protect, deleteMap);

module.exports = router;
