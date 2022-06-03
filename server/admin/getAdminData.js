const { verifyJWT } = require('../JWT');

const getAdminData = (adminRouter, db) => adminRouter.get("/getdata", verifyJWT, (req, res) => {

    if (req.session.user.data) {
        const sqlSelectUserData = "SELECT user_id, username FROM users WHERE user_id = ? AND is_admin = ?;";

        db.query(sqlSelectUserData, [req.session.user.data[0].user_id, 1], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false });
            }

            if (result.length > 0) {
                return res.json({ status: true, result: result });
            }
        });
    }

    else if (!req.session.user.data) {
        res.send({ status: false, message: "Please Mr.Admin sign in" });
    }
});

exports.getAdminData = getAdminData;