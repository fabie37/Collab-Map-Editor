const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    getMap,
    getMaps,
    createMap,
    deleteMap,
} = require('../controllers/MapController');

const {
    createLayer,
    getLayersByMapId,
    deleteLayer,
    updateLayer,
} = require('../controllers/LayerController');

const {
    createNode,
    getNodesByMapId,
    updateNode,
    deleteNode,
} = require('../controllers/NodeController');

const { protect, protectMap } = require('../middleware/auth');

// Map Routes
router.get('/', protect, getMaps);
router.post('/', protect, createMap);
router.get('/:id', protect, getMap);
router.delete('/:id', protect, deleteMap);

// Layer Routes
router.post('/:id/layer/', protect, protectMap, createLayer);
router.get('/:id/layer/', protect, protectMap, getLayersByMapId);
router.delete('/:id/layer/:layer_id', protect, protectMap, deleteLayer);
router.put('/:id/layer/:layer_id', protect, protectMap, updateLayer);

// Node Routes
router.post('/:id/layer/:layer_id/node', protect, protectMap, createNode);
router.get('/:id/layer/:layer_id/node/', protect, protectMap, getNodesByMapId);
router.delete(
    '/:id/layer/:layer_id/node/:node_id',
    protect,
    protectMap,
    deleteNode
);
router.put(
    '/:id/layer/:layer_id/node/:node_id',
    protect,
    protectMap,
    updateNode
);

module.exports = router;
