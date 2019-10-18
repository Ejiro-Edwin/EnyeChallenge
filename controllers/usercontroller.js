const {usermodel, validate} = require ('../models/user');


// Create and Save a new User
exports.create = async (req, res) => {
  const result = validate (req.body);
  if (result.error)
    return res.status (400).send (result.error.details[0].message);

  const user = new usermodel ({
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Birthday: req.body.Birthday,
    Age: req.body.Age,
    Hobby: req.body.Hobby,
  });
  await user.save ();
  res.send (user);
};



// Retrieve and return all users from the database.
exports.findAll = async (req, res) => {
  const user = await usermodel.find ().sort ('Lastname');
  res.send (user);
};



// Find a single user with a id
exports.findOne = async (req, res) => {
  const user = await usermodel.findById (req.params.id);
  if (!user)
    return res.status (404).send ('The user with the given ID was not found');
  res.send (user);
};



// Update a user identified by the id in the request
exports.update = async (req, res) => {
  const result = validate (req.body); //validate
  if (result.error)
    return res.status (400).send (result.error.details[0].message);
  let updatedData = req.body;
  const user = await usermodel.findByIdAndUpdate (updatedData, {
    where: {
      _id: req.params.id,
    },
  });

  if (!user)
    return res
      .status (404)
      .send ('The invoice with the given ID was not found');

  res.send (movie);
};




// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  const user = await usermodel.findByIdAndRemove (req.params.id);
  if (!user)
    return res.status (404).send ('The user with the given ID was not found');

  res.send (user);
};
