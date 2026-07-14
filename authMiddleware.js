const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    let token;

    // Check if Authorization header exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            // Get token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Save user id
           req.user = {
  id: decoded.id,
};

            next();

        } catch (error) {

            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });

        }

    }

    if (!token) {

        return res.status(401).json({
            success: false,
            message: "No Token Provided"
        });

    }

};
module.exports = { protect };