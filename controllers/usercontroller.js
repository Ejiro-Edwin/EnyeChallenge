const {User, validate} = require ('../models/user');

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    const result = validate (req.body);
    if (result.error)
      return res.status (400).send (result.error.details[0].message);

    const user = new User ({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Birthday: req.body.Birthday,
      Age: req.body.Age,
      Hobby: req.body.Hobby,
    });
    await user.save ();
    res.send (user);
  } catch (err) {
    res.send ('error:' + err);
  }
};

// Retrieve and return all users from the database.
exports.findAll = async (req, res) => {
  try {
    const user = await User.find ();
    res.send (user);
  } catch (err) {
    res.send ('error:' + err);
  }
};

// Find a single user with a id
exports.findOne = async (req, res) => {
  try {
    const user = await User.findById (req.params.id);
    if (!user)
      return res.status (404).send ('The user with the given ID was not found');
    res.send (user);
  } catch (err) {
    res.send ('error:' + err);
  }
};

// Update a user identified by the id in the request
exports.update = async (req, res) => {
  try {
    const result = validate (req.body); //validate
    if (result.error)
      return res.status (400).send (result.error.details[0].message);
    const user = await User.findByIdAndUpdate (
      req.params.id,
      {
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Birthday: req.body.Birthday,
        Age: req.body.Age,
        Hobby: req.body.Hobby,
      },
      {new: true}
    );

    if (!user)
      return res.status (404).send ('The user with the given ID was not found');

    res.send (user);
  } catch (err) {
    res.send ('error:' + err);
  }
};

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove (req.params.id);
    if (!user)
      return res.status (404).send ('The user with the given ID was not found');

    res.send ({success: true});
  } catch (err) {
    res.send ('error:' + err);
  }
};
