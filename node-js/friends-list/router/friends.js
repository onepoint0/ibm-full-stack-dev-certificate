const e = require('express');
const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};

router.get("/",(req,res)=>{
  res.status(200).send(friends)
});

router.get("/:email",(req,res)=>{
  const email = req.params.email
  res.status(200).send(friends[email])
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  const {email,firstName,lastName,DOB} = req.body

  friends = {...friends,[email]: {firstName,lastName,DOB}}

  res.status(201).send(`${firstName} has been added to the friends list`)
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email

  const friend = friends[email]

  if (friend) {
    ['firstName','lastName','DOB'].map(key => {
      if (req.body[key]) {
        friend[key] = req.body[key]
      }
    })

    res.status(201).json(friend)
  } else {
    res.status(404).send(`${email} not found`)
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email
  delete friends[email]
  res.status(204).send()
});

module.exports=router;
