const express = require('express');
const router = express.Router();
const uploadConfig = require('../config/upload');
const multer = require('multer');
const upload = multer(uploadConfig);

const { getUser, createUser } = require('../controllers/UserController');

router.route('/').post(upload.single('profilePic'), createUser);
router.route('/:id').get(getUser);

module.exports = router;
