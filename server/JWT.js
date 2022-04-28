const { sign, verify } = require('jsonwebtoken');

const createToken = (userID) => {

    const accessToken = sign(
        { id: userID },
        process.env.ACCESS_TOKEN,
        { expiresIn: 30 }
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

    try {
        const accessToken = req.session.user.token;
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN);

        if (validToken) {
            console.log("Authenticated by accesstoken");
            next(); //if the token is valid then execute the request from user
            return;
        }
        else {
            return res.status(403).send({ message: "Permission denied" });
        }
    }
    catch (err) {   //It runs when the accesstoken is expired
        try {
            console.log('Accesstoken is expired. Calling verify refreshtoken...');
            const refreshToken = req.session.user.refresh;

            const validRefreshToken = verify(refreshToken, process.env.REFRESH_TOKEN);
    
            if (validRefreshToken) {
                console.log("Authenticated by refreshtoken");
                
                const newToken = createToken(req.session.user.data[0].user_id);
                req.session.user.token = newToken;

                const validNewToken = verify(newToken, process.env.ACCESS_TOKEN);

                if (validNewToken) {
                    console.log("Authenticated by the new accesstoken");
                    next(); //if the token is valid then execute the request from user
                    return;
                }
                else {
                    return res.status(403).send({ message: "Permission denied" });
                }
            }
            else {
                return res.status(403).send({ message: "Permission denied" });
            }
        }
        catch (error) {     //It runs when the refresh token is expired
            console.log("Please sign in");
            console.log(error);
            res.clearCookie("user");
            // console.log('res.status.403');
            res.json({ loggedIn: false }); //the user needs to sign in
        }
    }
}

module.exports = { verifyJWT, createToken, createRefreshToken };