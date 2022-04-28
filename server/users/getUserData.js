const { verifyJWT } = require('../JWT');

const getUserData = (usersRouter, db) => usersRouter.get("/getuserdata", verifyJWT, (req, res) => {

    if (req.session.user.data) {
        const sqlSelectUserData = "SELECT user_id, email, username, profile_pic FROM users WHERE user_id = ?;";

        db.query(sqlSelectUserData, req.session.user.data[0].user_id, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false });
            }

            if (result.length > 0) {
                return res.json({ status: true, result: result });
            }
        });
    }

    else if (req.session.user.data === undefined || req.session.user.data === '') {
        res.send({ status: false, message: "Please sign in" });
    }
});

exports.getUserData = getUserData;