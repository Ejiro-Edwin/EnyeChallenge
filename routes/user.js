const express = require ('express');
const userController = require ('../controllers/usercontroller');

let router = express.Router();
router.use(express.json());

// Create a new user
router.post ('/', userController.create);

// Retrieve all user
router.get ('/', userController.findAll);

// Retrieve a single user with id
router.get ('/:id', userController.findOne);

// Update a user with id
router.put ('/:id', userController.update);

// Delete a user with id
router.delete ('/:id', userController.delete);

module.exports = router ;
