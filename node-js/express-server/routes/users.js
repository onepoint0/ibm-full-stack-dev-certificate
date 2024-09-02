const express = require('express');
const { emit } = require('nodemon');
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

router.get("/", (req, res) => {
  const filter = req.query
  console.log('query = ',filter)

  if (filter.length > 0) {
      const filtered = users.filter(u => {
        let keep

        Object.keys(filter).map(key => {
          keep = true

          if (u[key].toLowerCase() !== filter[key].toLocaleLowerCase()) {
            keep = false
            return
          }
        })

        console.log(`keeping ${u.firstName} ${u.lastName}? ${keep}`,'\n')
        return keep
      })
      console.log('filtered users ',filtered)
      return res.send(filtered)
    
  }
  console.log('no filter returning all users...')
  res.send(users)
});

router.get('/lastName/:lastName',(req,res) => {
  console.log('params = ',req.params)
  const { lastName } = req.params

  return res.send(users.filter(u => u.lastName === lastName))
})

// https://stackoverflow.com/questions/5619202/parsing-a-string-to-a-date-in-javascript
const dateFormatter = (dt) => {
  const pattern = /(\d{2})-(\d{2})-(\d{4})/
  return new Date(dt.replace(pattern,'$3-$2-$1'))
}

router.get('/sort',(req,res) => {
  res.send(users.sort((a,b) => dateFormatter(a.DOB) - dateFormatter(b.DOB)))
})

// curl call = curl localhost:5001/user/johnsmith@gamil.com
router.get("/:email", (req, res) => {
  const email = req.params.email

  const user = users.find(u => u.email === email)

  if (user) res.status(200).send(user)

  res.status(404).end()
});

/*
router.post("/",(req,res)=>{
  const body = req.body
  console.log('creating user ',req.body)
  users.push(req.body)
  res.status(201).send(req.body)
});
*/

router.post("/", (req, res) => {

  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  })

  res.status(201).send(`The user ${req.query.firstName} ${req.query.lastName} has been added`)
});

// curl call = curl --request PUT 'localhost:5001/user/johnsmith@gamil.com?DOB=1/1/1971'
router.put("/:email", (req, res) => {

  const email = req.params.email
  const user = users.find(u => u.email === email);

  ['firstName', 'lastName', 'email', 'DOB'].map(val => {
    if (req.query[val]) user[val] = req.query[val]
  })

  users = users.map(u => u.email === email ? user : u)

  res.send(`User ${user.email} has been updated to ${JSON.stringify(user)}`)
});

// curl call = curl --request DELETE 'localhost:5001/user/johnsmith@gamil.com'
router.delete("/:email", (req, res) => {
  users = users.filter(u => u.email !== req.params.email)
  console.log('users now = ',users)
  res.status(204).end()
});

module.exports = router;
