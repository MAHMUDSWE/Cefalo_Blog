const express = require('express');
const userController = require('../controllers/user.controller');


const userValidator = require('../validators/user.route.validator');
const validationCheck = require('../middlewares/validation.middleware');
const router = express();

router.get('/all', userController.getAllUser);

router.route('/:username')
    .get(userController.getUserByUsername)
    .put(userValidator.updateUserValidator, validationCheck, userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;