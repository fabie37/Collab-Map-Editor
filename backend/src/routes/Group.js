const express = require('express');
const router = express.Router();

const {
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
} = require('../controllers/GroupController');

// Protect certain routes
const { protect, authorize } = require('../middleware/auth');

// Only allow accounts that are admin to use this route
// Map Routes
router.get('/', protect, authorize('admin'), getGroups);
router.post('/', protect, authorize('admin'), createGroup);
router.get('/:id', protect, authorize('admin'), getGroup);
router.delete('/:id', protect, authorize('admin'), deleteGroup);
router.put('/:id', protect, authorize('admin'), updateGroup);

module.exports = router;
