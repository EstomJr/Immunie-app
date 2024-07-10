const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})
const { createUser, getUser, updateUserPhoto, updateUserName, listUsers } = require('../controllers/userController');

router.post('/users', upload.single('photo'), createUser);
router.get('/users/:id', getUser);
router.put('/users/:id/photo', upload.single('photo'), updateUserPhoto);
router.put('/users/:id/name', updateUserName);
router.get('/users', listUsers);

module.exports = router;
