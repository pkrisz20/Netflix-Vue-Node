const { verifyJWT } = require('../JWT');

const adminStatus = (adminRouter) => adminRouter.get("/getadminstatus", verifyJWT, (_req, res) => {
    return res.json({ adminStatus: true });
});

exports.adminStatus = adminStatus;