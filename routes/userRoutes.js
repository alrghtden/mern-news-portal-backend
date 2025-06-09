const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadUser');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', upload.single('foto'), userController.createUser);
router.put('/:id', upload.single('foto'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
