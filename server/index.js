require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const store = new session.MemoryStore();
const app = express();
const saltRounds = 10;
const { createToken, createRefreshToken, verifyJWT } = require('./JWT');

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    },
}));

app.post("/login", (req, res) => {

    const { username, pass } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", username, (err, result) => {
        if (err) {
            res.send({ status: false, message: err });
        }

        if (result.length > 0) {
            bcrypt.compare(pass, result[0].password, (err, response) => {

                if (response) {
                    const accessToken = createToken(result[0].user_id);
                    const refreshToken = createRefreshToken(result[0].user_id);
                    req.session.user = {
                        data: result,
                        token: accessToken,
                        refresh: refreshToken
                    };
                    res.json({ status: true });
                }
                else {
                    res.send({ status: false, message:"Wrong username or password" });
                }
            });
        }

        else {
            res.send({ status: false, message:"Wrong username or password" });
        }
    });
});

app.get("/getuserdata", verifyJWT, (req, res) => {
    if (req.session.user.data) {
        res.send({ loggedIn: true, user: req.session.user.data });
    }

    else if (req.session.user.data === undefined || req.session.user.data === '') {
        res.send({ loggedIn: false });
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.clearCookie("user");
    res.end();
});