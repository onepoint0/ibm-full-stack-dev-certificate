const express = require('express');
const routes = require('./routes/users.js');
const session = require('express-session')
const jwt = require('jsonwebtoken')

const app = express();
const PORT = 5001;
const secret = 'tigerstigerstigers'

app.use(express.json());
app.use(session({secret: secret,resave: false, saveUninitialized: true}))

app.use('/user',(req,res,next) => {
  console.log('in user session auth middleware ',req.session.authorization)

  if (!req.session?.authorization?.accessToken) return res.status(403).json({message: "user not logged in"}) 

  const token = req.session.authorization.accessToken
  
  jwt.verify(token,secret,(err,user) => {
    if (err) res.status(403).json({ message: 'user not logged in '})
    
    req.user = user
    next()
  })
  
})

app.use("/user", routes);

app.post('/login',(req,res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(401).json({ message: "Invalid username or password"})

  const accessToken = jwt.sign(
    {data: username},
    secret,
    {expiresIn: 60 * 60}
  )

  req.session.authorization = { accessToken }

  return res.status(200).json({ message: "User signed in" })
})

app.listen(PORT, () => console.log("Server is running at port " + PORT));
