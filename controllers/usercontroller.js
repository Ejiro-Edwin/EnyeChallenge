const {User, validate} = require ('../models/user');


// Create and Save a new User
exports.create = async (req, res) => {
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
};



// Retrieve and return all users from the database.
exports.findAll = async (req, res) => {
  try{
    const user = await User.find();
    res.send (user);
  }
  catch(err){
    res.send('error:'+err)
  }
  
};



// Find a single user with a id
exports.findOne = async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status (404).send ('The user with the given ID was not found');
    res.send (user);
  }
  catch(err){
    res.send('error:'+err)
  }
};



// Update a user identified by the id in the request
exports.update = async (req, res) => {
  const result = validate (req.body); //validate
  if (result.error)
    return res.status (400).send (result.error.details[0].message);
  let updatedData = req.body;
  const user = await User.findByIdAndUpdate (updatedData, {
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
  const user = await User.findByIdAndRemove (req.params.id);
  if (!user)
    return res.status (404).send ('The user with the given ID was not found');

  res.send (user);
};
