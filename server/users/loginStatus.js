const { verifyJWT } = require('../JWT');

const loginStatus = (usersRouter) => usersRouter.get("/getloginstatus", verifyJWT, (_req, res) => {
    return res.json({ loginStatus: true });
});

exports.loginStatus = loginStatus;