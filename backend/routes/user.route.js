const express = require('express');
const userController = require('../controllers/user.controller');


const router = express();


router.route('/:username')
    .get(userController.getUserByUsername)
    .put(userController.updateUserByUsername)
    .delete(userController.deleteUserByUsername)

module.exports = router;