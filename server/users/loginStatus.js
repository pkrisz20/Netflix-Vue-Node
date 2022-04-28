const { verifyJWT } = require('../JWT');

const loginStatus = (usersRouter) => usersRouter.get("/getloginstatus", verifyJWT, (req, res) => {
    
    if (req.session.user === undefined) {
        res.json({ loginStatus: false });
    }

    else if (req.session.user !== undefined) {
        res.json({ loginStatus: true });
    }
});

exports.loginStatus = loginStatus;