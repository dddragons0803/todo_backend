const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ message: "User is not authorized or token is missing" });
        return;
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

        //  console.log(err,decoded)        
        if (err) {
            res.status(401);
            throw new Error("User is not authorized");
        }
        // console.log(decoded)
        req.user = decoded.userId;
        // console.log("User ID:", req.user);
        next();
    });

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
}

module.exports = verifyToken;