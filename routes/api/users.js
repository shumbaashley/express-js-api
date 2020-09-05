const express = require('express');
const router = express.Router();
const users = require('../../Users');

// Get all users

router.get('/', (req, res)=>{
  res.send(users);
});

// Get user by id

router.get('/:id', (req, res)=>{
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
    res.send(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.status(404).send({message : `User with id: ${req.params.id} could not be found.`});
  }
});

// Create New User

router.post('/', (req,res)=>{
  const newUser = {
    id : users.length + 1,
    name : req.body.name,
    email : req.body.email
  }

  if (!newUser.name) {
    res.status(400).send({ message : "Name is required."});
  } else if (!newUser.email){
    res.status(400).send({ message : "Email is required."});
  } else {
    users.push(newUser);
    res.status(201).send({
      message : `User has been created succesfully.`,
      user : newUser
    });
  }

});

// Update User

router.put('/:id', (req, res)=>{
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
    const updatedUser = req.body;
    users.forEach(user => {
      if(user.id === parseInt(req.params.id)){
        user.name = updatedUser.name ? updatedUser.name : user.name;
        user.email = updatedUser.email ? updatedUser.email : user.email;
        res.send({
          message : `User with id: ${req.params.id} has been updated succesfully.`,
          user,
          });
        }
      })
  } else {
    res.status(404).send({message : `User with id: ${req.params.id} could not be found.`});
  }
});


// Delete User

router.delete('/:id', (req, res)=>{
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
    res.send({
      message: `User with id: ${req.params.id} has been deleted.`,
      users : users.filter(user => user.id != parseInt(req.params.id))});
  } else {
    res.status(404).send({message : `User with id: ${req.params.id} could not be found.`});
  }
});
module.exports = router;
