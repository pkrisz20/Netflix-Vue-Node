const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

const saltRounds = 10;

const jwt = require('jsonwebtoken');

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Server is running
app.get("/", (req, res) => {
    res.send("Server is running");
});

//Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Routes
const { moviesRouter } = require("./routes/movies");
const { db } = require("./db-config");
app.use("/movies", moviesRouter);

app.post("/register", (req, res) => {

    const { email, username, pass } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", username, (err, resp) => {
        if (err) {
            console.log(err);
        }
        
        if (resp.length > 0) {
            res.send([false, "This username is already taken!"]);
        }
        else {
            bcrypt.hash(pass, saltRounds, (err, hash) => {

                if (err) {
                    console.log(err);
                }
        
                db.query("INSERT INTO users (email, username, password) VALUES (?,?,?)", [email, username, hash], (err, result) => {
                
                    if (err) {
                        return res.send([false, "Something went wrong"]);
                    }
                    else if (result) {
                        return res.send([true, "You have been successfully registered"]);
                    }
                });
            });
        }
    });
});

app.use(cookieParser());
app.use(session({
    key: "userId",
    secret: "TOPsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send("Access denied. No token provided");
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "You failed to authenticate" });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

app.get("/authenticate", verifyJWT, (req, res) => {
    res.send({ auth: true });
});

app.post("/login", (req, res) => {

    const { username, pass } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", username, (err, result) => {
        if (err) {
            res.send({ status: false, message: err });
        }

        if (result.length > 0) {
            bcrypt.compare(pass, result[0].password, (err, response) => {
                if (response) {
                    const id = result[0].id;
                    const username = result[0].username;

                    const token = jwt.sign({ id, username }, "jwtSecret", {
                        expiresIn: 300,
                    });

                    req.session.user = result;
                    console.log(req.session.user);
                    res.json({ status: true, token: token, result: result });
                }
                else {
                    res.send({ status: false, message:"Wrong username or password" });
                }
            })
        }
        else {
            res.send({ status: false, message:"Wrong username or password" });
        }
    });
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedin: true, user: req.session.user });
    }
    else {
        res.send({ loggedin: false });
    }
});

// app.get("/logout", (req, res) => {
//      = null;
//     res.redirect('/');
// });