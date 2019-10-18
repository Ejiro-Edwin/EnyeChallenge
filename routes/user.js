const express = require ('express');
const userController = require ('../controllers/usercontroller');

let router = express.Router();
router.use(express.json());

// Create a new user
router.post ('/addUser', userController.create);

// Retrieve all user
router.get ('/getUser', userController.findAll);

// Retrieve a single user with id
router.get ('/getUser/:id', userController.findOne);

// Update a user with id
router.put ('/updateUser/:id', userController.update);

// Delete a user with id
router.delete ('/removeUser/:id', userController.delete);

module.exports = router ;
