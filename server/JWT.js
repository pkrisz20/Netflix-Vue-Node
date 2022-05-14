const { sign, verify } = require('jsonwebtoken');

const createToken = (userID) => {
    const accessToken = sign(
        { id: userID },
        process.env.ACCESS_TOKEN,
        { expiresIn: 60 }
    );
    return accessToken;
}

const createRefreshToken = (userID) => {
    const refreshToken = sign(
        { id: userID },
        process.env.REFRESH_TOKEN,
        { expiresIn: 60 * 60 * 24 }
    );
    return refreshToken;
}

const verifyJWT = (req, res, next) => {

    if (!req.session.user) {
        console.log('session.user is not defined in JWT');
        return res.json({ loginStatus: false });
    }
    else if (req.session.user) {
        try {
            if (req.session.user.token) {
                const accessToken = req.session.user.token;
                const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
                // console.log(validToken.id);
        
                if (validToken.id == req.session.user.data[0].user_id) {
                    console.log("Authenticated by accesstoken");
                    return next(); //if the token is valid then execute the request from user
                }
            }
        }
        catch (err) {
            console.log("Accesstoken is expired. Calling refreshtoken...");

            try {
                if (req.session.user.refresh) {
                    const refreshToken = req.session.user.refresh;
                    const validRefreshToken = verify(refreshToken, process.env.REFRESH_TOKEN);
            
                    if (validRefreshToken.id == req.session.user.data[0].user_id) {
                        console.log("Creating new token...");
                        
                        const newToken = createToken(req.session.user.data[0].user_id);
                        req.session.user.token = newToken;
                        const validNewToken = verify(newToken, process.env.ACCESS_TOKEN);
            
                        if (validNewToken) {
                            console.log("Authenticated by the new accesstoken");
                            return next();
                        }
                    }
                    else {
                        return res.json({ loginStatus: false });
                    }
                }
            }
            catch (err) {
                console.log('Refreshtoken is expired. Pls sign in...');
                return res.json({ loginStatus: false });
            }
        }
    }
}

module.exports = { verifyJWT, createToken, createRefreshToken };