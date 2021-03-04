const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    createLayer,
    getLayersByMapId,
    deleteLayer,
    updateLayer,
} = require('../controllers/LayerController');

const { protect, protectMap } = require('../middleware/auth');

router.post('/:id', protect, protectMap, createLayer);
router.get('/:id', protect, protectMap, getLayersByMapId);
router.delete('/:id', protect, protectMap, deleteLayer);
router.put('/:id', protect, protectMap, updateLayer);

module.exports = router;
