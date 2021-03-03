const express = require('express');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

const {
    getMap,
    getMaps,
    createMap,
    deleteMap,
} = require('../controllers/Test/TestMapController');

router.route('/').get(getMaps).post(verifyToken, createMap);
router.route('/:id').get(verifyToken, getMap).delete(verifyToken, deleteMap);

module.exports = router;
