const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    createNode,
    getNodesByMapId,
    updateNode,
    deleteNode,
} = require('../controllers/NodeController');

const { protect, protectMap } = require('../middleware/auth');

router.post('/:id', protect, protectMap, createNode);
router.get('/:id', protect, protectMap, getNodesByMapId);
router.delete('/:id', protect, protectMap, deleteNode);
router.put('/:id', protect, protectMap, updateNode);

module.exports = router;
