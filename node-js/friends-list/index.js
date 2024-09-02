const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const routes = require('./router/friends.js')

let users = []

// Check if a user with the given username already exists
const doesExist = (username) => {
    return users.some(u => u.username === username ); 
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    return users.some(u => u.username === username && u.password === password)
}

const app = express();
const secret = "fingerpint"

app.use(session({secret},resave=true,saveUninitialized=true));

app.use(express.json());

app.use("/friends", function auth(req, res, next) {
    if (!req.session?.authorization || !req.session?.authorization?.accessToken) return res.status(403).json({ message: "User not logged in" });

    let token = req.session.authorization['accessToken'];

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: "User not authenticated" });

        req.user = user;
        next(); 
    });
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) return res.status(404).json({ message: "Please provide username and password" });

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, secret, { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

app.post("/register", (req, res) => {
    const {username, password} = req.body;

    if (username && password) {

        if (!doesExist(username)) { // console.log(`doesn't exist`);
            users.push({"username": username, "password": password}); //console.log(`users set to `,users);
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Please provide username and password."});
});


const PORT=5000;

app.use("/friends", routes);

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
