require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const saltRounds = 10;
const { createToken, createRefreshToken, verifyJWT } = require('./JWT');

app.use(cors({
    origin: 'http://localhost:' + process.env.PORT,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});

//Routes
const { moviesRouter } = require("./routes/movies");
const { usersRouter } = require("./routes/users");
const { db } = require("./db-config");
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

app.post("/register", (req, res) => {

    const { email, username, pass,  } = req.body;
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

                db.query("INSERT INTO users (email, username, password, is_admin, profile_pic) VALUES (?,?,?,?,?)", [email, username, hash, 0, null], (err, result) => {
            
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
                if (err) {
                    console.log(err);
                }

                if (response) {
                    console.log('creating tokens');
                    const accessToken = createToken(result[0].user_id);
                    const refreshToken = createRefreshToken(result[0].user_id);
                    req.session.user = {
                        data: result,
                        token: accessToken,
                        refresh: refreshToken
                    };
                    console.log('session created');
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
        const sqlSelectUserData = "SELECT * FROM users WHERE user_id = ?;";
        db.query(sqlSelectUserData, [req.session.user.data[0].user_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false });
            }
            if (result.length > 0) {

                if (result[0].profile_pic != null) {
                    for (const i of result) {
                        const buf = new Buffer.from(i.profile_pic);
                        i.profile_pic = buf.toString("base64");
                    }
                    return res.send({ status: true, result: result });
                }

                else if (result[0].profile_pic === null) {
                    return res.send({ status: true, result: result });
                }
            }
        });
    }

    else if (req.session.user.data === undefined || req.session.user.data === '') {
        res.send({ status: false, message: "Please sign in" });
    }
});

app.put("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.clearCookie("user");
    res.json({ status: true });
    res.end();
});

app.put("/changeprofile", verifyJWT, (req, res) => {
    const { file } = req.body;
    let buffer = null;
    let pictureType = "";
    let pictureSize = 0;
    const parts = file.split(";base64,");
    pictureType = parts[0].slice(5);
    buffer = Buffer.from(parts[1], "base64");
    pictureSize = Math.round(Buffer.byteLength(buffer) / 1024);

    if (pictureType !== "image/png" && pictureType !== "image/jpeg" && pictureType !== "image/jpg") {
        console.log('bad format');
        return res.send({ status: false, message: "File is not in correct format" });
    }

    if (pictureSize > 4096) {
        console.log('too big image');
        return res.send({ status: false, message: "File can not be bigger than 4MB" });
    }

    else {
        console.log('picture is inserted into db');
        const sqlUpdate = "UPDATE users SET profile_pic = ? WHERE user_id = ?;";
        db.query(sqlUpdate, [buffer, req.session.user.data[0].user_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong" });
            }
            if (result) {
                return res.send({ status: true, message: "Your profile picture was successfully changed" });
            }
        });
    }
});

app.put("/changemail", verifyJWT, (req, res) => {
    const { newEmail } = req.body;
    const sqlQuery = "UPDATE users SET email = ? WHERE user_id = ?;";

    db.query(sqlQuery, [newEmail, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }
        if (result) {
            return res.send({ status: true, message: "Your email address was successfully changed" });
        }
    });
});

app.put("/changeusername", verifyJWT, (req, res) => {
    const { newUsername } = req.body;
    const sqlQuery = "UPDATE users SET username = ? WHERE user_id = ?;";

    db.query(sqlQuery, [newUsername, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }
        if (result) {
            return res.send({ status: true, message: "Your username was successfully changed" });
        }
    });
});

app.put("/changepassword", verifyJWT, (req, res) => {
    const { oldPassword, newPassword, repeatPassword } = req.body;

    db.query("SELECT password FROM users WHERE user_id = ?", req.session.user.data[0].user_id, (error, response) => {
        if (error) {
            console.log(error);
        }
        else if (response.length > 0) {

            bcrypt.compare(oldPassword, response[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                }

                else if (result) {
                    if (newPassword == repeatPassword) {

                        bcrypt.hash(newPassword, saltRounds, (hasherror, hash) => {
                            if (hasherror) {
                                console.log(hasherror);
                            }

                            const sqlQuery = "UPDATE users SET password = ? WHERE user_id = ?;";

                            db.query(sqlQuery, [hash, req.session.user.data[0].user_id], (db_err, success) => {
                                if (db_err) {
                                    console.log(db_err);
                                    return res.json({ status: false, message: "Something went wrong" });
                                }
                                if (success) {
                                    return res.send({ status: true, message: "Your password was successfully changed" });
                                }
                            });
                        });
                    }

                    else if (newPassword != repeatPassword) {
                        res.json({ status: false, message: "Passwords don't match" });
                    }
                }

                else if (!result) {
                    res.json({ status: false, message: "The old password is not correct. Did you get hacked?" });
                }
            });
        }

        else {
            res.json({ status: false, message: "Something went wrong" });
        }
    });
});