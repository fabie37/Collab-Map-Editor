const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    createLayer,
    getLayersByMapId,
    deleteLayer,
} = require('../controllers/LayerController');

const { protect } = require('../middleware/auth');

router.post('/:id', protect, createLayer);
router.get('/:id', protect, getLayersByMapId);
router.delete('/:id', protect, deleteLayer);

module.exports = router;
